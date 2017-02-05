// 获取每个ID对象
var $ = function(id) {
	return document.getElementById(id);
}
var inval = $("inval"),
	leftin = $("leftin"),
	rightin = $("rightin"),
	leftout = $("leftout"),
	rightout = $("rightout"),
	searchInput = $("searchInput"),
	search = $("search"),
	dis = $("dis");
// 初始化数组并为每个按钮绑定事件和处理函数
var disarry = [];
search.onclick = function() {
					var content = "";
					var str = searchInput.value.trim();
					dis.innerHTML = disarry.map(function(data) {
						data = data.replace(new RegExp(str,"g"), "<span>" + str + "</span>");
						return "<li>" + data + "</li>";
					}).join("");
				 }
leftin.onclick = function() {
					var temp = clear().reverse();	
					for (var i of temp) {
						disarry.unshift(i);
					}	
					showVal();
				 };
rightin.onclick = function() {
					var temp = clear();	
					for (var i of temp) {
						disarry.push(i);
					}	
					showVal();
				 };
leftout.onclick = function() {
					alert(disarry.shift());
					showVal();
				 };
rightout.onclick = function() {
					alert(disarry.pop());	
					showVal();		
				 };
//去除多余符号 空格
function clear() {
	var str = inval.value.trim();
	var tempArry = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(data) {
            if (data != null && data.length > 0) {
                return true;
            } else {
                return false;
            }
        });
	return tempArry;
}	
// 展示函数 获取数组的值 并用列表UL展示出来
function showVal() {				 
	var content = "";
	for (var i in disarry) {
		content += "<li>" + disarry[i] + "</li>";
	}
	dis.innerHTML = content;
}
// 点击数组中的某个值并删除
function delData(num) {
	for (var i in disarry) {
		if (disarry[i] == num) {
			delete disarry[i];
			break;
		}
	}
	showVal();
}	
//事件绑定函数，兼容浏览器差异
function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, func);
    }
    else {
        element["on" + event] = func;
    }
}
// 获取点击时对应数组的值 并把它传到删除函数
addEvent(dis,"click",function() {
	delData(event.target.innerText);
});