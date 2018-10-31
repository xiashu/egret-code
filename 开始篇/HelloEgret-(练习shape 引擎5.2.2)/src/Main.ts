class Main extends egret.DisplayObjectContainer {
             
    public constructor() {
        super();       
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddStage,this);
    }

  private onAddStage(event:egret.Event):void 
  {
         this.init();
  }

  private init():void
  {                  
       var txt:egret.TextField = new egret.TextField();
       this.addChild(txt);//添加到显示列表
       txt.size = 60;//字体大小
       txt.textColor  = 0xff0000;//文本颜色
       txt.text = "HelloWorld";//文本内容
       txt.x = 200;//x 坐标
       txt.y = 200;//y 坐标
       
       //创建一个Shape图形
       var shape:egret.Shape = new egret.Shape();
       this.addChild(shape);//添加到容器中
       shape.x = this.stage.stageWidth/2;//需要在舞台添加后stage才能被引用
       shape.y = this.stage.stageHeight/2;
       shape.graphics.lineStyle(1,0xff0000);
       shape.graphics.moveTo(0,0);
       var R:number = 300;//半径
       var n:number = 7;//边
       for(var i:number = 1;i<=360;i++)
       {    
            var len:number = R*Math.sin(n*i);  
            var tx:number  = Math.cos(i)*len;
            var ty:number  = Math.sin(i)*len;          
            shape.graphics.lineTo(tx,ty);
       }      
  }
 
              
}