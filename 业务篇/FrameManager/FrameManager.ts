class FrameManager {
  public constructor() {
  }
                       
 private static  instance:FrameManager = null;
                       
 //方法集合
 private funsArray:Array<any> = [];
                       
 private funsDic:Object={};
                       
 private curTime:number;
 private lastTime:number;
 private totalTime:number =0;
                       
 private _currentFrame:number = 0;
                       
 private _frameRate:number;
                        
 public static getInstance():FrameManager
 {
      if(!FrameManager.instance)
    {
      FrameManager.instance = new FrameManager();
    }
                       
   return FrameManager.instance;
 }
                       
 //初始化入口
 public init(stage:egret.Stage):void
 {
   this.curTime = egret.getTimer();
   this.lastTime =  this.curTime;
   stage.addEventListener(egret.Event.ENTER_FRAME,this.onLoopHandler,this);
 }
                       
                       
public onLoopHandler(event:egret.Event):void
{   
   this.doFps();
   this.doFrame(); 
}
                       
//遍历所有的行为
private doFrame():void
{
                       
  var arr:Array<any> = this.funsArray;
  if(arr.length == 0) return;
  var exeTime:number = 0;
  for(var i:number = arr.length-1;i>=0;i--)
  {
    var handler:Handler = arr[i]; 
    exeTime = handler.isTimer ? this.curTime: this._currentFrame; 
        if(exeTime >= handler.executeTime) 
        {
           handler.exeCallBackFun(this.curTime);
       if(!handler.isRepeat && handler.repeatCount -- <= 1)
       {    
          handler.exeCompleteFun(); 
        if(handler.isTimer) 
        {
          this.removeTimer(handler.key); 
        }
        else
        {
           this.removeFrame(handler.key); 
        }       
       }    
    } 
                             
  }
}
                       
//设置帧调度
                       
private pool:Array<Handler> = [];
public addFrame(key:any,func:Function,thisObject:any,delay:number = 0,reatCount:number=0,completeFun:Function=null,completeFunObj:any=null):void
{
   if(!this.funsDic[key])
   {   
     var handler:Handler = this.pool.length == 0 ? new Handler():this.pool.pop();
     handler.key = key;
     handler.method = func;
     handler.thisObject = thisObject;
     handler.delay = delay;
     handler.isTimer = false;
     handler.isRepeat = reatCount == 0;
     handler.repeatCount = reatCount;
     handler.executeTime = this._currentFrame+delay;
     handler.lastTime = this.curTime;  
     handler.completeFun = completeFun;
     handler.completeObj = completeFunObj;
     this.funsDic[key] = handler;
     this.funsArray.push(handler);
   }
}
                       
//删除帧的调度
public removeFrame(key:any):void
{
   var handler:Handler = this.funsDic[key];
   if(!handler)return;
                          
   var arr:Array<any> = this.funsArray;
   if(arr.length == 0) return;
   var index = arr.indexOf(handler);
   if(index!=-1)
   {
     arr.splice(index,1); 
     handler.dispose();
     this.pool.push(handler);
     this.funsDic[key] = null;  
     delete this.funsDic[key];   
   }
}
                       
//计算帧速
private doFps():void
{
   this._currentFrame++;
   this.curTime = egret.getTimer();
   this.totalTime+= this.curTime - this.lastTime;
   this.lastTime = this.curTime;
   this._frameRate = this._currentFrame*1000/this.totalTime;
}
                       
//当前帧速
public get frameRate():number
{
  return this._frameRate;
}
                       
//当前帧
public get currentFrame():number
{
  return this._currentFrame;
}
                       
                       
//添加秒循环
public addTimer(key:any,func:Function,thisObject:any,delay:number = 0,reatCount:number=0,completeFun:Function=null,completeFunObj:any=null):void
{
                       
   if(!this.funsDic[key])
   {   
     var handler:Handler = this.pool.length == 0 ? new Handler():this.pool.pop();
     handler.key = key;
     handler.method = func;
     handler.thisObject = thisObject;
     handler.repeatCount = reatCount;
     handler.delay = delay;
     handler.isRepeat = reatCount == 0;
     handler.completeFun = completeFun;
     handler.completeObj = completeFunObj;
     handler.isTimer = true;
     handler.executeTime = delay+this.curTime;
     handler.lastTime = this.curTime;
     this.funsDic[key] = handler;
     this.funsArray.push(handler);
   }  
}
                       
                        
public removeTimer(key:any):void
{
    var handler:Handler = this.funsDic[key];
   if(!handler)return;
                          
   var arr:Array<any> = this.funsArray;
   if(arr.length == 0) return;
   var index = arr.indexOf(handler);
   if(index!=-1)
   {
     arr.splice(index,1); 
     handler.dispose();
     this.pool.push(handler);
     this.funsDic[key] = null;  
     delete this.funsDic[key];   
   }
}
                       
                       
}