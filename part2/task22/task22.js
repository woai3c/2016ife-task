var $ = function(id) {
	return document.getElementById(id);
};
var root = $("root"),
	pre = $("pre"),
	mid = $("mid"),
	wide = $("wide"),
	arry = [],
	timer = null,
	last = $("last");
//按钮点击事件 绑定函数
pre.onclick = function() {
	reSet();
	preOrder(root);
	render();
}
mid.onclick = function() {
	reSet();
	midOrder(root);
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
//递归二叉树算法
function preOrder(node) {
	if (node) {
		arry.push(node);
		preOrder(node.children[0]);
		preOrder(node.children[1]);
	}
}	
function midOrder(node) {
	if (node) {
		midOrder(node.children[0]);
		arry.push(node);
		midOrder(node.children[1]);
	}
}	
function lastOrder(node) {
	if (node) {
		lastOrder(node.children[0]);
		lastOrder(node.children[1]);
		arry.push(node);
	}
}
function wideOrder(node) {
	var temp = [];
	temp.push(node);
	while (temp.length) {
		var node = temp.shift();
		arry.push(node);
		if (node.children[0])
			temp.push(node.children[0]);
		if (node.children[1])
			temp.push(node.children[1]);
	}
}	
//数组渲染	
function render() {
	var i = 0;
	arry[i].style.background = "blue";
	timer = setInterval(function () {
		i++;
		if (i < arry.length) {
			arry[i-1].style.background = "#fff";
			arry[i].style.background = "blue";
		} else {
			clearInterval(timer);
			arry[arry.length-1].style.background = "#fff";
		}
	},500)
}
//初始化样式
function reSet() {
	arry = [];
	clearInterval(timer);
}