/**
 *  冷却时间 
 */
class  CoolTime 
{
    private delayTime:number;
    private totalTime:number;
    private thisObj:any;
    private everyFun:Function;
    private completeFun:Function;
                      
    public constructor(delayTime:number = 0,totalTime:number =0)
    {
       this.delayTime = delayTime;
       this.totalTime = totalTime;
    }
                        
    public setTime(delayTime:number,totalTime:number)
    {
       this.delayTime = delayTime;
       this.totalTime = totalTime;
    }
                        
    /**
     * 添加监听 倒计时两个回调函数
     * @param everyFun
     * @param completeFun
     */
    public addCallBack(everyFun:Function,thisObj:any,completeFun:Function = null):void
    {
        if(this.delayTime <= 0)
        {
            return;
        }
                            
        var second = this.delayTime;
        this.thisObj = thisObj;
        this.everyFun = everyFun;
        this.completeFun = completeFun;
    FrameManager.getInstance().addTimer(this,this.onCoolTimeHandler,this,second)
                                   
    }
                            
    private onCoolTimeHandler(time:number):void 
    {       
                            
         if(this.totalTime <=0 )
         {
             FrameManager.getInstance().removeHandler(this);             
         }
                         
         if(this.everyFun)
        {
            this.everyFun.apply(this.thisObj, [this.totalTime]);
         }
                            
                              
         if(this.totalTime <=0 && this.completeFun != null)
         {
             this.completeFun.apply(this.thisObj);
         }    
                    
      this.totalTime--;   
    }     
                            
}