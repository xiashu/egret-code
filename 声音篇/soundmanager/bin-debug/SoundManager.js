var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.soundDic = {};
    }
    SoundManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    };
    /**
    * 播放音乐
    */
    SoundManager.prototype.playBg = function (key, startime, loops, volume) {
        if (startime === void 0) { startime = 1; }
        if (loops === void 0) { loops = 0; }
        if (volume === void 0) { volume = 1; }
        var sound = RES.getRes(key);
        if (sound) {
            var channel = sound.play(startime, loops);
            this.soundDic[key] = { channel: channel, position: startime, volume: volume, loops: loops, istop: false };
            if (this.soundDic[key].channel) {
                this.soundDic[key].channel.volume = volume;
            }
        }
        else {
            this.soundDic[key] = { channel: null, position: startime, volume: volume, loops: loops, istop: false };
            RES.getResAsync(key, this.onLoadComplete, this);
        }
    };
    SoundManager.prototype.onLoadComplete = function (data, key) {
        var sound = RES.getRes(key);
        var channel = sound.play(this.soundDic[key].position, this.soundDic[key].loops);
        this.soundDic[key].channel = channel;
        if (this.soundDic[key].channel) {
            this.soundDic[key].channel.volume = this.soundDic[key].volume;
        }
    };
    /**
      * 停止背景音效
      */
    SoundManager.prototype.stopByKey = function (key) {
        if (this.soundDic[key] && this.soundDic[key].channel) {
            this.soundDic[key].position = this.soundDic[key].channel.position;
            this.soundDic[key].channel.stop();
            this.soundDic[key].istop = true;
        }
    };
    /**
      * 暂停
      */
    SoundManager.prototype.pause = function (key, bool) {
        if (bool === void 0) { bool = true; }
        if (bool) {
            this.stopByKey(key);
        }
        else {
            if (this.soundDic[key] && this.soundDic[key].channel) {
                this.soundDic[key].channel.stop();
                var sound = RES.getRes(key);
                this.soundDic[key].channel = sound.play(this.soundDic[key].position, this.soundDic[key].loops);
                this.soundDic[key].istop = false;
            }
        }
    };
    SoundManager.prototype.getChangel = function (key) {
        return this.soundDic[key];
    };
    /**
      * 停止所有channel
      */
    SoundManager.prototype.stopAllSound = function () {
        for (var key in this.soundDic) {
            if (this.soundDic[key] && this.soundDic[key].channel) {
                this.soundDic[key].channel.stop();
            }
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map