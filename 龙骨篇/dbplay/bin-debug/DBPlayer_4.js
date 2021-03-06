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
var DBPlayer4 = (function (_super) {
    __extends(DBPlayer4, _super);
    function DBPlayer4() {
        var _this = _super.call(this) || this;
        //加载次数
        _this.loadNum = 0;
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
    DBPlayer4.getDBPlayer = function () {
        return new DBPlayer();
    };
    DBPlayer4.prototype.show = function (resourceId, parent, playtime, animationName, armatureName) {
        if (parent === void 0) { parent = null; }
        if (playtime === void 0) { playtime = -1; }
        if (animationName === void 0) { animationName = "win"; }
        if (armatureName === void 0) { armatureName = "down"; }
        this.resourceId = resourceId;
        this.mparent = parent;
        this.playtime = playtime;
        this.animationName = animationName;
        this.armatureName = armatureName;
        var dragonbonesData = RES.getRes(resourceId + "_ske_json");
        var textureData = RES.getRes(resourceId + "_tex_json");
        var texture = RES.getRes(resourceId + "_tex_png");
        if (dragonbonesData && textureData && texture) {
            this.initDBData(dragonbonesData, textureData, texture);
        }
        else {
            this.loadList = [resourceId + "_ske_json", resourceId + "_tex_json", resourceId + "_tex_png"];
            this.loadNum = this.loadList.length;
            this.startload();
        }
    };
    DBPlayer4.prototype.startload = function () {
        if (this.loadList.length > 0) {
            var res = this.loadList.pop();
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.getResAsync(res, this.compFunc, this);
        }
    };
    DBPlayer4.prototype.onResourceLoadError = function (event) {
        // Log.trace("资源加载失败");
    };
    DBPlayer4.prototype.compFunc = function (data) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        this.loadNum--;
        if (this.loadNum > 0) {
            this.startload();
        }
        else {
            var dragonbonesData = RES.getRes(this.resourceId + "_ske_json");
            var textureData = RES.getRes(this.resourceId + "_tex_json");
            var texture = RES.getRes(this.resourceId + "_tex_png");
            this.initDBData(dragonbonesData, textureData, texture);
        }
    };
    DBPlayer4.prototype.initDBData = function (dragonbonesData, textureData, texture) {
        this.dragonbonesFactory = dragonBones.EgretFactory.factory;
        this.dragonbonesFactory.parseDragonBonesData(dragonbonesData);
        this.dragonbonesFactory.parseTextureAtlasData(textureData, texture);
        this.armature = this.dragonbonesFactory.buildArmatureDisplay(this.armatureName);
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onLoopComplete, this);
        this.addChild(this.armature);
        this.play(0, this.playtime);
        if (this.mparent) {
            this.mparent.addChild(this);
        }
    };
    DBPlayer4.prototype.onLoopComplete = function (event) {
    };
    DBPlayer4.prototype.play = function (time, playTime) {
        if (this.armature) {
            this.armature.animation.gotoAndPlayByTime(this.animationName, time, playTime);
        }
    };
    DBPlayer4.prototype.stop = function () {
        if (this.armature) {
            this.armature.animation.stop();
        }
    };
    DBPlayer4.prototype.unload = function () {
        if (this.armature) {
            this.removeChild(this.armature);
        }
        if (this.mparent) {
            this.mparent.removeChild(this);
        }
        this.armature = null;
    };
    return DBPlayer4;
}(egret.Sprite));
__reflect(DBPlayer4.prototype, "DBPlayer4");
//# sourceMappingURL=DBPlayer_4.js.map