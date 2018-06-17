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
           
    private onClick(event:egret.TouchEvent):void {
           
        console.log("点击到按钮了");
  }
}