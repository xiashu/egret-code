class RadioView extends eui.Component {
                        
  public miBtn:eui.RadioButton;
  public sanBtn:eui.RadioButton;
  public appBtn:eui.RadioButton;
  public huaBtn:eui.RadioButton;                     
  constructor() {
    super();
    this.skinName = "RadioViewSkin";
  }
                      
  protected childrenCreated(): void {
                            
    this.miBtn.addEventListener(eui.UIEvent.CHANGE,  this.onChangeHandler, this);
    this.sanBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
    this.appBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
    this.huaBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);                      
  }
                                               
  private onChangeHandler(event:eui.UIEvent):void
  {  
     var btn:eui.RadioButton =  <eui.RadioButton>(event.currentTarget);         
     console.log(btn.label,btn.value,btn.selected);
  }                       
}