function PageManagement() {
	this.pages = {};
	this.activePage;
	this.container = document.getElementById("main-container");
}
/*
 * page format: {name: , page: }
 * pages format : {}
 * */
PageManagement.prototype.registerPage = function(page){
	if (this.pages[page.name] != null) return;
	this.pages[page.name] = page;
}

PageManagement.prototype.active = function(pageName){
	if (this.pages[pageName] == null) return;
	this.activePage = this.pages[pageName];
	this.container.innerHTML = "";
	this.container.appendChild(this.activePage.getPageContainer());
	return this.activePage;
}

PageManagement.prototype.getActivePage = function(){
	return this.activePage;
}
