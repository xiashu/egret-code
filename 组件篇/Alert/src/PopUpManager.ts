/**
 * 弹窗类
 *
 */
class PopUpManager {
	public constructor() {
	}
	
    private static container:egret.DisplayObjectContainer;

    /**
     * 指向容器层
     * @param container
     */    
    public static init(container:egret.DisplayObjectContainer):void
    {
        this.container = container;
    }
     /**
     * 添加对象
     * @param display 显示对象
     * @param isModel 是否模态
     * @param isWindow 是否窗体居中
     */   
    public static addPopUp(display: egret.DisplayObject,isCenter: boolean,isModel:boolean=true):void{

        if(display.parent) return;
              
        var ww = this.container.stage.stageWidth;
        var hh = this.container.stage.stageHeight;
        if(isModel)
        {
            var c = 0x000000,alpha = 0.7;
            var shape =  new egret.Shape();   
            shape.graphics.beginFill(c);
            shape.graphics.drawRect(0,0,ww,hh);
            shape.graphics.endFill();
            shape.alpha = alpha;
            shape.touchEnabled = true;
            this.container.addChild(shape);
        }
        this.container.addChild(display);
        if(isCenter) {
            display.x = (ww - display.width) / 2;
            display.y = (hh - display.height) / 2;            
            display.addEventListener(egret.Event.ENTER_FRAME,onEnterFrame,this);
        }
        
        function onEnterFrame() {
            display.removeEventListener(egret.Event.ENTER_FRAME,onEnterFrame,this); 
            display.x = (ww - display.width) / 2;
            display.y = (hh - display.height) / 2;
        }
    }

    /**
     * 移除窗口
     * @param display
     * @param isModel 模态
     */    
    public static removePopUp(display: egret.DisplayObject,isModel: boolean = true):void {
        if(display.parent) {
            var index = display.parent.getChildIndex(display);
            if(isModel){
              this.container.removeChildAt(index - 1);                
            }
            display.parent.removeChild(display);
        }
    }
}
