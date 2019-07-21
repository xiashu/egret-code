 

class HttpRequest extends egret.EventDispatcher {

     
     public constructor()
     {
         super();
     }


      public send(url:string,param:any,dataFormatType:string = egret.URLLoaderDataFormat.TEXT):void
      {
        
         var request:egret.URLRequest = new egret.URLRequest();
         request.method = egret.URLRequestMethod.POST;
         request.url = url;
         if(dataFormatType == egret.URLLoaderDataFormat.TEXT )
         {
             request.data = JSON.stringify(param);
         }
         else if(dataFormatType == egret.URLLoaderDataFormat.VARIABLES)
         {           
             request.data = new egret.URLVariables(this.urlEncode(param))
         }
         
         request.requestHeaders = [ 
            new egret.URLRequestHeader("Content-Type","application/x-www-form-urlencoded")
        ];
        
        //实例化创建URLLoader对象
        var urlloader:egret.URLLoader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        urlloader.load(request);//发送请求 
     }

      private  onComplete(event:egret.Event):void
      {
           this.remove(event.currentTarget);
           this.dispatchEventWith(HttpRequestEvent.ON_DATA, false, event.currentTarget.data);
      }   

      private  onIOError(event:egret.IOErrorEvent):void
      {
           this.remove(event.currentTarget);
           this.dispatchEventWith(HttpRequestEvent.ON_ERROR);
      }   

      private remove(urlloader:egret.URLLoader):void
      {
          urlloader.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
          urlloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
      }

      private urlEncode(data:any):string{
      {
    
        let result = []
        for (let key in data) 
        {
            let value = data[key]
            if (value.constructor === Array) {
                value.forEach(_value => {
                result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
                })
            } else {
                result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
            }
        }
          
            return result.length ? result.join('&') : ''
       }
      
    }

}

 
 class  HttpRequestEvent extends egret.Event{
       
   
     public static  ON_DATA:string ="ON_DATA";
     public static  ON_ERROR:string ="ON_ERROR";
 }