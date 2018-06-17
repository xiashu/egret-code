var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 弹窗类
 *
 */
var PopUpManager = (function () {
    function PopUpManager() {
    }
    /**
     * 指向容器层
     * @param container
     */
    PopUpManager.init = function (container) {
        this.container = container;
    };
    /**
    * 添加对象
    * @param display 显示对象
    * @param isModel 是否模态
    * @param isWindow 是否窗体居中
    */
    PopUpManager.addPopUp = function (display, isCenter, isModel) {
        if (isModel === void 0) { isModel = true; }
        if (display.parent)
            return;
        var ww = this.container.stage.stageWidth;
        var hh = this.container.stage.stageHeight;
        if (isModel) {
            var c = 0x000000, alpha = 0.7;
            var shape = new egret.Shape();
            shape.graphics.beginFill(c);
            shape.graphics.drawRect(0, 0, ww, hh);
            shape.graphics.endFill();
            shape.alpha = alpha;
            shape.touchEnabled = true;
            this.container.addChild(shape);
        }
        this.container.addChild(display);
        if (isCenter) {
            display.x = (ww - display.width) / 2;
            display.y = (hh - display.height) / 2;
            display.addEventListener(egret.Event.ENTER_FRAME, onEnterFrame, this);
        }
        function onEnterFrame() {
            display.removeEventListener(egret.Event.ENTER_FRAME, onEnterFrame, this);
            display.x = (ww - display.width) / 2;
            display.y = (hh - display.height) / 2;
        }
    };
    /**
     * 移除窗口
     * @param display
     * @param isModel 模态
     */
    PopUpManager.removePopUp = function (display, isModel) {
        if (isModel === void 0) { isModel = true; }
        if (display.parent) {
            var index = display.parent.getChildIndex(display);
            if (isModel) {
                this.container.removeChildAt(index - 1);
            }
            display.parent.removeChild(display);
        }
    };
    return PopUpManager;
}());
__reflect(PopUpManager.prototype, "PopUpManager");
//# sourceMappingURL=PopUpManager.js.map