var $ = function(id) {
	return document.getElementById(id);
};
var root = $("root"),
	pre = $("pre"),
	wide = $("wide"),
	arry = [],
	timer = null,
	last = $("last"),
	searchVal = $("searchVal");
//按钮点击事件 绑定函数
pre.onclick = function() {
	reSet();
	preOrder(root);
	render();
}
last.onclick = function() {
	reSet();
	lastOrder(root);
	render();
}
wide.onclick = function() {
	reSet();
	wideOrder(root);
	render();
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
//数组渲染	
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
	var divs = document.getElementsByTagName("div");
	for (var i = 0, len = divs.length; i < len; i++) {
		divs[i].style.background = "#fff";
		divs[i].style.color = "black";
	}
}