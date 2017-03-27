/**
 *
 * @author 
 * 结束页面
 */
class EndGamePanel extends BasePanel
{

    public startBtn: eui.Button;    
    public shareBtn:eui.Button;
    
    public resultTxt:eui.Label;
    public titleTxt:eui.Label;
    public scoreTxt:eui.Label;

    public constructor() 
    {
        super();
        this.skinName = "EndGamePanelSkin";
    }

    protected init(): void
    {
        this.addButtonEvent(this.startBtn,this.onStartGame);
        this.addButtonEvent(this.shareBtn,this.showMask);
    }

    private onStartGame(): void
    {
        //进入下一页说明
        LayerManager.gameLayer.removeChild(this);
        var game: GamePanel = new GamePanel();
        LayerManager.gameLayer.addChild(game);
    }
    
    //设置游戏结果值
    public setResult(desc:string,score:number,title:string):void
    {
        this.resultTxt.text = desc;
        this.scoreTxt.text = score+'';
        this.titleTxt.text = title;
        var msg: string = "获得" + score + "分,收获" + title + "称号，" + desc;
        // share(msg);
    }
   
    private sp: egret.Sprite;
    private shareTip: egret.Bitmap;

    private showMask(): void
    {
        if(this.sp == null)
         {
            this.sp = new egret.Sprite();
            this.shareTip = new egret.Bitmap();
            this.shareTip.texture = RES.getRes("share_tip_png");
            this.shareTip.x = GameManager.stage.stageWidth - 320;
            this.sp.addChild(this.shareTip);
        }
        this.sp.graphics.clear();
        this.sp.graphics.beginFill(0x000000,0.7);
        this.sp.touchEnabled = true;

        this.sp.graphics.drawRect(0,0,GameManager.stage.stageWidth,GameManager.stage.stageHeight);
        this.sp.graphics.endFill();
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancle,this);
        LayerManager.alertLayer.addChild(this.sp);

        // var gameDiv = document.getElementById("gameDiv");  
        // var myImg:HTMLImageElement = document.createElement("img");
        // myImg.src = "http://baidu.com/Qr-code.png";
        // myImg.style.width = "80%";
        // myImg.style.height = "20%";
        // myImg.style.position = "absolute";
        // 二维码处理
        // gameDiv.appendChild(myImg);

    }
    private onCancle(event: egret.TouchEvent): void
    {
        LayerManager.alertLayer.removeChild(this.sp);
    }
        
}
