/**
 * 错误码提示
 */
class ErrorCodeManager {
	public constructor() 
	{
		 
	}
    
   private static instance:ErrorCodeManager = null;

   public static getInstance():ErrorCodeManager
   {    
	   if(!ErrorCodeManager.instance)
	   {
         ErrorCodeManager.instance = new ErrorCodeManager();
	   }
	   return ErrorCodeManager.instance;
   }


   private map:Object = {};

   public init():void
   {
	    var str:string = <string>RES.getRes("error_txt");
		str = str.replace(/\r/g,"");
        var allData:string[] = str.split("\n"); 
        allData.forEach(element => {

			if(element.indexOf(":")!=-1) 
			{
				var oneData:string[] = element.split(":");
                this.map[oneData[0]] = oneData[1];			
		   }
			
		}); 
   }

    /**
     * 获取错误信息
     */    
	public getError(code:number):string
	{ 
       var msg:string = this.map[code];
       return msg || "code not found "+code;
	}
}