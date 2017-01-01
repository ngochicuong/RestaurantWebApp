function TablePage() {
	this.name = "table-page";
	this.seatStatus == null;
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
	serverReport.getHTML("/getTablePage.do", "GET", callback);
}

TablePage.prototype.init = function(){
	var thiz = this;
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	var theader = new Array("id", "room", "floor", "capacity", "description",
			"priority", "onDesk");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	this.searchButton = this.pageContainer.querySelector("#search-button");
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	var o = this.pageContainer.querySelector("#onDesk");
	this.searchButton.addEventListener("click", function(ev) {
		thiz.reloadPage();
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Make order",
				handler : function(handleItem) {
					var seat = handleItem.data;
					
					var callback = function(json) {
						var order = json;
						if(order.length == 0) return;
						thiz.table.removeChild(handleItem);
					};
					serverReport.getJson("/createOrder.do?seatId=" + seat.id
							+ "&note='dklfj'&customerId=123", "GET", callback);
				},
				express : function() {
					return thiz.seatStatus == "false";
				}
			},
			{
				name : "View Order Detail",
				handler : function(handleItem) {
					var seat = handleItem.data;
					var callback = function(json) {
						var order = json;
						var orderPage = Main.pageManagement.active("order-page");
						orderPage.open(seat);
					};
					serverReport.getJson("/getOrderWithSeat.do?seatId=" + seat.id +"", "GET", callback);
				},
				express: function() {
					return thiz.seatStatus == "true";
				}

			}, {
				name : "View",
				handler : function(handleItem) {
					console.log(handleItem);
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
}

TablePage.prototype.bookSeatTable = function(seat, event) {
	
}

TablePage.prototype.reloadPage = function() {
	var thiz = this;
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	var o = this.pageContainer.querySelector("#onDesk");
	
	this.seatStatus = o.options[o.selectedIndex].value;
	
	var floor = f.options[f.selectedIndex].value;
	var room = r.options[r.selectedIndex].value;
	var capacity = c.options[c.selectedIndex].value;
	var onDesk = o.options[o.selectedIndex].value == "undefined" ? "" : o.options[o.selectedIndex].value;

	console.log("Search button click.... ");

	var callback = function(seats) {
		thiz.table.render(seats);
	}
	serverReport.getJson("/searchTable.do", "GET",
			callback, {
				"floor" : floor,
				"room" : room,
				"capacity" : capacity,
				"onDesk" : onDesk
	});
}

TablePage.prototype.getPageContainer = function() {
	return this.pageContainer;
}