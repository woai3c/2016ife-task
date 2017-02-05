// 看了其他团队的代码 学习到了另一种方法 任务34和任务33分别用了不同的方法 感觉任务34这种比较简单直观并且实现了动画效果
// 先看前面16行代码 再从button点击事件开始看
var $ = function(id) {
	return document.getElementById(id);
};
var input = $("input"), 				// 命令输入框
	smallBox = $("smallBox"), 			// 小方块
	index = "3", 						// 数字标志方向 0上 1右 2下 3左
	refresh = $("refresh"),	 			// 命令清空按钮
	timer = null,						// 计时器
	button = $("button"),				// 执行命令按钮
	disRow = $("disRow");				
// 初始化设置小方块
smallBox.style.transform = "rotateZ(0deg)";
smallBox.style.top = "208px";
smallBox.style.left = "208px";
// 点击旋转时 改变角度
function setDirection(degree) {
	smallBox.style.transform = "rotateZ(" + degree + "deg)";
}
button.onclick = function () {
	if (timer) {                         // 清除计数器
		clearInterval(timer);
	}	
	var inputArry = input.value.trim().toUpperCase().split("\n"),
		i = 0,
		len = inputArry.length,
	    divs = disRow.getElementsByTagName("div");		
	timer = setInterval(function(){
		if (i < len) {
			var tempArry = inputArry[i].split(" ");
			console.log(tempArry[1]);
			if (tempArry[1]) {
				checkCommand(tempArry[0], i, tempArry[1], divs);
				i++;
			}
			else {
				checkCommand(tempArry[0], i, 1, divs);
				i++;
			}
		}	
	},500);
};
// 检查指令后面是否有执行次数 四个参数依次为命令 命令所在数组的索引  执行次数 左边标注行数的DIV
function checkCommand(value, i, num, divs) {
  while (num) {
	switch(value) {
		case "TT": setDirection(90);
				   index = "0";  // 为了在向前移动的时候判断当前朝向
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
		default: if (/[0123]/.test(value)) {
					go(value);
				 }
				 else {
					divs[i].style.background = "red";
				 }
				 break;
	}
	num--;
  }	
}
// 移动函数
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
// 清空命令
refresh.onclick = function() {
	input.value = null;
	disRow.innerHTML = "";
};
//  监听文本域键盘事件	
input.addEventListener("keyup", function() {
	rowHasChange();
});
function rowHasChange() {
		var rows = input.value.trim().toUpperCase().split("\n"),
			arr = [],
			top = input.scrollTop;
		for (var i = 0; i < rows.length; i++) {
			arr.push("<div class='error'>" + (i + 1) + "</div>");
		}
		disRow.innerHTML = arr.join("");
		disRow.scrollTop = top;
	}