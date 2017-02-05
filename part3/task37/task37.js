// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}
function removeEvent(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
}

function $(id) {
	return document.getElementById(id);
}
		
// 创建一个对象 参数是遮罩层和浮出层的节点
function MaskLayer(maskNode, floNode) {
	this.mask = maskNode;
	this.flo  = floNode;
}
// 原型方法
MaskLayer.prototype = {
	init: function() {
		this.mask.style.width = window.screen.width + "px";
		this.mask.style.height = window.screen.height + "px";
		this.drag(this.flo);
		this.show();
	},
	show: function() {
		this.mask.style.display = "block";
	},
	hide: function() {
		this.mask.style.display = "none";
	},
	drag: function(node) {
		node.style.cursor = "move"
		addEvent(node, "mousedown", function(event) {
			var disX = event.clientX - node.offsetLeft,
				disY = event.clientY - node.offsetTop;
			function move(event) {
				node.style.left = event.clientX - disX + "px";
				node.style.top = event.clientY - disY + "px";
			}
			addEvent(document, "mousemove", move);
			addEvent(document, "mouseup", function(){
				removeEvent(document, "mousemove", move);
			});
		});
	}
}

function creatMaskLayer(maskNode, floNode) {
	return new MaskLayer(maskNode, floNode);
}

(function() {	
	var maskLayer = creatMaskLayer($("mask"), $("floatLayer"));
	maskLayer.init();
	
	addEvent($("floatLayer"), "click", function(event) {
		event.stopPropagation();
	});
	addEvent($("mask"), "click", function() {
		maskLayer.hide();
	});
	addEvent($("sure"), "click", function() {
		maskLayer.hide();
	});
	addEvent($("cancel"), "click", function() {
		maskLayer.hide();
	});
	addEvent($("login"), "click", function() {
		maskLayer.show();
	});
})();