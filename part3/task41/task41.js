function $(id) {
	return document.getElementById(id);
}

// 构造函数
function Calender(table) {
	this.table = table;
}

// 原型方法
Calender.prototype = {
	init: function() {			// 初始化并获取当前年月
		var self = this;
		var btn = $("btn");
		btn.onclick = function () {				// 为BUTTON添加一个事件 点击将显示或隐藏日历
			if (self.table.style.visibility == "visible") {
				self.table.style.visibility = "hidden";
				btn.innerHTML = "显示日历";
			}
			else {
				self.table.style.visibility = "visible";
				btn.innerHTML = "隐藏日历";
			}
		}
		
		var now = new Date();
		var y = now.getFullYear();
		var m = now.getMonth();
		this.repeat(y, m);   
	},
	repeat: function(y, m) {		// 获取当月1号是星期几
		var start = new Date(y, m, 1);
		var indexDay = start.getDay();
		var currentDate = $("currentDate");
		currentDate.innerHTML = y + "年" + (m+1) + "月";	// 把当前日期显示在caption
		this.creatTab();					// 绘制表格
		this.renderTab(y, m, indexDay);		// 渲染表格
		this.returnDate(y, m, null);				// 点击日期的时候把日期显示在INPUT当中
		this.chooseDate(y, m);				// 为SPAN添加点击事件 可以显示上年 上月 下年 下月的日期
	},
	creatTab: function() {
		var tbody = this.table.tBodies[0];  // 获取tbody的内容
		tbody.innerHTML = "";				// 初始化
		for (var i = 0; i < 6; i++) {		// 创建6行TR 每行TR 7个TD
			var tr = document.createElement("tr");
			tbody.appendChild(tr);
			for (var j = 0; j < 7; j++) {
				var td = document.createElement("td");
				td.innerHTML = "&nbsp;";
				td.className = "hover";
				tr.appendChild(td);
			}			
		}
	},
	renderTab: function(y, m, indexDay) {		// 渲染表格 为表格添加内容
		var trs = this.table.tBodies[0].rows;
		var count = 1;
		var allDay;
		var tmp = new Date();
		var tmpY = tmp.getFullYear();
		var tmpM = tmp.getMonth();
		var tmpD = tmp.getDate();
		var tempIndex = indexDay;
		while (tempIndex > 0) {					// 日期1号前面没有日期的格子不设置样式 所以将类名设置为空
			tempIndex--;
			trs[0].cells[tempIndex].className = "";
		}
		for (; indexDay < 7; indexDay++) {		// 第一行的日期
			trs[0].cells[indexDay].innerHTML = count;
			count++;
		}
		for (var i = 1; i < 6; i++) {			// 后续行的日期
			for (var j = 0; j < 7; j++) {
				trs[i].cells[j].innerHTML = count;
				count++;
			}	
		}
		
		switch(m) {		// 判断月份并设置当月的天数
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				allDay = 31;
				break;
			case 3:
			case 5:
			case 8:
			case 10:
				allDay = 30;
				break;
			case 1:
				if ((y%400 == 0) || (y%4 == 0 && y%100 != 0))
					allDay = 29;		// 闰年
				else
					allDay = 28;		// 平年
				break;
			default: break;
		}
		for (var k = 0; k < 6; k++) {		// 将超过当月天数的TD 内容设为空 
			for (var n = 0; n < 7; n++) {
				if (trs[k].cells[n].innerHTML > allDay) {
					trs[k].cells[n].innerHTML = "&nbsp;";
					trs[k].cells[n].className = "";
				}
				else if (trs[k].cells[n].innerHTML == tmpD && y == tmpY && m == tmpM) {
					trs[k].cells[n].style.color = "blue";  // 当天日期高亮显示
					this.returnDate(tmpY, tmpM, tmpD);
				}
			}
		}
	},
	returnDate: function(y, m, d) {			// 点击日期时将日期的内容显示在INPUT
		var self = this;
		var trs = this.table.tBodies[0].rows;
		var input = $("date");
		if (d) {
			input.value = y + "-" + (m+1) + "-" + d;
			return;
		}
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 7; j++) {
				trs[i].cells[j].onclick = function() {
					var d = this.innerHTML;
					if (d != "&nbsp;") {
						input.value = y + "-" + (m+1) + "-" + d;
						self.table.style.visibility = "hidden";		// 选中一个日期后会隐藏日历
						$("btn").innerHTML = "显示日历";
					}
				}
			}	
		}		
	},
	chooseDate: function(y, m) {		// 为SPAN添加点击事件
		var self = this;
		var spans = document.getElementsByTagName("span");
		for (var i = 0, len = spans.length; i < len; i++) {
			spans[i].index = i;	  		// 如果不将I这样赋值给spans[i].index 后面的点击事件绑定的全是I的最大值
			spans[i].onclick = function() {
				switch(this.index) {
					case 0:
						m--;
						break;
					case 1:
						y--;
						break;
					case 3:
						y++;						
						break;	
					case 4:
						m++;
						break;	
					default: break;
				}
			    if (m < 0) {		// 如果M为1月 在点击上一月时 自动减一年 将月份设为12月
					y--; 
					m = 11; 
				}
				if (m > 11) {		// 如果M为12月 在点击下一月时 自动加一年 将月份设为1月
					y++; 
					m = 0; 
				}
				if (y < 1970 || y > 2030) {
					alert("当前日历只能显示1970-2030年"); 		// 设定日期上限下限 超过将弹窗提示
					y = 2017;
					return;
				}
				self.repeat(y, m);
			}
		}
	}
}

function creatCalender(table) {			// 创建一个函数来创建对象
	return new Calender(table);
}
(function() {						// 在打开页面的同时创建对象并执行init();
	var calender = creatCalender($("tab"));
	calender.init();
})();