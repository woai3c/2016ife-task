//事件绑定兼容
function addEvent(ele, event, func) {
    if (ele.addEventListener) {
        ele.addEventListener(event, func);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, func);
    } else  {
        ele["on" + event] = func;
    }
}
//读取各个ID对象
var $ = function(id) {
			return document.getElementById(id);
		};
var tagVal = $("tagVal"),
	disTag = $("disTag"),
	hobbyVal = $("hobbyVal"),
	hobbyBtn = $("hobbyBtn"),
	disHobby = $("disHobby");
//实例对象
var tagObj = new CreatList(disTag),
	hobbyObj = new CreatList(disHobby);
//构造函数模式与原型模式结合
function CreatList(divList) {
	this.queue = [];
	this.render = function () {
		this.queue = clearRepeat(this.queue);
		if (this.queue.length > 10) {
			this.queue.shift();
		}
		var content = "";
		for (var i in this.queue) {
			content += "<li>" + this.queue[i] + "</li>";
		}
		divList.innerHTML = content;
		
	};
}
//读取兴趣爱好的值并去除符号
function hobbyClear() {
	var str = hobbyVal.value.trim();
	hobbyVal.value = null;
	var tempArry = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(data) {
            if (data != null && data.length > 0) {
                return true;
            } else {
                return false;
            }
        });
	return tempArry;
}
//数组去重
function clearRepeat(arry) {
	var tempArry = [];
	for(var i of arry) {
		if (tempArry.indexOf(i) == -1) {
			tempArry.push(i);
		}
	}
	return tempArry;
}
//按钮点击事件绑定函数
hobbyBtn.onclick = function() {
	hobbyObj.queue = hobbyObj.queue.concat(hobbyClear());
	hobbyObj.render();
};
//点击项目的值并删除
addEvent(disTag,"click",function(event){  
	var str = event.target.innerText.replace("点击删除", "");
	var index = tagObj.queue.indexOf(str);
	tagObj.queue.splice(index,1);
	tagObj.render();		
});
addEvent(disHobby,"click",function(event){ 
	var index = hobbyObj.queue.indexOf(event.target.innerText);
	hobbyObj.queue.splice(index,1);
	hobbyObj.render();
});
//鼠标OVER事件
addEvent(disTag,"mouseover",function(event){ 
	if (event.target.nodeName == "LI") {
		event.target.innerText = "点击删除" + event.target.innerText;
		event.target.style.background = "red"; 
	}
});
//鼠标OUT事件
addEvent(disTag,"mouseout",function(event){ 
	if (event.target.nodeName == "LI") {
		event.target.innerText = event.target.innerText.replace("点击删除", "");
		event.target.style.background = "#EE82EE";
	}	
});
//监测键盘事件 检测到输入特定的符号即执行if语句
addEvent(tagVal,"keyup",function(event){ 
	if (/[,.;，。；\n\s]+/.test(tagVal.value) || event.keyCode == 13) {
		var str = tagVal.value.split(/[,.;，。；\n\s]+/)[0];
		tagVal.value = null;
		if(str.length != 0) {
			tagObj.queue.push(str);
			tagObj.render();
		}	
	}
});