function PromoManagementPage() {
	this.name = "promotion-manager-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		id : "     ",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getPromoManagementPage.do", "GET", callback);
}

PromoManagementPage.prototype.requestItems = function(requestCallBack) {
	var thiz = this;
	var callback = function(promotions) {
		if (promotions.length > 1) {
			promotions.sort(function(a, b){
				return a.id - b.id;
			});
		}
		thiz.promotions = promotions;
		if(requestCallBack) requestCallBack();
	}
	serverReport.getJson("/searchPromotion.do", "GET",
			callback, {
				"description" : "",
				"fromDate" : "",
				"toDate" : ""
	});
}

PromoManagementPage.prototype.init = function(){
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	
	this.promoName = this.pageContainer.querySelector("#promo-name");
	
	this.fromDate;
	this.toDate;
	
	var fromDateBox= this.pageContainer.querySelector("#from-date");
	var toDateBox = this.pageContainer.querySelector("#to-date");
	
	var thiz = this;
	
	fromDateBox.addEventListener("change", function(){
		if (fromDateBox.value == "") {
			thiz.fromDate = null;
		}
	})
	
	toDateBox.addEventListener("change", function(){
		if (toDateBox.value == "") {
			thiz.toDate = null;
		}
	})
	
	var fromDatePicker = new Pikaday({
        field: fromDateBox,
        format: 'DD-MM-YYYY',
        onSelect: function() {
            thiz.fromDate = this.getMoment();
        }
        
    });
    
    var toDatePicker = new Pikaday({
        field: toDateBox,
        format: 'DD-MM-YYYY',
        onSelect: function() {
            thiz.toDate = this.getMoment();
        }
    });
    
	var renderAction = function(promo) {
		var buttons = new Array();
		var button = Dom.newDOMElement({
			_name : "i",
			class : "material-icons md-dark md-32",
			_text : "mode_edit",
			title : "Chỉnh sửa"
		});
		button.action = function() {
			var callback = function(newItem) {
				var oldItem = promo;
				thiz.onUpdateItem(oldItem, newItem);
			}
			var dialog = new AddPromotionDialog(promo, callback);
			dialog.show();
		}
		buttons.push(button);
		var button = Dom.newDOMElement({
			_name : "i",
			class : "material-icons md-dark md-32",
			_text : "photo_library",
			title : "Xem hình"
		});
		button.action = function() {
			var addImageDialog = new AddImageDialog(promo.promotionCode);
			addImageDialog.show();
		}
		buttons.push(button);
		return buttons;
	}
	var theader = [
		{
			"column" : "Tên chương trình",
			"label" : "description"
		},
		{
			"column" : "Giảm giá",
			"label" : "discount"
		},
		{
			"column" : "Điều kiện",
			"label" : "payCondition"
		},
		{
			"column" : "Từ ngày",
			"label" : "fromDate",
			"type" : "date"
				
		},
		{
			"column" : "Đến ngày",
			"label" : "toDate",
			"type" : "date"
		}];
	this.table = new Table();
	this.table.init(theader, renderAction);
	this.table.renderBackground = function(item) {
		var toDate = new Date(item.toDate);
		return new Date() > toDate;
	}
	this.containerPanel.appendChild(this.table.getTable());
	
	this.searchButton.addEventListener("click", function(ev) {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.promotions = new Array();
	var requestCallBack = function() {
		thiz.table.render(thiz.promotions);
	}
	this.requestItems(requestCallBack);
	this.contextMenu.init([
			{
				name : "Thêm",
				handler : function(handleItem) {
					var callback = function(newItem) {
						if (newItem) {
							thiz.onCreateItem(newItem);
						}
					}
					var dialog = new AddPromotionDialog(null, callback);
					dialog.show();
				}
			},
			{
				name : "Chỉnh sửa",
				handler : function(handleItem) {
					var callback = function(newItem) {
						var oldItem = handleItem.data;
						thiz.onUpdateItem(oldItem, newItem);
					}
					var dialog = new AddPromotionDialog(handleItem.data, callback);
					dialog.show();
//				
			}
			} ]);
	this.table.tableBody.addEventListener("contextmenu", function(e) {
		var target = e.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (dataNode != null) {
			e.dataNode = dataNode;
			thiz.contextMenu.toggleMenuOn(e);
		}
	});
	
	this.addButton.addEventListener("click", function() {
		var callback = function(newItem) {
			if (newItem) {
				thiz.onCreateItem(newItem);
			}
		}
		var dialog = new AddPromotionDialog(null, callback);
		dialog.show();
	});
	
}


PromoManagementPage.prototype.onSearch = function() {
	var promoName = this.promoName.value;
	var fromDate = this.fromDate;
	var toDate = this.toDate;
	
	if (promoName == "" && fromDate == null && toDate == null) return this.promotions;
	
	var result = new Array();
	var thiz = this;
	this.promotions.forEach(function(promotion){
		if ((promoName == "" || promotion.description.indexOf(promoName) != -1)
			&& (fromDate == null || new Date(promotion.fromDate) >= fromDate )
			&& (toDate == null || new Date(promotion.toDate) <= toDate ))
				result.push(promotion);
	});
	return result;
}

PromoManagementPage.prototype.onCreateItem = function(newItem) {
	if (newItem != null) {
		this.promotions.push(newItem);
		var thiz = this;
		window.setTimeout(function() {
			var result = thiz.onSearch();
			thiz.table.render(result);
		}, 100);
	}
}

PromoManagementPage.prototype.onUpdateItem = function(oldItem, newItem) {
	var index = this.promotions.indexOf(oldItem);
	if (index == -1) return;
	this.promotions[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 10);
}

PromoManagementPage.prototype.getPageContainer = function() {
	var thiz = this;
	this.requestItems(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	});
	return this.pageContainer;
}
