var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Main.prototype.init = function () {
        var txt = new egret.TextField();
        this.addChild(txt); //添加到显示列表
        txt.size = 60; //字体大小
        txt.textColor = 0xff0000; //文本颜色
        txt.text = "HelloWorld"; //文本内容
        txt.x = 200; //x 坐标
        txt.y = 200; //y 坐标
        //加载本地一张背景图片
        var imgLoader = new egret.ImageLoader();
        imgLoader.once(egret.Event.COMPLETE, this.onImgLoadHandler, this);
        imgLoader.load("resource/assets/bg.jpg");
    };
    Main.prototype.onImgLoadHandler = function (event) {
        //创建纹理，并赋值给位图Bitmap
        var texture = new egret.Texture();
        texture.bitmapData = event.currentTarget.data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = texture;
        bitmap.x = 0;
        bitmap.y = 100;
        this.addChildAt(bitmap, 0); //添加到显示列表
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map