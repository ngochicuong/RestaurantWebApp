function ContextMenu() {
	this.contextMenuClassName = "context-menu";
	this.contextMenuItemClassName = "context-menu__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";

	this.taskItemClassName = "task";
	this.taskItemInContext;

	this.clickCoords;
	this.clickCoordsX;
	this.clickCoordsY;

	this.menu;
	this.menuItems;
	this.menuState = 0;
	this.menuWidth;
	this.menuHeight;
	this.menuPosition;
	this.menuPositionX;
	this.menuPositionY;

	this.windowWidth;
	this.windowHeight;
	this.flag = false;
	
	this.handleItem;
	this.targetNode;
	
//	this.body = document.getElementById("main-container");
	this.actions={};
}

/*
 * [{name: " ", handler: function}] <nav id="context-menu" class="context-menu">
 * <ul class="context-menu__items"> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="View"><i class="fa fa-eye"></i>
 * View Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>
 * Edit Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Delete"><i class="fa fa-times"></i>
 * Delete Task</a> </li> </ul> </nav>
 * 
 * 
 */

ContextMenu.prototype.init = function(menuItems) {
	this.menu = Dom.newDOMElement({
		_name : "nav",
		class : "context-menu"
	});

	this.menuItems = Dom.newDOMElement({
		_name : "ul",
		class : "context-menu__items"
	});
	var thiz = this;
	for (var i = 0; i < menuItems.length; i++) {
		var item = menuItems[i];
		if (item == null)
			continue;
		var text = item.name;
		var liNode = Dom.newDOMElement({
			_name : "li",
			_text : text,
			class : "context-menu__item"
		});
		
		if (item.handler != null) liNode.action = item.handler;
		if (item.express != null) liNode.express = item.express;
		this.menuItems.appendChild(liNode);
	}
	this.menu.appendChild(this.menuItems);
	
	this.menuItems.addEventListener("click", function(ev){
		if (ev.target.action != null) ev.target.action(thiz.handleItem);
	}, false);
	
	
	document.addEventListener("click", function(e) {
		if (thiz.flag && e.button == 0) {
			thiz.flag = false;
			thiz.toggleMenuOff();
		}
		
	}, true);
	this.renderItems();
}

ContextMenu.prototype.renderItems = function() {
	for(var i = 0; i < this.menuItems.children.length; i++) {
		var li = this.menuItems.children[i];
		if (li.express != null) {
			var check = li.express();
			if  (!check) {
				li.style.display = "none";
			} else {
				li.style.display = "block";
			}
		}
	}
}

ContextMenu.prototype.getMenu = function() {
	return this.menu;
}

ContextMenu.prototype.toggleMenuOn = function(e) {
	e.preventDefault();
	this.handleItem = e.dataNode;
	this.positionMenu(e);
	this.renderItems();
	document.body.appendChild(this.menu);
	this.flag = true;
	
}

ContextMenu.prototype.toggleMenuOff = function() {
	document.body.removeChild(this.menu);
}

ContextMenu.prototype.positionMenu = function(e) {
	var menu = this.menu;
	clickCoords = this.getPosition(e);
	clickCoordsX = clickCoords.x;
	clickCoordsY = clickCoords.y;

	menuWidth = menu.offsetWidth + 4;
	menuHeight = menu.offsetHeight + 4;

	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if ((windowWidth - clickCoordsX) < menuWidth) {
		menu.style.left = windowWidth - menuWidth + "px";
	} else {
		menu.style.left = clickCoordsX + "px";
	}

	if ((windowHeight - clickCoordsY) < menuHeight) {
		menu.style.top = windowHeight - menuHeight + "px";
	} else {
		menu.style.top = clickCoordsY + "px";
	}
}

ContextMenu.prototype.getPosition = function(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }