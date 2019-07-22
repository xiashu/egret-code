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
 * DBPlayer
 *  var dbplayer = DBPlayer.getDBPlayer();
 *  dbplayer.show('10001',this,1,"walk","down");
 */
var DBPlayer1 = (function (_super) {
    __extends(DBPlayer1, _super);
    function DBPlayer1() {
        return _super.call(this) || this;
    }
    DBPlayer1.getDBPlayer = function () {
        return new DBPlayer();
    };
    //展示 
    DBPlayer1.prototype.show = function (resourceId, parent, playtime, animationName, armatureName) {
        if (parent === void 0) { parent = null; }
        if (playtime === void 0) { playtime = NaN; }
        if (animationName === void 0) { animationName = "walk"; }
        if (armatureName === void 0) { armatureName = "down"; }
    };
    //播放
    DBPlayer1.prototype.play = function (time, playTime) {
    };
    //停止
    DBPlayer1.prototype.stop = function () {
    };
    //卸载
    DBPlayer1.prototype.unload = function () {
    };
    return DBPlayer1;
}(egret.Sprite));
__reflect(DBPlayer1.prototype, "DBPlayer1");
//# sourceMappingURL=DBPlayer_1.js.map