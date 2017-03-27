class BasePanel extends eui.Component 
{
	public constructor()
	{
		super();
		GameManager.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
		this.onResize();
	}

	private onResize(): void 
	{
		this.onResizeHandler();
	}

	protected onResizeHandler(): void 
	{
		this.height = GameManager.stage.stageHeight;
	}

	protected childrenCreated(): void
	{
		LayerManager.fixScreen();
		this.init();
	}

	protected init(): void {
        //入口 需要覆盖 
	}


	public addButtonEvent(target:egret.DisplayObject,func:Function,thisObject?:any):void
	{
	   if(!target) return;	
       target.addEventListener(egret.TouchEvent.TOUCH_TAP,func,thisObject||this);
	}

	public removeButtonEvent(target:any,func:Function,thisObject?:any):void
	{
		if(!target) return;
		target.removeEventListener(egret.TouchEvent.TOUCH_TAP,func,thisObject || this);
	}  

	
}