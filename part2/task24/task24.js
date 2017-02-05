var $ = function(id) {
	return document.getElementById(id);
};
var root = $("root"),
	pre = $("pre"),
	wide = $("wide"),
	arry = [],
	selectNode,
	timer = null,
	last = $("last"),
	searchVal = $("searchVal"),
	container = $("container");
	nodeVal = $("nodeVal"),
	addNode = $("addNode"),
	delNode = $("delNode"),
	divs = container.getElementsByTagName("div");
//按钮点击事件 绑定函数
pre.onclick = function() {
	reSet();
	preOrder(root);
	render();
};
last.onclick = function() {
	reSet();
	lastOrder(root);
	render();
};
wide.onclick = function() {
	reSet();
	wideOrder(root);
	render();
};
//增加节点
addNode.onclick = function() {
	var str = nodeVal.value.trim();
	if (!str) { 
		alert("请输入要添加的内容");
		return;
	}
	if (!selectNode) {
		alert("请选中一个节点");
		return;
	}
	var newNode = document.createElement("div");
	newNode.innerHTML = str;
	selectNode.appendChild(newNode);
	addClickEvent();
};
//删除节点
delNode.onclick = function() {
	if (!selectNode) {
		alert("请选中一个节点");
		return;
	}
	var parNode = selectNode.parentNode;
	parNode.removeChild(selectNode);
};
//遍历每个节点并添加点击事件
function addClickEvent() {
	for (var i = 0, len = divs.length; i < len; i++) {
		divs[i].onclick = function(e) {
			reSet();
			this.style.background = "yellow";
			e.stopPropagation();
			selectNode = this;
		};
	}
}
//多叉树算法
function preOrder(node) {
	if (node) {
		arry.push(node);
		for (var i = 0, len = node.children.length; i < len; i++) {
			preOrder(node.children[i]);
		}
	}
}	
function lastOrder(node) {
	if (node) {
		for (var i = 0, len = node.children.length; i < len; i++) {
			lastOrder(node.children[i]);
		}
		arry.push(node);
	}
}
function wideOrder(node) {
	var temp = [];
	temp.push(node);
	while (temp.length) {
		var node = temp.shift();
		arry.push(node);
		for (var i = 0, len = node.children.length; i < len; i++) {
			temp.push(node.children[i]);
		}
	}
}	
//div渲染	
function render() {
	var i = 0;
	var str = searchVal.value.trim();
	arry[i].style.background = "blue";
	timer = setInterval(function () {
		i++;
		if (i < arry.length) {
			arry[i-1].style.background = "#fff";
			arry[i].style.background = "blue";	
			if (arry[i-1].firstChild.nodeValue.trim() == str) {
				arry[i-1].style.background = "red";
				arry[i-1].style.color = "#fff";
			}
		} else {
			clearInterval(timer);
			arry[arry.length-1].style.background = "#fff";
			if (arry[i-1].firstChild.nodeValue.trim() == str) {
				arry[i-1].style.background = "red";
				arry[i-1].style.color = "#fff";
			}
		}
	},500)
}
//初始化样式
function reSet() {
	arry = [];
	clearInterval(timer);
	for (var i = 0, len = divs.length; i < len; i++) {
		divs[i].style.background = "#fff";
		divs[i].style.color = "black";
	}
}
addClickEvent();