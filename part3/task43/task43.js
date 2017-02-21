// 这也算是一个插件 只要参数正确 就能生成对应的图库 图片参数必须为一个数组 数组里有1-6张图片的相对路径 HTML里有调用方法
;(function($, undefined){
    $.fn.creatGallery = function(imgArry) {                 // 添加一个jQuery原型方法用来创建图库
        var myGallery = new Gallery(imgArry, this);
        return myGallery;                                   // 返回一个图库的对象
    }
    
    function Gallery(imgArry, container) {                  // 图库构造函数 值是图片数组和容器DIV
        this.imgArry = imgArry;
        this.container = container;
    }
    Gallery.prototype = {
        init: function() {
            var i,
            len = this.imgArry.length;
            this.container.attr("class","layout layout" + len);     // 根据图片的数量给容器添加类名 然后CSS里有对应1-6张图片不同的样式
            for (i = 0; i < len; i++) {
                var $img = $("<img>");    
                $img.attr("src", this.imgArry[i]);
                this.container.append($img);                    
            }                        
        }
    }
})(jQuery);