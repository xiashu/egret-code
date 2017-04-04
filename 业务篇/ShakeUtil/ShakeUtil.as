class ShakeUtil {
  public constructor() {
                 
  }
                      
  private static instance: ShakeUtil=null;
                 
    public static  getInstance():ShakeUtil
  {
     if(!ShakeUtil.instance)
    {
      ShakeUtil.instance = new ShakeUtil();
    } 
    return ShakeUtil.instance;
  }
                 
                 
    private target:egret.DisplayObject;
    private offset:number; //偏移值
    private iShake:boolean = false;//是否在震动
    private isFlag:boolean = false; //标记
    private targetPoint:egret.Point;//目标值
    private repeatCount:number = 0;//重复次数
    private origin:number = 0;//原始偏移值
                     
                 
    /**
     * 斜角震动效果
     * target 目标 
     * offset 偏移值 6 或者12
     */
    public static shake(target:egret.DisplayObject,repeatCount:number =1 ,offset:number = 6):void
    {  
    ShakeUtil.getInstance().startShake(target,repeatCount,offset);     
  }
                 
                  
    private startShake(target:egret.DisplayObject,repeatCount:number =1,offset:number = 6):void
    {  
        if(this.iShake)
        {
            return;
        } 
                         
        this.target = target; 
        this.offset = offset;
        this.repeatCount = repeatCount;
        this.origin = offset;
        this.targetPoint = new egret.Point(this.target.x,this.target.y);  FrameManager.getInstance().addFrame("shakeEffect",this.onShakeHandler,this);  
    }
                     
                   
    private onShakeHandler():void
    {     
                         
        if( this.offset <= 0 )
        {
          this.repeatCount --;
          this.offset = this.origin;
          this.rest(this.target,this.targetPoint);         
      if(this.repeatCount<=0)
      {    
               FrameManager.getInstance().removeHandler("shakeEffect");
        this.iShake = false;
      }
                 
            return; 
        }
                           
        this.iShake = true;
        if(this.isFlag)
        {
            this.target.x = this.targetPoint.x +this.offset;
            this.target.y = this.targetPoint.y +this.offset;
            this.isFlag = false;
        }
        else
        {
            this.target.x = this.targetPoint.x -this.offset;
            this.target.y = this.targetPoint.y -this.offset;
            this.isFlag = true;
            this.offset -=1;
        } 
    }
                 
                   
                       
    /**
     * 重置位置
     */
    private rest(target:egret.DisplayObject,point:egret.Point):void
    {
         target.x = point.x;
         target.y = point.y;
    }   
}