// 获取每个ID对象
var $ = function(id) {
	return document.getElementById(id);
}
var inval = $("inval"),
	leftin = $("leftin"),
	rightin = $("rightin"),
	leftout = $("leftout"),
	rightout = $("rightout"),
	dis = $("dis"),
	bubble = $("bubble"),
	ran = $("ran");
// 初始化数组并为每个按钮绑定事件和处理函数
var disarry = [];
leftin.onclick = function() {
					if (disarry.length > 60) {
						alert("元素数量最多60个");
						return;
					}
					if (inval.value >= 10 && inval.value <= 100) {
						disarry.unshift(inval.value);
						showVal();
					}
					else 
						alert("输入的数字必须在10-100");
						
				 }
rightin.onclick = function() {
					if (disarry.length > 60) {
						alert("元素数量最多60个");
						return;
					}
					if (inval.value >= 10 && inval.value <= 100) {
						disarry.push(inval.value);
						showVal();
					}
					else 
						alert("输入的数字必须在10-100");
				 }	
leftout.onclick = function() {
						alert(disarry.shift(inval.value));
						showVal();
				 }
rightout.onclick = function() {
						alert(disarry.pop(inval.value));
						showVal();
		         }
// 冒泡排序
bubble.onclick = function () {
					disarry.sort(function(a,b){return a-b;});
					showVal();
				}	
// 随机产生50个数
ran.onclick = function () {
					disarry = [];
					var n,
						i = 0;
					while (i<50) {
						n = Math.round(Math.random()*100);
						if (n >= 10 && n <= 100) {
							disarry.push(n);
							i++;
						}	
					}
					showVal();
			 }
// 展示函数 获取数组的值 并用列表UL展示出来
function showVal() {	
	var content = "";
	for (var i in disarry) {
		content += "<li style='height:" + disarry[i]*5 + "px' data-num='" + disarry[i] + "'>" + "</li>";
	}
	dis.innerHTML = content;
}
// 点击数组中的某个值并删除
function DelData(num) {
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
	DelData(event.target.dataset.num);
});