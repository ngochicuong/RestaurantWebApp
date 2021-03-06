function CalendarDialog(callback) {
	this.contextMenuClassName = "Event-popup";
	this.contextMenuItemClassName = "Event__item";
	
	this.callback = callback;
	this.calendarItem;
	this.busyBackground = Dom.newDOMElement({
		_name: "div",
		style: "position: absolute; height:100%; width:100%; z-index: 99; top: 0px"
	});
	this.container = Dom.newDOMElement({
		_name : "vbox",
		class : this.contextMenuClassName,
		_children: [
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Họ & tên khách hàng:"
					},
					{
						_name: "input",
						id: "customer-name",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Số điện thoại: "
					},
					{
						_name: "input",
						id: "customer-phone",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Email: "
					},
					{
						_name: "input",
						id: "customer-mail",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Số lượng người: "
					},
					{
						_name: "input",
						id: "customer-capacity",
						type: "number",
						min: "0"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				style: "justify-content: center",
				_children : [
					{
						_name: "button",
						id: "accept",
						_text: "Đặt bàn "
					},
					{
						_name: "button",
						id: "close",
						_text: "Thoát"
					}
				]
			}
		]
	});
	var thiz = this;
	window.setTimeout(function() {
		thiz.customerPhone = thiz.container.querySelector("#customer-phone");
		thiz.customerName = thiz.container.querySelector("#customer-name");
		thiz.customerMail = thiz.container.querySelector("#customer-mail");
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		thiz.customerCapacity = thiz.container.querySelector("#customer-capacity");
		
		
		thiz.acceptButton.addEventListener("click", function(event) {
			thiz.onAccept();
		});
		thiz.closeButton.addEventListener("click", function(event) {
			thiz.onCancel();
		});
	}, 10);
	
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

CalendarDialog.prototype.onAccept = function() {
	var thiz = this;
	if (!this.validate()) {
		Dialog.alert("Lỗi! ","Vui lòng điền đầy đủ thông tin"
				, "Close", null, null , null, null, null
		);
		return;
	};
	var args = this.calendarItem;
	var callback = function(appointment){
		var e = new DayPilot.Event({
		      start: args.start,
		      end: args.end,
		      id: DayPilot.guid(),
		      resource: args.resource,
		      text: thiz.customerName.value + "\t" + thiz.customerPhone.value + "\t" + thiz.customerCapacity.value + "\t" + thiz.customerMail.value, 
		      cusName: thiz.customerName.value,
		      cusPhone: thiz.customerPhone.value,
		      cusMail: thiz.customerMail.value,
		      cusCapacity: thiz.customerCapacity.value,
		      eventId: appointment.id,
		      seatId: 0,
		      room: 0,
		      floor: 0
		  });
		thiz.callback(e);
		
	}
	serverReport.getJson("/createEvent.do", "POST", callback, {
				"name" : thiz.customerName.value,
				"phone" : thiz.customerPhone.value,
				"gender" : "1",
				"mail": thiz.customerMail.value,
				"capacity" : thiz.customerCapacity.value,
				"timeStart": moment(args.start.value).format('YYYY-MM-DD HH:mm:ss').toString(),
				"timeEnd": moment(args.end.value).format('YYYY-MM-DD HH:mm:ss').toString()
			});

	this.close();
}

CalendarDialog.prototype.onCancel = function() {
	this.close();
}

CalendarDialog.prototype.getContainer = function() {
	return this.container;
}

CalendarDialog.prototype.show = function(cEvent) {
	var thiz = this;
	this.calendarItem = cEvent;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

CalendarDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

CalendarDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}

CalendarDialog.prototype.validate = function(){
	var check = true;
	if (this.customerName.value == "") {
		this.customerName.style.background="#fff8b9";
		check = false;
	}else {
		this.customerName.style.background = "#fff";
	}
	
	if(this.customerPhone.value == "" && this.customerMail.value == ""){
		this.customerPhone.style.background = "#fff8b9";
		check = false;
	}else {
		this.customerPhone.style.background = "#fff";
	}
	
	if(this.customerMail.value == "" && this.customerPhone.value == ""){
		this.customerMail.style.background = "#fff8b9";
		check = false;
	}else {
		this.customerMail.style.background = "#fff";
	}
	
	if(this.customerCapacity.value == ""){
		this.customerCapacity.style.background = "#fff8b9";
		check = false;
	}else {
		this.customerCapacity.style.background = "#fff";
	}
	
	
	return check;
}




