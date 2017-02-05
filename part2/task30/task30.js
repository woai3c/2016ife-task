//取得各个ID的对象
var $ = function(id) {
	return document.getElementById(id);
};
var inputName = $("inputName"),
	inputPwd1 = $("inputPwd1"),
	inputPwd2 = $("inputPwd2"),
	mail = $("mail"),
	tel = $("tel"),
	btn = $("btn"),
	re = /[\u4e00-\u9fa5]/g;
	
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
//名称
inputName.addEventListener("focus",onFocus);
inputName.addEventListener("blur",onBlur);

//密码
inputPwd1.addEventListener("focus",onFocus);
inputPwd1.addEventListener("blur",onBlur);

//确认密码
inputPwd2.addEventListener("focus",onFocus);
inputPwd2.addEventListener("blur",onBlur);

//邮箱
mail.addEventListener("focus",onFocus);
mail.addEventListener("blur",onBlur);

//手机
tel.addEventListener("focus",onFocus);
tel.addEventListener("blur",onBlur);

//提交的时候验证所有格式
btn.onclick = function() {
	var spans = document.getElementsByTagName("span");
	var str = "格式正确密码可用";
	for (var i = 0, len = spans.length; i < len; i++) {
		if (spans[i].innerHTML == "") {
			alert("提交失败");
			return;
		}		
		else if (str.indexOf(spans[i].innerHTML) == -1) {
			alert("提交失败");
			return;
		}		
	}
	alert("提交成功");
}