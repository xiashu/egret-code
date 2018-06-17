
//MyAlert 组件
class MyAlert extends eui.Component {
	 constructor() {
         super();
		 this.skinName = "MyAlertSkin";		
	} 

   public closeHandler: Function;//关闭处理函数
   public thisObject: any;
   public msg:string; //文本内容
   public title:string;//标题内容
   public okBtn:eui.Button;
   public canelBtn:eui.Button;   
   public contentTxt: eui.Label;  
   public titleTxt: eui.Label;

   //展示框
   public static show(msg:string,title:string='提示',buttons:string="确定",closeHandler?:Function,thisObject?:any):MyAlert
   {
        var alert  = new MyAlert();
        alert.msg = msg;
        alert.title = title;
        alert.closeHandler = closeHandler;
        alert.thisObject = thisObject;
		var array:Array<string> = buttons.split("|");
        if(array)
		{
			alert.setButton(array);
		}
        
		PopUpManager.addPopUp(alert,true);
		return alert;
   }
   
   private  hide():void
   {
      PopUpManager.removePopUp(this);
      this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
      this.canelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
   }

   
	private setButton(array:Array<string>):void
	{
       if(array.length == 1)
	   {
          this.canelBtn.visible = false;
		  this.okBtn.visible  = true;
		  this.okBtn.x = (this.width-this.okBtn.width)/2;
		  this.okBtn.label  = array[0];
		  this.okBtn["tag"] = 1;
	   }
	   else
	   {
          this.canelBtn.visible = true;
		  this.canelBtn.label = array[0];
          this.canelBtn["tag"] = 1; 

		  this.okBtn.visible  = true;
		  this.okBtn.label  = array[1];
		  this.okBtn["tag"] = 2;    
	   } 

       this.contentTxt.text = this.msg;
       this.titleTxt.text = this.title;
      
       this.init();
	}
   
    private init():void
	{
	    this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this.canelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this); 
    }

 
    private  onClickHandler(event:egret.TouchEvent):void
    {
		if(this.closeHandler)
		{
			 var tag = (event.currentTarget)["tag"];
             this.closeHandler.apply(this.thisObject,[tag]);   
		}

		this.hide();     
    }

}