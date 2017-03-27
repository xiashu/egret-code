/**
 *
 * @author
 * 开始欢迎页面
 */
var WelComePanel = (function (_super) {
    __extends(WelComePanel, _super);
    function WelComePanel() {
        _super.call(this);
        this.skinName = "WelComePanelSkin";
    }
    var d = __define,c=WelComePanel,p=c.prototype;
    p.init = function () {
        this.addButtonEvent(this.startBtn, this.onStartGame);
    };
    p.onStartGame = function (event) {
        //进入下一页说明
        LayerManager.gameLayer.removeChild(this);
        var game = new GamePanel();
        LayerManager.gameLayer.addChild(game);
    };
    return WelComePanel;
}(BasePanel));
egret.registerClass(WelComePanel,'WelComePanel');
//# sourceMappingURL=WelComePanel.js.map