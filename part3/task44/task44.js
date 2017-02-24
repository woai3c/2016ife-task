$(function(){
    $.fn.creatWaterfall = function(imgNum, col, width) {            // 增加jquery原型方法 创建一个瀑布流对象
        var waterfall = new Waterfall(this, imgNum, col, width);
        return waterfall;
    }
    
    function Waterfall(container, imgNum, col, containerWidth) {    // 参数依次为 容器对象 图片数量 列数 容器总宽度
        this.$container = container;                
        this.imgs = null;
        this.colwidth = containerWidth/col;                         // 每列的宽度
        this.col = col;                                     
        this.imgHeightArry = null;                                  // 一个数组 用来记载每张图片的高度            
        this.containerWidth = containerWidth;
        this.imgNum = imgNum;
        this.colheight = [];                                        // 包含每列总高度的数组 用来定位后续加载图片的位置
    }
    
    Waterfall.prototype = {
        init: function() {
            var $container = this.$container;
            $container.width(this.containerWidth);             // 设置容器总宽度
            this.imgHeightArry = [];                            
            this.imgs = [];
            for (var i = 0, len = this.imgNum; i < len; i++) {      // 获取每张图片的地址
                this.imgs.push(this.getImg());
            }
            var height = this.render();                             // 加载完图片时返回各列总高度的最小值
            var that = this;
            var $body = $("body");
            var screenW = window.screen.width;
            var screenH = window.screen.height;
            window.onscroll = function(){                           // 给window对象绑定滚动事件 用来判断什么时候开始再次加载图片
                if (screenH + $body.scrollTop() > height) {
                    that.init();                                    
                }
            };
            
            $container.off("click");                           // 初始化先去掉容器绑定事件 否则每次滚动到底部的时候 再次加载图片时 绑定事件会叠加 导致浮出层叠加
            
            $container.click(function(event){                  // 为容器添加点击事件 当点击图片时 放大图片 用图片原尺寸显示    
                var $that = $(this);
                var url = event.target.src;                         // 用正则从图片URL中取得宽高 再赋值给包裹着图片的DIV
                var re = /\d{3}/g;
                var arry = url.match(re);
                var $floatLay = $("<div>"); 
                $floatLay.width(screenW).height(screenH).addClass("floatLay");
                var $imgDiv = $("<div>");
                $imgDiv.width(arry[0]).height(arry[1]);
                var $img = $("<img>");
                $img.attr("src", url);
                $imgDiv.append($img);
                $floatLay.append($imgDiv);
                $body.append($floatLay);        
                $floatLay.fadeIn();                                 // 添加动画事件 淡入
                
                $floatLay.click(function(){                         // 当点击遮罩层时 先淡出 再移除遮罩层
                    var $that = $(this);
                    $that.fadeOut(500,function(){                   
                        $that.remove();
                    });
                });                
            });
        },
        getImg: function() {
            var width = this.getRandom();
            var height = this.getRandom();
            this.imgHeightArry.push(height);
            var img = "https://placehold.it/" + width + "x" + height + "/" + this.getColor(); // width height为宽高 getColor方法获取图片背景颜色
            return img;
        },
        getColor: function() {
            var color = Math.floor(Math.random()*0xffffff+1).toString(16);   // 1个16进制数颜色
            return color.length>5?color:color+="0";
        },
        getRandom: function() {                                         // 随机获取高度
            while (true) {
                var height = Math.floor(Math.random()*6+1)*100;
                if (height >= 150 && height <= 600) {
                    return height;
                }
            }
        },
        getMin: function(arry) {                                        // 一个函数 用来获取数组中的最小值 reduce()为数组方法 请自行百度
            return arry.reduce(function(a,b){
                if (a < b) {
                    return a;
                } else {
                    return b;
                }
            });
        },
        render: function() {                                            // 开始加载图片
            var colheight = this.colheight;                             // 将this的各个属性保存为局部变量 可以加快读取变量的速度
            var imgs = this.imgs;
            var colwidth = this.colwidth;
            var col = this.col;
            var hArry = this.imgHeightArry;     
            var index;
            for (var i = 0, len = this.imgNum; i < len; i++) {
                var $box = $("<div>");                                  // 一个DIV(每列的宽度等于这个DIV的宽度) 包含一个图片DIV 图片DIV包含着图片 
                var $imgbox = $("<div>");
                var $img = $("<img>");
                $box.width(colwidth);
                $box.addClass("box");                                   // 添加类名 类的CSS属性已在CSS文件设置好
                $imgbox.width(colwidth - 10);                           // 在两个DIV之间留空 
                $imgbox.height(hArry[i]);
                $img.attr("src", imgs[i]);
                $imgbox.append($img);
                $box.append($imgbox);               
                
                if (i < col && colheight.length < col) {
                    $box.css("top", 0).css("left", i*colwidth);
                    colheight.push(hArry[i]);
                } else {
                    height = this.getMin(colheight);                   
                    index = colheight.indexOf(height);
                    $box.css("top", height + 10).css("left", index*colwidth);       // +10 是为了在上下图片之间留空隙
                    colheight[index] += hArry[i] + 10;
                }
                
                this.$container.append($box);
            }       
            return this.getMin(colheight);                                  
        }
    }
    
    // 给input绑定事件 当点击输入的时候清除默认值
    var colVal = $("#colVal"),      
        divWidth = $("#divWidth"),
        btn = $("#btn");
    colVal.click(function(){
        $(this).val("");
    });
    divWidth.click(function(){
        $(this).val("");
    });
    
    btn.click(function(){           // 获取输入框的值并执行图片加载
        var col = colVal.val(),
            width = divWidth.val();
        $("#container").html("").creatWaterfall(20, col, width).init(); // 3个参数依次为 图片数量 列数 容器总宽度
    });
});