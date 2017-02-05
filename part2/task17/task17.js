/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var $ = function(id) {
			return document.getElementById(id);
		};
var	graTime = document.getElementsByName("gra-time"),
	citySelect = $("city-select"),
	num,
	div = $("aqi-chart-wrap"),
	number = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三"];
// 随机颜色
function getColor(){  
    var colorElements = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f",
		colorArray = colorElements.split(","),
		color ="#";  
    for(var i =0;i<6;i++){  
        color+=colorArray[Math.floor(Math.random()*16)];  
    }  
    return color;  
} 
// 城市每日天气展示函数
function disDay(num) { 	
    var content = "";
	for (var i in num) {
		content += "<div title='" + i + " [AQI]:" + num[i] + "'style='width:10px; height:" + num[i] +"px; background:" + getColor() + ";'></div>";
	}	
	div.innerHTML = content;
}
// 城市周平均天气展示函数
function disWeek(num) { 	
	var temp = 0,
		tempNum,
		j=0,
		k=0,
		content = "";
	for (var i in num) {
		j++;
		temp += num[i];
		if (j%7 == 0) {
			tempNum = Math.round(temp/7);
			content += "<div title='" +  "第" + number[k] + "周 [AQI]:" + tempNum + "'style='width:50px; height:" + tempNum +"px; background:" + getColor() + ";'></div>";
			temp = 0;
			k++;
		}	
	}	
	div.innerHTML = content;
}
// 城市月平均天气展示函数
function disMonth(num) {
	var re1 = /2016-01/,
	    re2 = /2016-02/,
		re3 = /2016-03/,
		temp1 = 0,
		temp2 = 0,
		temp3 = 0,
		n1 = 0,
		n2 = 0,
		n3 = 0,
		content = "";
	for (var i in num) {
		if (re1.test(i)) {
			temp1 += num[i];
			n1++;
		}
		else if (re2.test(i)) {
			temp2 += num[i];
			n2++;
		}
		else if (re3.test(i)) {
			temp3 += num[i];
			n3++;
		}
	}	
	var temp =[],
	    k = 0;
	temp.push(Math.round(temp1/n1));
	temp.push(Math.round(temp2/n2));
	temp.push(Math.round(temp3/n3));
	for (i of temp) {
		content += "<div title='" + number[k] + "月 [AQI]:" + i + "'style='width:120px; height:" + i +"px; background:" + getColor() + ";'></div>";
	    k++;
	}
	div.innerHTML = content;
}
//检测选项选中的值并调用图表渲染函数
function checkState() {
	//单选框
	var checkValue;
	for (var i in graTime) {
		if (graTime[i].checked) {
			checkValue = graTime[i].value;
		}
	}
	//下拉项
	var index = citySelect.selectedIndex;  
    var checkCity = citySelect.options[index].text;
	num = aqiSourceData[checkCity];
	switch (checkValue) {
		case 'day':
			disDay(num);
			break;
		case 'week':
			disWeek(num);
			break;
		case 'month':
			disMonth(num);
			break;
		default: alert("程序出错");
	}
}
//监测单选框 下拉项变动事件
function init() {
	checkState();
	citySelect.onchange = checkState;
	$("form-gra-time").onchange = checkState;
}
init();