class PoolManager {
  public constructor() {
      
  }
      
      
   //所有对象列表
   private static allList:Object = {};
      
    /*
   * @param obj 对象
   * 入栈
   */
   public static push(obj:any):boolean
   {
     if(!obj) return false;
              
        var key:any = obj.onlyKey;
        if (key == null || !PoolManager.allList[key] )
        {
            return false;
        }
        
        PoolManager.allList[key].push(obj);
        return true;
   }
         
         
  /*
   * @param className 类名
   * @param args 构造函数参数
   * 出栈
   */
   public static pop(className:string,...args):any
   { 
          
    var list:Array<any> = PoolManager.allList[className];
    if(list && list.length > 0)
    {
      return list.pop() ;
    }
    else
    {
      PoolManager.allList[className] = []; 
    }
      
      var obj:any = PoolManager.createClass(className,args);
      return obj;
   }
      
       
   private static createClass(className:string,...args):any
   {
      var obj:any = null; 
      var cls = egret.getDefinitionByName(className);
      if(!cls) return null;
       switch(args.length)
     {
       case 0:
           obj = new cls();
       break
       case 1:
               obj = new cls(args[0]);
       break;
       case 2:
               obj = new cls(args[0],args[1]);
       break;
       case 3:
               obj = new cls(args[0],args[1],args[2]);
       break;
       case 4:
               obj = new cls(args[0],args[1],args[2],args[3]);
       break;
      
     }
       
   if(obj)
   {
        obj.onlyKey = className;
   } 
      
    return obj;
   }  
       
    /*
   * 清除
   */
   public static clear():void
   {
       PoolManager.allList = {};
   }
      
}