var $ = function(id) {
	return document.getElementById(id);
};
var ships = [], // 存储飞船的数组
	tships = [], // 一个临时的数组 为了在直接操作删除ships时不出错 
	r = 115,     // 行星圆心到第一个飞船圆心的半径
	creatShip = $("creatShip"),
	universe = $("universe"),
	control = $("control"),
	log = $("log"),
	speed = 0.1,
	x = 386, // 圆心位置X轴坐标
	y = 245; // 圆心位置Y轴坐标
log.value = ""; // 输出日记信息

var Ship = function(id) {
    this.id = id;
	this.state = null;  // 飞船状态是为了 手动点击停止飞行时 即时充满能量也不会恢复飞行 
						// 如果是能量自然耗完 则在充满能量后继续飞行
    this.energy = 1000;
	this.r = r + this.id * 40;
	this.deg = 0;
	this.timer = null;        // 飞船能量计数器
	this.chargeTimer = null;  // 飞船充电计数器
}

Ship.prototype.creat = function() {
	this.shipDiv = document.createElement("div");
	this.shipDiv.innerHTML = "100%";
    // 飞船当前的角度
    var b = Math.sin(this.deg * Math.PI / 180) * this.r;
    var a = Math.cos(this.deg * Math.PI / 180) * this.r;
    a = a + x;
    b = b + y;
    this.shipDiv.style.left = a + "px";
    this.shipDiv.style.top = b + "px";
    this.shipDiv.className = "ship";
    universe.appendChild(this.shipDiv);
    ships.push(this);
	tships.push(this); // 一个临时的数组 为了在直接操作删除ships时不出错 
    var ele = document.createElement("div");
    ele.innerHTML = '<div id="control-' + this.id + '">' +
        '<label>对' + (this.id+1) + '号飞船下达指令:</label>' +
        '<input onclick="Commander.fly(' + this.id + ')" type="button" value="开始飞行">' +
        '<input onclick="Commander.stop(' + this.id + ')" type="button" value="停止飞行">' +
        '<input onclick="Commander.destroy(' + this.id + ')" type="button" value="销毁">' +
        '</div>';
    control.appendChild(ele);
};

Ship.prototype.fly = function() {   // 飞行时能量计数器
	this.state = "fly";
	if (this.timer) {                // 防止不断点击开始飞行 速度越来越快
		clearInterval(this.timer);
	}	
	this.timer = setInterval(function() {
		this.energy--;
		this.shipDiv.innerHTML = Math.floor(this.energy/1000*100) + "%";
		if (this.energy == 0 ) {
			clearInterval(this.timer);
			this.charge();
		}
		this.deg++;
		this.deg = this.deg % 360;
		var b = Math.sin(this.deg * Math.PI / 180) * this.r;
		var a = Math.cos(this.deg * Math.PI / 180) * this.r;
		a = a + x;
		b = b + y;
		this.shipDiv.style.left = a + "px";
		this.shipDiv.style.top = b + "px";
	}.bind(this),50);          // 在计数器里this指向windows 所以用bind()绑定上下文this 来指向上下文里的this
};

Ship.prototype.stop = function() {
	clearInterval(this.timer);
	this.state = "static";
	this.charge();
};

Ship.prototype.destroy = function() {
	clearInterval(this.timer);
	clearInterval(this.chargeTimer);
    this.shipDiv.parentNode.removeChild(this.shipDiv);		// 清除飞船
	var ele = document.getElementById("control-" + this.id);  // 清除控制台按钮
    ele.parentNode.removeChild(ele);
	for (var i = 0; i < ships.length; i++) {
        if (this.id == ships[i].id) {
            ships.splice(i, 1); 					// 删除存储飞船的数组相关项
            break;
        }
    }
	if (ships.length == 0) {
		tships = []; 
	}
};

Ship.prototype.charge = function() {	// 充电计数器
	if (this.chargeTimer) {               // 防止不断点击停止飞行 充电超过100%
		clearInterval(this.chargeTimer);
	}
	this.chargeTimer = setInterval(function() {
		this.energy++;
		if (this.energy > 1000) {
			clearInterval(this.chargeTimer);
			if (this.state == "static") {
				return;
			}
			this.fly();
		}
		this.shipDiv.innerHTML = Math.floor(this.energy/1000*100) + "%";
	}.bind(this),20);
};

// 指挥官 有4个命令
var Commander = {
	creat: function() {
		id = Mediator.getShipId();
		if (id == null) {
			Logger.log("指挥官: 无可用的飞船");
			return;
		}
		Logger.log("指挥官: 创建飞船");
		Mediator.creat(id);
	},
	fly: function(id) {
		Logger.log("指挥官: " + (id+1) + "号飞船开始起飞");
		Mediator.fly(id);
	},
	stop: function(id) {
		Logger.log("指挥官: " + (id+1) + "号飞船停止飞行");
		Mediator.stop(id);
	},
	destroy: function(id) {
	    Logger.log("指挥官: 销毁" + (id+1) + "号飞船");
		Mediator.destroy(id);
	}
};

// 相当于一个观察者 观看指挥官的命令有没有成功发送以及后续执行情况
var Mediator = {
	init: function () {
        this.tempShip = [];
        for (var i = 0; i < 4; i++) {
            this.tempShip[i] = undefined;
        }
    },
	getShipId: function() {
		for (var i = 0, len = this.tempShip.length; i < len; i++) {
			if (this.tempShip[i] == undefined) {
				return i;
			}
		}
		return null;
	},
	creat: function(id) {
		if (!loss()) {
				return;
		}
		Logger.log("Mediator: 命令传输成功," + (id+1) + "号飞船创建成功");
		ship = new Ship(id);
		this.tempShip[id] = id;
		ship.creat();	
	},
	fly: function(id) {
		setTimeout(function () {               // 命令延迟函数 有一秒的延迟
			if (!loss()) {
				return;
			}
			Logger.log("Mediator: 命令传输成功, 让编号为" + (id+1) + "的飞船起飞");
			ships[id].fly(); 
		}, 1000);	
	},	
	stop: function(id) {
		setTimeout(function () {
			if (!loss()) {
				return;
			}
			Logger.log("Mediator: 命令传输成功, 让编号为" + (id+1) + "的停止飞行");
			ships[id].stop();
		}, 1000);
	},
	destroy: function(id) {
		setTimeout(function () {
			if (!loss()) {
				return;
			}
			Logger.log("Mediator: 命令传输成功, 销毁编号为" + (id+1) + "的飞船");
			this.tempShip[id] = undefined; 
			tships[id].destroy(); // 如果不用这个临时数组  在删除飞船时 从头开始删会有一个删不下去
		}.bind(this), 1000);	
    }
};

// 日记输出
var Logger = {
    log: function (text) {
        log.value += text + "\n";
        log.scrollTop = log.scrollHeight;      // 让滚动条自动滚动
    }
};

// 命令丢包函数 
function loss() {
	if (Math.random() <= 0.3) {
		Logger.log("Mediator: 指令丢包,接收命令失败");
		return false;
	}
	return true;
}

// 初始化 一个数组 只有数组里面的项是undefined才能创建飞船
Mediator.init();