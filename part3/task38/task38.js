// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}

function $(id) {
	return document.getElementById(id);
}

function ce(nodeName) {
	return document.createElement(nodeName);
}

// 随机产生分数
function randomData(n) {
	var arry = [],
		sum = 0;
	for (var i = 0; i < n; i++) {
		var num = Math.floor(Math.random()*100)+1;
		sum += num;
		arry.push(num);
	}
	arry.push(sum);
	return arry;
}	

var sourceData = {
	"小明": randomData(3),
	"小红": randomData(3),
	"小亮": randomData(3),
	"小华": randomData(3),
	"小花": randomData(3)
};
var object = ["姓名", "语文", "数学", "英语", "总分"];

function SortTable(data, object, table) {
	this.table = table;
	this.data = data;
	this.object = object;
	this.name = null;
}

SortTable.prototype = {
	init: function() {
		this.name = [];
		for (var i in this.data) {
			this.name.push(i);
		}
		this.render();
	},
	render: function() {           // 按照名字的排序方式来渲染表格 
		var	content = "";
		content += "<tr>";
		for (var i in this.object) {
			content += "<th>" + this.object[i] + "</th>";
		}
		content += "</tr>";
		for (var j in this.name) {
			content += "<tr>" + "<td>" + this.name[j] + "</td>";
			for(var k in this.data[this.name[j]]) {
				content += "<td>" + this.data[this.name[j]][k] + "</td>";
			}
			content += "</tr>";
		}
		this.table.innerHTML = content; 
		this.addArrow();
	},
	addArrow: function() {
		var self = this;
		
		// 给每个三角箭头赋上点击事件 点击的时候排序
		function addSortEvent(index) {
			var container = ce("div"),
				divUp = ce("div"),
				divDown = ce("div");
				
			divUp.className = "up";
			divDown.className = "down";
			container.className = "container";
			container.appendChild(divUp);
			container.appendChild(divDown);
			self.table.children[0].children[0].children[i].appendChild(container); // 取得th节点 再把三角箭头添加进去
			
			addEvent(divUp, "click", function(event) {
				self.name.sort(function(a, b){
					return self.data[b][index - 1] - self.data[a][index - 1];
				});
				self.render();
			});
			addEvent(divDown, "click", function(event) {
				self.name.sort(function(a, b){
					return self.data[a][index - 1] - self.data[b][index - 1];
				});
				self.render();
			});
		}
		
		// 在这先把索引值弄好 再把值传到addSortEvent函数 这样索引值就固定不变
		for(var i = 1, len = self.object.length; i < len; i++) {
			addSortEvent(i);
		}
	}
}
var sortTab = new SortTable(sourceData, object, $("tab"));
sortTab.init();