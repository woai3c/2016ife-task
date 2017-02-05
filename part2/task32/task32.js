//取得各个ID的对象
var $ = function(id) {
	return document.getElementById(id);
};
var data = {
	名称: "inputName",
	密码: "inputPwd1",
	确认密码: "inputPwd2",
	邮箱: "mail",
	手机: "tel"
};
var generator = $("generator"),
	inputArry = generator.getElementsByTagName("input"),
	creatBtn = $("creatBtn"),
	re = /[\u4e00-\u9fa5]/g,
	ulForm = $("form");
//表单生成
function creatForm() {
	var arry = [],
		flag = 1,
		spanRe = /<span>/g;
		content = "";
	for (var i = 0, len = inputArry.length; i < len; i++) {
		if (inputArry[i].checked) {
			if (inputArry[i].name.trim() != "style")
				arry.push(inputArry[i]);
			if (inputArry[i].value == "two") {
				flag = 2;
			}
		}
	}
	for (var j = 0, l = arry.length; j < l; j++) {
		content += "<li><label>" + arry[j].value + "</label><input id='" + data[arry[j].value] + "'><br><span></span></li>";
		if (arry[j].value == "密码") {
			content += "<li id='sure'><label>" + "确认" + arry[j].value + "</label><input id='" + data["确认"+arry[j].value] + "'><br><span></span></li>";
		}
	}
	if (flag ==2) {
		content = content.replace(spanRe, "<span class='style2'>");
	}
	content += "<li id='submit'><button id='btn'>提交</button></li>";
	ulForm.innerHTML = content;
	var inputs = ulForm.getElementsByTagName("input");
	for (var n = 0, nlen = inputs.length; n < nlen; n++) {
		switch(inputs[n].id) {
			case "inputName"://名称
							inputName.addEventListener("focus",onFocus);
							inputName.addEventListener("blur",onBlur);
							break;
			case "inputPwd1"://密码
							inputPwd1.addEventListener("focus",onFocus);
							inputPwd1.addEventListener("blur",onBlur);	
							break;
			case "inputPwd2"://确认密码
							inputPwd2.addEventListener("focus",onFocus);
							inputPwd2.addEventListener("blur",onBlur);
							break;
			case "mail"://邮箱
							mail.addEventListener("focus",onFocus);
							mail.addEventListener("blur",onBlur);
							break;
			case "tel"://手机
							tel.addEventListener("focus",onFocus);
							tel.addEventListener("blur",onBlur);
							break;
			default: break;

		}	
	}
	btn.addEventListener("click",function() {
		var spans = ulForm.getElementsByTagName("span");
		var str = "格式正确密码可用";
		for (var k = 0, klen = spans.length; k < klen; k++) {
			if (spans[k].innerHTML == "") {
				alert("提交失败");
				return;
			}
			else if (str.indexOf(spans[k].innerHTML) == -1) {
				alert("提交失败");
				return;
			}		
		}
		alert("提交成功");
	});	
}

//检测名称 取得label中的值
function onFocus(event) {
	var label = event.target.parentNode.children[0]; //名称
	var span = event.target.parentNode.children[3];	 //SPAN的提示信息
	switch(label.innerHTML) {
		case "名称": span.innerHTML = "长度必须为4~16个字符";
					break;
		case "密码": span.innerHTML = "长度必须为4~16个字符";
					break;
		case "确认密码": span.innerHTML = "两次密码必须一致";
					break;
		case "邮箱": span.innerHTML = "邮箱格式为带@的字符集合";
					break;
		case "手机": span.innerHTML = "长度必须为11个数字";
					break;
		default: break;
	}	
}

function onBlur(event) {
	var label = event.target.parentNode.children[0]; //名称
	var span = event.target.parentNode.children[3];	 //SPAN的提示信息	
	var str = event.target.value.trim();
	if (!str) {
		span.innerHTML = label.innerHTML + "不能为空";
		event.target.style.border = "2px solid red";
		span.style.color = "red";	
	}	
	var len;
	var tempArry = str.match(re); 
	str = str.replace(re, "");
	if (tempArry) {									//检测是否有中文
		len = tempArry.length*2 + str.length;
    } 
	else {
		len = str.length;
	}
	//验证格式
	switch(label.innerHTML) {
		case "名称": formatName(event.target,span,len);
					break;
		case "密码": formatName(event.target,span,len);
					break;
		case "确认密码": formatPwd(event.target,span,len);
					break;
		case "邮箱": formatMail(event.target,span,str);
					break;
		case "手机": formatTel(event.target,span,str);
					break;
		default: break;
	}	
}
//验证名字格式
function formatName(obj,span,len) {
	if (len < 4 || len > 16 )  {
		span.innerHTML = "长度必须为4~16个字符";
		obj.style.border = "2px solid red";
		span.style.color = "red";
	}
	else {
		span.innerHTML = "格式正确";
		obj.style.border = "2px solid lightgreen";
		span.style.color = "lightgreen";
	}
}
//验证密码格式
function formatPwd(obj,span,len) {
		if ((inputPwd1.value.trim() ==  inputPwd2.value.trim()) && len < 17 && len >3) {
			span.innerHTML = "密码可用";
			obj.style.border = "2px solid lightgreen";
			span.style.color = "lightgreen";
		}
		else {
		span.innerHTML = "两次密码必须一致";
		obj.style.border = "2px solid red";
		span.style.color = "red";
		}
}
//验证邮箱格式
function formatMail(obj,span,str) {
	 var re  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 if (re.test(str)) {
		span.innerHTML = "格式正确";
		obj.style.border = "2px solid lightgreen";
		span.style.color = "lightgreen";
	 }
	 else {
		span.innerHTML = "邮箱格式不正确";
		obj.style.border = "2px solid red";
		span.style.color = "red";
	 }
}
//验证手机格式
function formatTel(obj,span,str) {
	var re = /^\d{11}$/;
	if (re.test(str)) {
		span.innerHTML = "格式正确";
		obj.style.border = "2px solid lightgreen";
		span.style.color = "lightgreen";
	 }
	 else {
		span.innerHTML = "手机格式不正确";
		obj.style.border = "2px solid red";
		span.style.color = "red";
	 }
}
creatBtn.addEventListener("click",creatForm);	

//提交的时候验证所有格式


