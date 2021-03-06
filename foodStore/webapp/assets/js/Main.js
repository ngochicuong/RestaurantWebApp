function Main() {
	this.navbar = document.querySelector("#navbar");
	this.logoutButton = document.querySelector("#logout");
	this.logoutButton.addEventListener("click", function() {
		window.location.href="/logout.do?loginCode="+Main.loginCode;
	}, false);
	this.pageManagement = new PageManagement();
	this.pageManagement.registerPage(new TablePage());
	this.pageManagement.registerPage(new OrderPage());
	this.pageManagement.registerPage(new ProductManagementPage());
	this.pageManagement.registerPage(new SeatManagementPage());
	this.pageManagement.registerPage(new AppointmentPage());
	this.pageManagement.registerPage(new AccountManagementPage());
	this.pageManagement.registerPage(new PromoManagementPage());
	this.pageManagement.registerPage(new ChartPage());
	this.pageManagement.registerPage(new AdminPage());
	var thiz = this;
	var navActived = null;
	navbar.addEventListener("click", function(event){
		var target = event.target;
		
		var pageNode = Dom.findUpward(target, {
			eval: function(node) {
				return node.getAttribute("page-name") != null;
			}
		}); 
		if (thiz.pageManagement.activePage && pageNode.getAttribute("page-name") == thiz.pageManagement.activePage.name) return;
		if (navActived != null) 
			navActived.classList.remove("active");
		
		pageNode.className += " active";
		
		
		navActived = pageNode;
		thiz.pageManagement.active(pageNode.getAttribute("page-name"));
	}, false);
	window.setTimeout(function() {
		thiz.navbar.childNodes[1].click();
	}, 10)
	var loginItem = document.querySelector("#account-info");
	Main.pageManagement = this.pageManagement;
	Main.loginCode = loginItem.getAttribute("loginCode");
	loginItem.removeAttribute("loginCode");
	

}

var busy = new BusyHandler();

document.onreadystatechange = function(e)
{
	busy.busy();
    if (document.readyState === 'complete')
    {
    	var mainWindow = new Main();
    	Main.busyHandler = busy;
		busy.unBusy();
    }
};

function BusyHandler() {
	this.page = Dom.newDOMElement({
		_name: "vbox",
		id: "loader-wrapper",
		_children: [
			{
				_name: "img",
				src: "webapp/assets/img/backgrounds/loading.jpg",
				style: "position: absolute; width: 100%; height: 100%; -webkit-filter: blur(5px); filter: blur(5px);"
			},
			{
				_name: "vbox",
				id: "loader",
			}
		]
	});
	
	this.wattingPage = Dom.newDOMElement({
		_name: "vbox",
		id: "loader-wrapper",
		style: "cursor:wait;  opacity: 0;"
	});
	
}
BusyHandler.prototype.waitting = function() {
	document.body.appendChild(this.wattingPage);
}

BusyHandler.prototype.unWait = function() {
	document.body.removeChild(this.wattingPage);
}

BusyHandler.prototype.busy = function() {
	document.body.appendChild(this.page);
}

BusyHandler.prototype.unBusy = function() {
	var thiz = this;
	window.setTimeout(function() {
		document.body.removeChild(thiz.page);
	}, 1000)
}

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "") + symbol;
};