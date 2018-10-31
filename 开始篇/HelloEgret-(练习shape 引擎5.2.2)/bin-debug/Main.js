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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddStage, _this);
        return _this;
    }
    Main.prototype.onAddStage = function (event) {
        this.init();
    };
    Main.prototype.init = function () {
        var txt = new egret.TextField();
        this.addChild(txt); //添加到显示列表
        txt.size = 60; //字体大小
        txt.textColor = 0xff0000; //文本颜色
        txt.text = "HelloWorld"; //文本内容
        txt.x = 200; //x 坐标
        txt.y = 200; //y 坐标
        //创建一个Shape图形
        var shape = new egret.Shape();
        this.addChild(shape); //添加到容器中
        shape.x = this.stage.stageWidth / 2; //需要在舞台添加后stage才能被引用
        shape.y = this.stage.stageHeight / 2;
        shape.graphics.lineStyle(1, 0xff0000);
        shape.graphics.moveTo(0, 0);
        var R = 300; //半径
        var n = 7; //边
        for (var i = 1; i <= 360; i++) {
            var len = R * Math.sin(n * i);
            var tx = Math.cos(i) * len;
            var ty = Math.sin(i) * len;
            shape.graphics.lineTo(tx, ty);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map