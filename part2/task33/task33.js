var $ = function(id) {
	return document.getElementById(id);
};
var table= $("table").children[0],
	input = $("input"),
	button = $("button"),
	className = "smallBox",
	block = {
		x: 5,
		y: 5,
		index: 3,// 0上 1右 2下 3左 代表四个方向
		now: getBlock(5,5)
	};
//初始化设置小方块
setDiv(block.now);
divDirection(block.now, className);
block.now.style.transform = "rotateZ(0deg)";
//获取小方块位置
function getBlock(x, y) {
	return table.children[y].children[x];
}
//小方块里面蓝色方块
function setDiv(block) {
	block.innerHTML = "<div></div>";
}
function divDirection(block, className) {
	block.className = className;
}
//点击旋转时 改变角度
function setDirection(degree) {
    var preDegree = parseInt((block.now.style.transform).match(/[-]*\d+/g));
    block.now.style.transform = "rotateZ(" + (degree + preDegree) + "deg)";
}
button.onclick = function () {
		switch(input.value.toUpperCase()) {
		case "GO": go();
				   break;
		case "R": setDirection(90);
				  block.index = (block.index + 1) % 4;
				      break;
		case "B": setDirection(180);
				  block.index = (block.index + 2) % 4;
					   break;
		case "L": setDirection(-90);
				  block.index = ((block.index - 1) >= 0? (block.index-1):3) % 4;
				     break;
		default: break;
	}
}
//当小广场向前移动时 取得下一个位置的小方块 并把原来的小方块隐藏掉 然后把下一个小方块重新赋值给block
function repeatSet(blockNext) {
	setDiv(blockNext);
	divDirection(blockNext, className);
	divDirection(block.now, "");
	blockNext.style.transform = block.now.style.transform;
	block.now = blockNext;
}
//移动函数
function go() {
	switch(block.index) {
		case 0: if (block.y > 1) {
						block.y--;
						blockNext = getBlock(block.x, block.y);
						repeatSet(blockNext);
					}
					break;
		case 1: if (block.x < 10) {
						block.x++;
						blockNext = getBlock(block.x, block.y);
						repeatSet(blockNext);
					}
					break;
		case 2: if (block.y < 10) {
						block.y++;
						blockNext = getBlock(block.x, block.y);
						repeatSet(blockNext);
					}
					break;
		case 3: if (block.x > 1) {
						block.x--;
						blockNext = getBlock(block.x, block.y);
						repeatSet(blockNext);
					}
					break;
		default: break;
	}
}