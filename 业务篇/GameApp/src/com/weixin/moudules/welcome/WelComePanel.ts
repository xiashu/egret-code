/**
 *
 * @author 
 * 开始欢迎页面
 */
class WelComePanel extends BasePanel{
    
    private startBtn: eui.Button; 
    
	public constructor() 
	{
        super();
        this.skinName = "WelComePanelSkin";    
	}
   
	protected init():void
	{
		this.addButtonEvent(this.startBtn,this.onStartGame);
    }
    
	private onStartGame(event: egret.TouchEvent):void
	{
    	//进入下一页说明
        LayerManager.gameLayer.removeChild(this);
        var game:GamePanel = new GamePanel();
        LayerManager.gameLayer.addChild(game);
	}
}
