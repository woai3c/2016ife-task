//看了其他团队的代码 学习到了另一种方法 任务34和任务33分别用了不同的方法 感觉任务34这种比较简单直观并且实现了动画效果
var $ = function(id) {
	return document.getElementById(id);
};
var input = $("input"),
	smallBox = $("smallBox"),
	index = "3", //数字标志方向 0上 1右 2下 3左
	button = $("button");
//初始化设置小方块
smallBox.style.transform = "rotateZ(0deg)";
smallBox.style.top = "208px";
smallBox.style.left = "208px";
//点击旋转时 改变角度
function setDirection(degree) {
	smallBox.style.transform = "rotateZ(" + degree + "deg)";
}
button.onclick = function () {
	switch(input.value.toUpperCase()) {
		case "TT": setDirection(90);
				  index = "0";
				  go(index);
				  break;
		case "RT": setDirection(180);
				  index = "1";
				  go(index);
				  break;
		case "BT": setDirection(270);
				  index = "2";
				  go(index);
				  break;
		case "LT": setDirection(0);
				  index = "3";
				  go(index);
				  break;
		default: if (/[0123]/.test(input.value)) {
					go(input.value);
				}
	}
}
//移动函数
function go(index) {
	switch(index) {
		case "0": if (smallBox.style.top == "48px") 
					break;
				  smallBox.style.top = (parseInt(smallBox.style.top) - 40) + "px";
			      break;
		case "1": if (smallBox.style.left == "408px") 
					break;
				  smallBox.style.left = (parseInt(smallBox.style.left)  + 40) + "px";
				  break;

		case "2": if (smallBox.style.top == "408px") 
					break;
				  smallBox.style.top = (parseInt(smallBox.style.top)  + 40) + "px";
				  break;
		case "3": if (smallBox.style.left == "48px") 
					break;
				  smallBox.style.left = (parseInt(smallBox.style.left) - 40) + "px";
				  break;
		default: break;
	}
}