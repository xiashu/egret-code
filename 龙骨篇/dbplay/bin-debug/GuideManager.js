var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 引导类
 */
var GuideManager = (function () {
    function GuideManager() {
        this.isGuideing = false;
        /**方块透明度**/
        this.alpha = 0.8;
    }
    GuideManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new GuideManager();
        }
        return this.instance;
    };
    /**
     * 展示 遮罩区域
     * @param rect 引导的区域
     * @param dir 手方向
     * @param alpha 方块透明度
     */
    GuideManager.prototype.showGuide = function (rect, dir, alpha) {
        if (dir === void 0) { dir = Direction.DOWN; }
        if (alpha === void 0) { alpha = 0.8; }
        this.layer = LayerManager.guiderLayer;
        this.isGuideing = false;
        this.rect = rect;
        this.alpha = alpha;
        this.clear();
        LayerManager.guiderLayer.touchEnabled = true;
        var sw = egret.MainContext.instance.stage.stageWidth;
        var sh = egret.MainContext.instance.stage.stageHeight;
        var leftshape = this.createShape(0, 0, rect.right, rect.y);
        var rightshape = this.createShape(rect.right, 0, sw - rect.right, sh);
        var leftmid = this.createShape(0, rect.y, rect.x, rect.height);
        var leftbottom = this.createShape(0, rect.bottom, rect.right, sh - rect.bottom);
        this.layer.addChild(leftshape);
        this.layer.addChild(rightshape);
        this.layer.addChild(leftmid);
        this.layer.addChild(leftbottom);
        this.guiderhand = new egret.Bitmap(RES.getRes('guiderhand_png'));
        this.layer.addChild(this.guiderhand);
        this.showHand(dir);
    };
    GuideManager.prototype.showHand = function (dir) {
        if (this.tween) {
            egret.Tween.removeTweens(this.guiderhand);
        }
        var targetY;
        var targetX;
        var offsetY = 30; //偏离值
        var offsetX = 30; //偏离值
        switch (dir) {
            case Direction.UP:
                this.guiderhand.rotation = 270;
                this.guiderhand.y = this.rect.bottom + this.guiderhand.width + offsetY;
                this.guiderhand.x = this.rect.x + this.rect.width / 2 - this.guiderhand.height / 2;
                targetY = this.guiderhand.y - offsetY;
                this.tween = egret.Tween.get(this.guiderhand, { loop: true }).to({ y: targetY }, 1000).to({ y: targetY + offsetY }, 1000);
                break;
            case Direction.DOWN:
                this.guiderhand.rotation = 90;
                this.guiderhand.y = this.rect.y - this.guiderhand.width - offsetY;
                this.guiderhand.x = this.rect.x + this.rect.width / 2 + this.guiderhand.height / 2;
                targetY = this.guiderhand.y + offsetY;
                this.tween = egret.Tween.get(this.guiderhand, { loop: true }).to({ y: targetY }, 1000).to({ y: targetY - offsetY }, 1000);
                break;
            case Direction.RIGHT:
                this.guiderhand.rotation = 0;
                this.guiderhand.y = this.rect.y + this.rect.height / 2 - this.guiderhand.height / 2;
                this.guiderhand.x = this.rect.x - this.guiderhand.width - offsetX;
                targetX = this.guiderhand.x + offsetX;
                this.tween = egret.Tween.get(this.guiderhand, { loop: true }).to({ x: targetX }, 1000).to({ x: targetX - offsetX }, 1000);
                break;
            case Direction.LEFT:
                this.guiderhand.rotation = 180;
                this.guiderhand.y = this.rect.y + this.rect.height / 2 + this.guiderhand.height / 2;
                this.guiderhand.x = this.rect.right + this.guiderhand.width + offsetX;
                targetX = this.guiderhand.x - offsetX;
                this.tween = egret.Tween.get(this.guiderhand, { loop: true }).to({ x: targetX }, 1000).to({ x: targetX + offsetX }, 1000);
                break;
        }
    };
    /**
     * 隐藏引导
     */
    GuideManager.prototype.hide = function () {
        if (this.tween && this.guiderhand) {
            egret.Tween.removeTweens(this.guiderhand);
        }
        LayerManager.guiderLayer.touchEnabled = false;
        this.clear();
    };
    GuideManager.prototype.clear = function () {
        while (this.layer.numChildren) {
            this.layer.removeChildAt(0);
        }
    };
    /**
     * 创建图形Shape
     * @param x  x坐标
     * @param y  y坐标
     * @param w  w坐标
     * @param h  h坐标
     */
    GuideManager.prototype.createShape = function (x, y, w, h) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x0, this.alpha);
        shape.graphics.drawRect(0, 0, w, h);
        shape.graphics.endFill();
        shape.x = x;
        shape.y = y;
        return shape;
    };
    return GuideManager;
}());
__reflect(GuideManager.prototype, "GuideManager");
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
//# sourceMappingURL=GuideManager.js.map