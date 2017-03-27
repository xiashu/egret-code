/**
 *
 * @author
 * 游戏画面
 */
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        _super.call(this);
        this.totalTime = 0;
        //答中的题目
        this.totalNumer = 0;
        this.skinName = "GamePanelSkin";
    }
    var d = __define,c=GamePanel,p=c.prototype;
    p.init = function () {
        this.initGameEvent();
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timeFunc, this);
        this.initData();
    };
    p.initGameEvent = function () {
        this.addButtonEvent(this.aBtn, this.onSelect);
        this.addButtonEvent(this.bBtn, this.onSelect);
        this.addButtonEvent(this.cBtn, this.onSelect);
        this.addButtonEvent(this.restBtn, this.onRest);
    };
    p.initData = function () {
        GameData.levelNumber = 10;
        this.nextQues();
    };
    p.onSelect = function (event) {
        this.iselected = true;
        var result = event.currentTarget.label;
        this.checkRight(result);
    };
    //检测答案
    p.checkRight = function (value) {
        if (this.curQuesData != null) {
            if (value == this.curQuesData["result"]) {
                this.totalNumer++;
                this.mycurNumTxt.text = "当前分数:" + this.totalNumer;
                this.nextQues();
            }
            else {
                this.gameOver();
            }
        }
    };
    p.timeFunc = function (event) {
        this.totalTime--;
        if (this.totalTime > 0) {
            this.timeTxt.text = this.totalTime + "";
        }
        else {
            this.gameOver();
        }
    };
    //重置下一条
    p.nextQues = function () {
        this.totalTime = 4;
        this.timeTxt.text = this.totalTime + "";
        this.iselected = false;
        this.timer.start();
        var curRanNum = this.getLevel();
        this.curQuesData = GameData.createQuest(curRanNum);
        if (this.curQuesData != null) {
            this.setButtonState(this.curQuesData["qs"], this.curQuesData["label"]);
        }
    };
    //获取难度
    p.getLevel = function () {
        if (this.totalNumer > GameData.levelNumber) {
            GameData.levelNumber += 20;
        }
        return GameData.levelNumber;
    };
    //设置按钮状态
    p.setButtonState = function (value, title) {
        this.aBtn.label = value[0] + "";
        this.bBtn.label = value[1] + "";
        this.cBtn.label = value[2] + "";
        this.quesLabel.text = title;
    };
    //游戏结束
    p.gameOver = function () {
        this.timer.stop();
        var allnumer = this.totalNumer;
        LayerManager.gameLayer.removeChild(this);
        var game = new EndGamePanel();
        var desc = GameData.getResult(allnumer);
        var title = GameData.getTitle(allnumer);
        game.setResult(desc, allnumer, title);
        LayerManager.gameLayer.addChild(game);
    };
    p.onRest = function (event) {
        this.timer.stop();
        LayerManager.gameLayer.removeChild(this);
        var game = new GamePanel();
        LayerManager.gameLayer.addChild(game);
    };
    return GamePanel;
}(BasePanel));
egret.registerClass(GamePanel,'GamePanel');
//# sourceMappingURL=GamePanel.js.map