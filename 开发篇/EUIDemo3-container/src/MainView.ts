class MainView extends eui.Component 
{
    private loginBtn: eui.Button;
    private nameTxt: eui.TextInput;
    private pwdTxt: eui.TextInput;
    private regBtn: eui.Button;
    public constructor() 
    {
        super();
        this.skinName = "MainSkin";
    }

     protected childrenCreated(): void{
      this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
                
    }

    private  welComeView:WelComeView ;         
    private onClick(event:egret.TouchEvent):void {
           
        console.log("点击到按钮了");
        if(this.nameTxt.text !="" && this.pwdTxt.text !="")
        {
            console.log('密码和帐号不为空');
            if(!this.welComeView)
            {
                this.welComeView = new WelComeView();
            }
            this.addChild(this.welComeView);
        }
        else
        {
             console.log('密码或帐号不能为空');
        }
   }

   private  removeSelf():void
   {
      if(this.parent)
      {
         this.parent.removeChild(this);
      }
   }

 

}