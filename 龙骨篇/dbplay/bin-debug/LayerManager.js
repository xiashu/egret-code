var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.init = function (container) {
        container.addChild(this.gameLayer);
        container.addChild(this.uiLayer);
        container.addChild(this.guiderLayer);
    };
    LayerManager.guiderLayer = new egret.Sprite();
    LayerManager.uiLayer = new egret.Sprite();
    LayerManager.gameLayer = new egret.Sprite();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map