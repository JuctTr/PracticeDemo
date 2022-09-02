// JavaScript Document

/* 
	
	跨浏览器的实践对象

*/

// DOM 0 级事件处理程序   btn.onclick = ..........
/* DOM 2 级事件处理程序
	addEventListener("click", function(){

	}, false)
	removeEventListener("click", function(){

	}, false)
	IE事件处理程序，IE独有，只能在IE上测试
	attachEvent("onclick", function(){

	});
	detachEvent("onclick", function(){
		
	})
*/


var EventUtil = {
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {//attachEvent() ,IE的事件处理程序，IE独有，只能在IE上测试
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	getEvent: function (event) {
		return event ? event : window.event;
	},
	getTarget: function (event) {
		return event.target || event.srcElement;//srcElement是IE中的事件对象
	},
	preventDafault: function (event) {//取消事件默认行为
		if (event.preventDafault) {
			event.preventDafault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function (event) {//取消事件进一步捕获或冒泡 
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	getRelatedTarget: function (event) {//相关元素的信息
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	}
	// getButton: function (event) { // 鼠标按钮
	// 	if (document.implementation.hasFeature("MouseEvents","2.0")){
	// 		return event.button;
	// 	} else {
	// 		switch(event.button){
	// 			case 0:
	// 			case 1:
	// 			case 2:
	// 			case 3:
	// 			case 4:
	// 			case 5:
	// 			case 6:
	// 			case 7:

	// 		}
	// 	}
	// }
}
//客户端坐标位置
var div1 = document.getElementById("myDiv1");
EventUtil.addHandler(div1, "click", function (event) {
	event = EventUtil.getEvent(event);
	alert("Client coordinates: " + event.clientX + "," + event.clientY);
	console.log("客户端坐标位置: " + event.clientX + "," + event.clientY);
});

//页面坐标位置
var div2 = document.getElementById("myDiv2");
EventUtil.addHandler(div2, "click", function (event) {
	event = EventUtil.getEvent(event);
	var pageX = event.pageX,
		pageY = event.pageY;
	if (pageX === undefined) {
		pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
	}
	if (pageY === undefined) {
		pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
	}
	alert("Page coordinates: " + pageX + "," + pageY);
	console.log("页面坐标位置: " + pageX + "," + pageY);
});

//屏幕坐标位置
var div3 = document.getElementById("myDiv3");
EventUtil.addHandler(div3, "click", function (event) {
	event = EventUtil.getEvent(event);
	alert("Screen coordinates: " + event.screenX + "," + event.screenY);
	console.log("屏幕坐标位置: " + event.screenX + "," + event.screenY);
});

//键盘的状态，当键盘按下时，点击鼠标触发相应的事件
var divClavier = document.getElementById("clavier");
EventUtil.addHandler(divClavier, "click", function (event) {
	event = EventUtil.getEvent(event);
	var keys = new Array();
	if (event.shiftKey) {
		keys.push("shift");
	}
	if (event.ctrlKey) {
		keys.push("ctrl");
	}
	if (event.altKey) {
		keys.push("alt");
	}
	if (event.metaKey) {
		keys.push("meta");
	}
	console.log("Keys: " + keys.join(","));
	
});

var divRelate = document.getElementById("relate");
EventUtil.addHandler(divRelate, "mouseout", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var relatedTarget = EventUtil.getRelatedTarget(event);
	console.log("相关元素的信息" + "Moused out of " + target.tagName + " to " + relatedTarget.tagName);
});