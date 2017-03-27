/**
 *
 * @author 
 * 层级 管理 和舞台管理
 */
class LayerManager {
    
    
    //消息通知层
    public static alertLayer: egret.Sprite = new egret.Sprite();
  
    
    //游戏主内容层
    public static gameLayer: egret.Sprite = new egret.Sprite();
    
    
	public constructor() {
	}
	
	//初始化层级页面
    public static init(stage: egret.Stage): void
    {
        GameManager.stage = stage;
        stage.addChild(LayerManager.gameLayer);      
        stage.addChild(LayerManager.alertLayer);
    }
    
    public static fixScreen()
    {
        if(egret.Capabilities.isMobile) 
        {
            GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else
        {
            GameManager.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    }
    
}
