/**
 *
 * @author
 * 层级 管理 和舞台管理
 */
var LayerManager = (function () {
    function LayerManager() {
    }
    var d = __define,c=LayerManager,p=c.prototype;
    //初始化层级页面
    LayerManager.init = function (stage) {
        GameManager.stage = stage;
        stage.addChild(LayerManager.gameLayer);
        stage.addChild(LayerManager.alertLayer);
    };
    LayerManager.fixScreen = function () {
        if (egret.Capabilities.isMobile) {
            GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else {
            GameManager.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    };
    //消息通知层
    LayerManager.alertLayer = new egret.Sprite();
    //游戏主内容层
    LayerManager.gameLayer = new egret.Sprite();
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
//# sourceMappingURL=LayerManager.js.map