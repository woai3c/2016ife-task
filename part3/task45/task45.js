$(function(){
    $.fn.creatCask = function(imgNum, width) {            
        var cask = new Cask(this, imgNum, width);
        return cask;
    }
    
    function Cask(container, imgNum, width) {    // 参数依次为 容器对象 图片数量  容器总宽度
        this.$container = container;                                                      
        this.minHeight = 200;
        this.imgNum = imgNum;
        this.containerWidth = width;
        this.divArry = [];                      // 保存着包含图片DIV的数组 
    }
    
    Cask.prototype = {
        init: function() {
            var $container = this.$container;
            $container.width(this.containerWidth);             // 设置容器总宽度                          
            var imgs = [];
            for (var i = 0, len = this.imgNum; i < len; i++) {      // 获取每张图片的地址
                imgs.push(this.getImg());
            }
            this.render(imgs);                         // 加载完图片时返回各列总高度的最小值
            var that = this;                                        // 开始增加滚动事件
            var $body = $("body");
            var screenW = window.screen.width;
            var screenH = window.screen.height;
            window.onscroll = function(){                           // 当滚动到一定的高度开始再次加载图片
                if ($body.scrollTop() + screenH > $container.height()) {
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
            var img = "https://placehold.it/" + width + "x" + height + "/" + this.getColor(); // width height为宽高 getColor方法获取图片背景颜色
            return img;
        },
        getColor: function() {
            var color = Math.floor(Math.random()*0xffffff+1).toString(16);   // 1个16进制数颜色
            while (color.length < 6) {
                color += "0";
            }
            return color;
        },
        getRandom: function() {                                         // 随机获取高度
            return Math.floor(Math.random()*450+150);
        },
        rowcal: function(min, max, divArry) {                           //min-max 每行能容纳的最小和最大DIV数
            var conWidth = this.containerWidth;
            var width = 0;
            var count = 0;
            var minheight = this.minHeight;
            var rows = [];
            for (var i = 0, len = divArry.length; i < len; i++) {
                divArry[i].height(minheight);
                divArry[i].width(divArry[i].height()/divArry[i].attr("ratio"));
                width += divArry[i].width();
                count++;
                if ((width > conWidth && count > min) || count > max) {
                    var totalwidth = width - divArry[i].width();
                    var rowheight = conWidth*(minheight/totalwidth);
                    rows.push({num: count - 1, height: rowheight});     // 每行DIV数量 每行的高度
                    width = divArry[i].width();
                    count = 1;
                }
            }
            return [rows, count];                                       // 返回行数量的数组 和剩下不够一行的DIV数量
        },
        render: function(imgs) {                                            // 开始加载图片
            var $container = this.$container;
            var divArry = this.divArry;
            var index;
            for (var i = 0, len = this.imgNum; i < len; i++) {
                var $box = $("<div>");                                  
                var $img = $("<img>");
                $img.attr("src", imgs[i]);            
                $box.append($img);
                $box.addClass("box");
                var re = /\d{3}/g;
                var arry = $img.attr("src").match(re);                      // 通过正则提取宽高
                $box.attr("ratio", (parseInt(arry[1]))/(parseInt(arry[0])));    // ratio 高宽比率
                divArry.push($box);                                     // 不直接添加到容器DIV里而添加到数组是为了优化性能
            }       
            var tempArry = this.rowcal(3, 6, divArry);
            var rows = tempArry[0];
            var count = tempArry[1];
            for (i = 0, len = rows.length; i < len; i++) {
                var $row = $("<div>");
                $row.height(rows[i].height);
                for (var j = 0, jlen = rows[i].num; j < jlen; j++) {
                    $row.append(divArry.shift().height("100%").width(""));  // 设置高度100% 宽度会自动调整
                }
                $container.append($row);
            }
            for (i = 0, len = divArry.length; i < len; i++) {          // 最后剩下不够一行的 直接添加到容器后面 然后下一次加载图片时用appen动作添加到行容器时 会从原来的位置移除再添加到新的行容器里 所以不必担心重复添加
                $container.append(divArry[i]);
            }
        }
    }
    $("#container").creatCask(20, 1000).init();
});