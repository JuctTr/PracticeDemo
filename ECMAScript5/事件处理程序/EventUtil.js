/* 
	跨浏览器的实践对象
*/
// DOM 0 级事件处理程序   btn.onclick = ..........
/* DOM 2 级事件处理程序（ IE9  以下不兼容）
	addEventListener("click", function(){

	}, false)
	removeEventListener("click", function(){

	}, false)
	如果是 true ，表示在捕获阶段调用事件处理程序；
	如果是 false ，表示在冒泡阶段调用事件处理程序。
    
	IE事件处理程序，IE独有，只能在IE上测试
	attachEvent("onclick", function(){

	});
	detachEvent("onclick", function(){
		
	})
*/
var EventUtil = {
	// 跨浏览器事件处理程序
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
	// 跨浏览器事件对象
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