class Tips {
  public constructor() {
          
  }
          
  private static instance: Tips = null;
             
  public static getInstance(): Tips {
          
    if (Tips.instance == null)
    {
           Tips.instance = new Tips();
    }
                
    return Tips.instance;
  }
              
   private layer:egret.DisplayObjectContainer; 
   private pool:Array<TipItem>;
   private queue:Array<number>;
          
   public setLayer(layer:egret.DisplayObjectContainer):void
   {
     this.layer = layer;
     this.pool = [];
     this.queue = [];
   }
              
   public static show(msg:string):void
   {
     Tips.getInstance().initView(msg);
   }
          
          
  //显示信息
  private initView(msg:string):void
  {
                 
     var item:TipItem = this.pool.length >0 ? this.pool.pop() : new TipItem();
     item.text = msg;
     this.layer.addChild(item);
     item.alpha = 0;    
     item.x = (this.layer.stage.stageWidth)/2;
     var ty:number = this.layer.stage.stageHeight/2+100;
     item.y = ty;
     item.scaleX = item.scaleY = 1.2; 
     var time:number = this.queue.length >0 ? 1500: 0;
     this.queue.push(1);
     egret.Tween.get(item).wait(time).to({y:ty-100,alpha:1,scaleX:1,scaleY:1},500,egret.Ease.quadOut)
              .wait(1500).to({y:ty-180,alpha:0},500,egret.Ease.quadIn).call((target)=>{
                                 this.layer.removeChild(target);
                                 this.pool.push(target);
                 this.queue.pop();
              },this,[item]);
              
  }
          
}
          
class TipItem extends egret.Sprite
{
   public constructor() {
       super();
     this.init();
  }
          
  private textField:egret.TextField
  private bg:egret.Texture; 
          
  private init() {
          
   this.width = egret.MainContext.instance.stage.stageWidth*0.6; 
   this.textField = new egret.TextField();
   this.textField.size = 26;
   this.textField.bold = true;
   this.textField.textColor = 0xffffff;
   this.textField.multiline = true;
   this.textField.wordWrap = true;
   this.textField.textAlign = egret.HorizontalAlign.CENTER;
   this.textField.width = egret.MainContext.instance.stage.stageWidth*5;
   this.textField.y=10;
            
   this.addChild(this.textField);
             
  } 
            
  public set text(v : string) {
          
    this.textField.text = v;
    this.anchorOffsetX = this.width/2;
    this.anchorOffsetY = this.height/2;
    this.graphics.clear();
    this.graphics.beginFill(0x000000,0.8);
    this.graphics.drawRoundRect(0,0,this.width,this.height+20,32,32);
    this.graphics.endFill();
    this.textField.x=(this.width-this.textField.width)/2;
  }
            
             
          
}