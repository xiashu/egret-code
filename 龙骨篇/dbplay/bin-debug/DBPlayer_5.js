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
var DBPlayer5 = (function (_super) {
    __extends(DBPlayer5, _super);
    function DBPlayer5() {
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
    DBPlayer5.getDBPlayer = function () {
        return new DBPlayer();
    };
    DBPlayer5.prototype.show = function (resourceId, parent, playtime, animationName, armatureName) {
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
    DBPlayer5.prototype.startload = function () {
        if (this.loadList.length > 0) {
            var res = this.loadList.pop();
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.getResAsync(res, this.compFunc, this);
        }
    };
    DBPlayer5.prototype.onResourceLoadError = function (event) {
        // Log.trace("资源加载失败");
    };
    DBPlayer5.prototype.compFunc = function (data) {
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
    // private playDB():void
    // {
    //     var dragonbonesData = RES.getRes( "Demon_10_json" );
    //     var textureData = RES.getRes( "texture_json" );
    //     var texture = RES.getRes( "texture_png" );
    //     var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
    //     dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
    //     dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));   
    //     var armature: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("armatureName")
    //     this.addChild(armature);
    //     armature.x=300;
    //     armature.y= 400;
    //     armature.scaleX = 0.5;  
    //     armature.scaleY = 0.5; 
    //     armature.animation.gotoAndPlayByTime("dead",0,200);
    // }
    DBPlayer5.prototype.initDBData = function (dragonbonesData, textureData, texture) {
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
    DBPlayer5.prototype.onLoopComplete = function (event) {
        if (this.completeFun != null) {
            this.completeFun.fun.call(this.completeFun.thisObj);
        }
    };
    DBPlayer5.prototype.play = function (time, playTime) {
        if (this.armature) {
            this.armature.animation.gotoAndPlayByTime(this.animationName, time, playTime);
        }
    };
    DBPlayer5.prototype.stop = function () {
        if (this.armature) {
            this.armature.animation.stop();
        }
    };
    DBPlayer5.prototype.unload = function () {
        if (this.armature) {
            this.removeChild(this.armature);
        }
        if (this.mparent) {
            this.mparent.removeChild(this);
        }
        this.armature = null;
    };
    return DBPlayer5;
}(egret.Sprite));
__reflect(DBPlayer5.prototype, "DBPlayer5");
//# sourceMappingURL=DBPlayer_5.js.map