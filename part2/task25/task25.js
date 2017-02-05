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
	openAllDiv();
	render();
};
last.onclick = function() {
	reSet();
	lastOrder(root);
	openAllDiv();
	render();
};
wide.onclick = function() {
	reSet();
	wideOrder(root);
	openAllDiv();
	render();
};
//增加节点
addNode.onclick = function() {
	//在添加节点时 如果选中的节点关闭并有子节点 则将所有子节点展开
	if (selectNode.children.length) {
		for (var i = 0, len = selectNode.children.length; i < len; i++) {
			selectNode.children[i].style.display = "block";
		}
	}
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
	newNode.innerHTML = "-" + str;
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
			//判断每个节点是否有子节点 如果有 每次点击的时候看子节点是隐藏还是显示而将子节点设置为相反样式 //这样就能在点击的时候出现隐藏或显示的效果
			if (this.children.length) {
				for (var j = 0, l = this.children.length; j < l; j++) {
					if (this.children[j].style.display == "none") {
						this.children[j].style.display = "block";
						this.firstChild.nodeValue = this.firstChild.nodeValue.replace("+", "-");
					}
					else {
						this.children[j].style.display = "none";
						this.firstChild.nodeValue = this.firstChild.nodeValue.replace("-", "+");
					}
				}				
			}
			else {
				this.style.display = "block";
			}
			this.style.background = "#d3d3d3";
			e.stopPropagation();
			selectNode = this; //将选中的节点赋值给selectNode
		};
	}
}
//多叉树算法
//递归
function preOrder(node) {
	if (node) {
		arry.push(node);
		for (var i = 0, len = node.children.length; i < len; i++) {
			preOrder(node.children[i]);
		}
	}
}	
//递归
function lastOrder(node) {
	if (node) {
		for (var i = 0, len = node.children.length; i < len; i++) {
			lastOrder(node.children[i]);
		}
		arry.push(node);
	}
}
//队列
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
	var re = /[+-]/;     
	var str = searchVal.value.trim().replace(re, "");//在搜索时将DIV里的字符串把+和-号去掉再作对比
	arry[i].style.background = "#d3d3d3";
	timer = setInterval(function () {
		i++;
		if (i < arry.length) {
			arry[i-1].style.background = "#fff";
			arry[i].style.background = "#d3d3d3";	
			if (arry[i-1].firstChild.nodeValue.trim().replace(re, "") == str) {
				arry[i-1].style.background = "red";
				arry[i-1].style.color = "#fff";
			}
		} else {
			clearInterval(timer);
			arry[arry.length-1].style.background = "#fff";
			if (arry[i-1].firstChild.nodeValue.trim().replace(re, "") == str) {
				arry[i-1].style.background = "red";
				arry[i-1].style.color = "#fff";
			}
		}
	},500)
}
//在每次查询的时候将所有列表展开
function openAllDiv() {
	for (var i = 0, len = arry.length; i < len; i++) {
		arry[i].style.display = "block";
	}
}
//初始化样式 在每次点击的时候将全部节点背景色设为白色 不然点下一个节点 上一个节点还是灰色
function reSet() {
	arry = [];
	clearInterval(timer);
	for (var i = 0, len = divs.length; i < len; i++) {
		divs[i].style.background = "#fff";
		divs[i].style.color = "black";
	}
}
addClickEvent();