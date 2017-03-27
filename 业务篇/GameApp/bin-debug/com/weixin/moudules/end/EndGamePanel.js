/**
 *
 * @author
 * 结束页面
 */
var EndGamePanel = (function (_super) {
    __extends(EndGamePanel, _super);
    function EndGamePanel() {
        _super.call(this);
        this.skinName = "EndGamePanelSkin";
    }
    var d = __define,c=EndGamePanel,p=c.prototype;
    p.init = function () {
        this.addButtonEvent(this.startBtn, this.onStartGame);
        this.addButtonEvent(this.shareBtn, this.showMask);
    };
    p.onStartGame = function () {
        //进入下一页说明
        LayerManager.gameLayer.removeChild(this);
        var game = new GamePanel();
        LayerManager.gameLayer.addChild(game);
    };
    //设置游戏结果值
    p.setResult = function (desc, score, title) {
        this.resultTxt.text = desc;
        this.scoreTxt.text = score + '';
        this.titleTxt.text = title;
        var msg = "获得" + score + "分,收获" + title + "称号，" + desc;
        // share(msg);
    };
    p.showMask = function () {
        if (this.sp == null) {
            this.sp = new egret.Sprite();
            this.shareTip = new egret.Bitmap();
            this.shareTip.texture = RES.getRes("share_tip_png");
            this.shareTip.x = GameManager.stage.stageWidth - 320;
            this.sp.addChild(this.shareTip);
        }
        this.sp.graphics.clear();
        this.sp.graphics.beginFill(0x000000, 0.7);
        this.sp.touchEnabled = true;
        this.sp.graphics.drawRect(0, 0, GameManager.stage.stageWidth, GameManager.stage.stageHeight);
        this.sp.graphics.endFill();
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancle, this);
        LayerManager.alertLayer.addChild(this.sp);
        // var gameDiv = document.getElementById("gameDiv");  
        // var myImg:HTMLImageElement = document.createElement("img");
        // myImg.src = "http://1.moyomoyo.sinaapp.com/Qr-code.png";
        // myImg.style.width = "80%";
        // myImg.style.height = "20%";
        // myImg.style.position = "absolute";
        // gameDiv.appendChild(myImg);
    };
    p.onCancle = function (event) {
        LayerManager.alertLayer.removeChild(this.sp);
    };
    return EndGamePanel;
}(BasePanel));
egret.registerClass(EndGamePanel,'EndGamePanel');
//# sourceMappingURL=EndGamePanel.js.map