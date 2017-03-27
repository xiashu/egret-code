/**
 *
 * @author 
 * 游戏画面
 */
class GamePanel extends BasePanel
{

    private aBtn: eui.Button;
    private bBtn: eui.Button;
    private cBtn: eui.Button;
    private dBtn: eui.Button;
    private restBtn:eui.Button;

    private mycurNumTxt:eui.Label;
    private timeTxt: eui.Label;
    private quesLabel:eui.Label;
    
  
    
   
    private timer: egret.Timer;
    private totalTime: number = 0;
    
    //是否选择了题目
    private iselected:Boolean;
    
    //答中的题目
    private totalNumer:number = 0;
    
    //当前题目
    private curQuesData:Object;
    
    
    public constructor() 
    {
        super();    
        this.skinName = "GamePanelSkin";   
    }

    protected init(): void
    {
        this.initGameEvent();      
        this.timer = new egret.Timer(1000);     
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timeFunc,this);
        this.initData();
    }
   
    private initGameEvent():void
    {
         this.addButtonEvent(this.aBtn,this.onSelect);           
         this.addButtonEvent(this.bBtn,this.onSelect);           
         this.addButtonEvent(this.cBtn,this.onSelect);           
         this.addButtonEvent(this.restBtn,this.onRest);           
    }
    
    private initData():void
    {
        GameData.levelNumber = 10;
        this.nextQues();
    }
     
    private onSelect(event: egret.TouchEvent): void
    {
        
        this.iselected = true;
        var result: string = (event.currentTarget as eui.Button).label;
        this.checkRight(result);
    }
    
    
    //检测答案
    private checkRight(value:string):void
    {
        if(this.curQuesData!=null)
        {
            if(value == this.curQuesData["result"])
            {
                this.totalNumer++;
                this.mycurNumTxt.text = "当前分数:"+this.totalNumer;
                this.nextQues();
            }
            else
            {
                this.gameOver();
            }
        }
        
    }
    
    private timeFunc(event: egret.TimerEvent): void
    {
        this.totalTime -- ;
        if(this.totalTime > 0)
        {
            this.timeTxt.text = this.totalTime + "";
        }
        else
        {
            this.gameOver();
        }
    } 
    
    //重置下一条
    private nextQues()
    {
        this.totalTime = 4;
        this.timeTxt.text = this.totalTime + "";
        this.iselected = false;
        this.timer.start();
        var curRanNum:number = this.getLevel();
        this.curQuesData = GameData.createQuest(curRanNum);
        if(this.curQuesData!=null)
        {
            this.setButtonState(this.curQuesData["qs"],this.curQuesData["label"]);
        } 
    }
    
    
    //获取难度
    private getLevel(): number
    {

         if(this.totalNumer > GameData.levelNumber)
         {
             GameData.levelNumber += 20;
         }
    
         return GameData.levelNumber ;
    }
    
    
    
    //设置按钮状态
    private setButtonState(value:Array<any>,title:string):void
    {
        this.aBtn.label = value[0]+"";
        this.bBtn.label = value[1]+"";
        this.cBtn.label = value[2]+"";
        this.quesLabel.text  = title;
    }
    
    
    //游戏结束
    private gameOver():void
    {
        this.timer.stop();
     
        var allnumer = this.totalNumer;      
        LayerManager.gameLayer.removeChild(this);
        var game: EndGamePanel = new EndGamePanel();
        var desc: string = GameData.getResult(allnumer);
        var title: string = GameData.getTitle(allnumer);
        game.setResult(desc,allnumer,title);
        LayerManager.gameLayer.addChild(game);       
    }
    
    private onRest(event: egret.TouchEvent): void
    {
        this.timer.stop();      
        LayerManager.gameLayer.removeChild(this);
        var game: GamePanel = new GamePanel();
        LayerManager.gameLayer.addChild(game);       
    }
    
}
