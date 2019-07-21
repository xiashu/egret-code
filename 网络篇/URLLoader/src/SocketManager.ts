class SocketManager extends egret.EventDispatcher {
    constructor() {
        super();
        this.init();
    }
    
    private static _instance:SocketManager;
	public static get instance():SocketManager{      
	    if(!SocketManager.instance){
			 SocketManager._instance  = new  SocketManager();
		 }
         return SocketManager._instance;        
	 }
      
    private socket:egret.WebSocket;
    private msgReqeustList: Object = {};//消息请求队列

    private init():void
    {
        this.socket = new egret.WebSocket();
        this.socket.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this );
        this.socket.addEventListener( egret.Event.CONNECT, this.onConnect, this );
        this.socket.addEventListener( egret.Event.CLOSE, this.onClose, this );
    }

	private onSocketData(event: egret.ProgressEvent):void 
    {
          var msg = event.data;  
          if(typeof msg == "string")
          {
              var vo = JSON.parse(msg);
              var msgId = vo.msgId; //消息ID
              var data:any = this.msgReqeustList[msgId];
              delete this.msgReqeustList[msgId];//删除引用
              if(data)
              {   //回调数据
                  if(data.thisObject)
                  {
                     data.callBackFun.apply(data.thisObject,[new SocketEvent(msgId,data)]);
                  }else
                  {
                     data.callBackFun(new SocketEvent(msgId,data));
                  }       
              }

              if(this.hasEventListener(msgId)) 
              {
                 this.dispatchEvent(new SocketEvent(msgId,data));
              }
          }
	}
     
	private onConnect(event: egret.Event):void 
    {
         console.log('socket 已链接');
	}

	private onClose(event: egret.Event):void 
    {
        console.log('socket 已经关闭');
	}

    public connect(url:string):void
    {
        this.socket.connectByUrl(url);
    }
    
    /**
     * 发送JSON消息
     * @param msgId 消息ID
     * @param data  消息数据
     * @param callBackFun  回调
     * @param thisObject   回调指向
     */    
    public send(msgId:string,data:Object,callBackFun:Function = null,thisObject:any = null):void
    {
         var msgVo = new MessageVo();
         msgVo.msgId = msgId;
         msgVo.data = data;
         if(this.msgReqeustList[msgId]==null)
         {  //记录请求的消息列表
            var vo:any = {};
            vo.msgId =  msgId;
            vo.callBackFun =  callBackFun;
            vo.thisObject =  thisObject;
            this.msgReqeustList[msgId] = vo;
         }
        
         var msg = msgVo.toJson();
         this.socket.writeUTF(msg)
    }
}

class MessageVo {
   
   public msgId:string;
   public data:Object;

   public toJson():string{
       return JSON.stringify(this);
   }
}