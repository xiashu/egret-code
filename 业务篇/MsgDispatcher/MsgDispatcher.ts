//消息分发
class MsgDispatcher extends egret.EventDispatcher {
                     
    private static _instance: MsgDispatcher;
                     
    public static get instance():MsgDispatcher
    {
        if(!MsgDispatcher._instance)
        {
            MsgDispatcher._instance = new MsgDispatcher();
        }  
        return MsgDispatcher._instance;
    }
                         
  public constructor() {
        super();
  }
                 
  //派发
  public static dispatch(type:string, data?:any):void
  {
        MsgDispatcher.instance.dispatchEventWith(type, false, data);
  }
                 
  //注册
  public static regiter(type:string, func:Function, thisObj:any):void
  {
        MsgDispatcher.instance.addEventListener(type, func, thisObj);
  }
                 
    //移除
    public static remove(type: string, func: Function, thisObj: any):void
   {
        MsgDispatcher.instance.removeEventListener(type, func, thisObj);
    }
}