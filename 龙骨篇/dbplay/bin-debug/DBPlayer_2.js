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
/**
 * DBPlayer extends DBPlayer
 */
var DBPlayer2 = (function (_super) {
    __extends(DBPlayer2, _super);
    function DBPlayer2() {
        var _this = _super.call(this) || this;
        //资源ID
        _this.resourceId = "";
        //动画名称
        _this.animationName = "";
        //骨骼名称
        _this.armatureName = "";
        //播放次数
        _this.playtime = 0;
        return _this;
    }
    DBPlayer2.prototype.show = function (resourceId, parent, playtime, animationName, armatureName) {
        if (parent === void 0) { parent = null; }
        if (playtime === void 0) { playtime = -1; }
        if (animationName === void 0) { animationName = "win"; }
        if (armatureName === void 0) { armatureName = "down"; }
        this.resourceId = resourceId;
        this.mparent = parent;
        this.playtime = playtime;
        this.animationName = animationName;
        this.armatureName = armatureName;
    };
    return DBPlayer2;
}(egret.Sprite));
__reflect(DBPlayer2.prototype, "DBPlayer2");
//# sourceMappingURL=DBPlayer_2.js.map