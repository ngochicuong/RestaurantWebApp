function Table() {
	this.tableBody;
	var tHeader;
	var table;
	this.selectedItem = null;
}

Table.prototype.init = function(tHeader) {
	this.tHeader = tHeader;
	this.table = Dom.newDOMElement({
		_name : "table",
		class : "table table-bordered"

	});
	var trNode = Dom.newDOMElement({
		_name : "tr"
	});
	for (var i = 0; i < tHeader.length; i++) {
		var h = tHeader[i];
		var tdNode = Dom.newDOMElement({
			_name : "td",
			_text : h
		});
		trNode.appendChild(tdNode);
	}
	var theaderNode = Dom.newDOMElement({
		_name : "thead"
	});
	theaderNode.appendChild(trNode);
	this.table.appendChild(theaderNode);
	this.tableBody = Dom.newDOMElement({
		_name : "tbody"
	});
	this.table.appendChild(this.tableBody);
	var thiz = this;
	this.tableBody.addEventListener("hover", function(ev) {
		var target = ev.target;
		if (target.data != null) thiz.selectedItem = target;
	})
}

Table.prototype.getTable = function() {
	return this.table;
}

Table.prototype.removeChild = function(itemNode){
	this.tableBody.removeChild(itemNode);
}

Table.prototype.render = function(items) {
	this.tableBody.innerHTML = "";
	if ( items.length == 0) return;
	var thiz = this;
	var addItem = function(item) {
		var trNode = Dom.newDOMElement({
			 _name: "tr",
			 class: "tableItem"
		 });
		for (var i = 0; i < thiz.tHeader.length; i++) {
			var tdNode = Dom.newDOMElement({
				 _name: "td",
			 });
			for(var index in item) {
				if (index == thiz.tHeader[i]) {
					tdNode.innerHTML = item[index];
					break;
				}
			}
			trNode.appendChild(tdNode);
			trNode.data = item;
		}
		return trNode;
	}
	for(var i = 0; i < items.length; i++) {
		this.tableBody.appendChild(addItem(items[i]));
	}
}
Table.prototype.getSelectedItemObject = function() {
	return this.selectedItem;
}












