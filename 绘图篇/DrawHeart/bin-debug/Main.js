var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Main.prototype.init = function () {
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.x = 275;
        shape.y = 200;
        this.drawLove(shape, 5);
        var tf = new egret.TextField();
        tf.text = "你还不来，我怎敢老去";
        this.addChild(tf);
        tf.x = 120;
        tf.y = 283;
    };
    Main.prototype.drawLove = function (shape, scale) {
        shape.graphics.beginFill(0xff0000);
        for (var i = 0; i <= 360; i++) {
            var t = i * Math.PI / 180;
            var nextPoint = this.getPoint(t, scale);
            if (i == 0) {
                shape.graphics.moveTo(nextPoint.x, nextPoint.y);
            }
            shape.graphics.lineTo(nextPoint.x, nextPoint.y);
        }
        shape.graphics.endFill();
    };
    //获取某一点的位置;
    Main.prototype.getPoint = function (t, scale) {
        if (scale === void 0) { scale = 1; }
        var x = 16 * Math.pow((Math.sin(t)), 3);
        var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return new egret.Point(x * scale, -y * scale);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map