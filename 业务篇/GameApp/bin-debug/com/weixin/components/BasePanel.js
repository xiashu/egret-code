var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        _super.call(this);
        GameManager.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.onResize();
    }
    var d = __define,c=BasePanel,p=c.prototype;
    p.onResize = function () {
        this.onResizeHandler();
    };
    p.onResizeHandler = function () {
        this.height = GameManager.stage.stageHeight;
    };
    p.childrenCreated = function () {
        LayerManager.fixScreen();
        this.init();
    };
    p.init = function () {
        //入口 需要覆盖 
    };
    p.addButtonEvent = function (target, func, thisObject) {
        if (!target)
            return;
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, func, thisObject || this);
    };
    p.removeButtonEvent = function (target, func, thisObject) {
        if (!target)
            return;
        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, thisObject || this);
    };
    return BasePanel;
}(eui.Component));
egret.registerClass(BasePanel,'BasePanel');
//# sourceMappingURL=BasePanel.js.map