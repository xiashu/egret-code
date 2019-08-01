/**
 * DBPlayer extends DBPlayer
 */
class DBPlayer extends egret.Sprite {
    constructor( ) {
        super();
    }


    private armature:dragonBones.EgretArmatureDisplay;

    private dragonbonesFactory:dragonBones.EgretFactory;

    //播放完的回调函数
    public completeFun:Handler;

    private mparent:egret.DisplayObjectContainer;

    //加载次数
    private loadNum:number = 0;

    //资源ID
    private resourceId:string = "";

    //动画名称
    private animationName:string = "";

    //骨骼名称
    private armatureName:string = "";

    //播放次数
    private playtime:number = 0;


    //加载列表
    private loadList:Array <any>;


    public static NewDBPlayer():DBPlayer
    {
        return new DBPlayer();
    }


    public show(resourceId:string,parent:egret.DisplayObjectContainer=null,playtime: number,animationName: string,armatureName:string):void
    {

        this.resourceId = resourceId;
        this.mparent = parent;      
        this.playtime = playtime;
        this.animationName = animationName;
        this.armatureName = armatureName;
        var dragonbonesData: any = RES.getRes(resourceId+"_ske_json");
        var textureData: any = RES.getRes(resourceId+"_tex_json");
        var texture:egret.Texture = RES.getRes(resourceId+"_tex_png");
        if(dragonbonesData && textureData && texture)
        {
            this.initDBData(dragonbonesData,textureData,texture);
        }
        else
        {
            this.loadList  = [resourceId+"_ske_json",resourceId+"_tex_json",resourceId+"_tex_png"];
            this.loadNum = this.loadList.length;
            this.startload();
        }
    }

    private startload():void
    {
        if(this.loadList.length >0)
        {
            var res = this.loadList.pop();
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.getResAsync(res,this.compFunc,this);
        }
    }

    private onResourceLoadError(event:RES.ResourceEvent):void
    {
        console.log("Error:"+event);
    }

    private compFunc(data:any):void
    {
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        this.loadNum -- ;
        if(this.loadNum > 0)
        {
            this.startload();
        }
        else
        {
            var dragonbonesData: any = RES.getRes(this.resourceId+"_ske_json");
            var textureData: any = RES.getRes(this.resourceId+"_tex_json");
            var texture:egret.Texture = RES.getRes(this.resourceId+"_tex_png");
            this.initDBData(dragonbonesData,textureData,texture);
        }
    }

    private initDBData(dragonbonesData:any, textureData:any, texture:any):void
    {
        this.dragonbonesFactory  = dragonBones.EgretFactory.factory;
        this.dragonbonesFactory.parseDragonBonesData(dragonbonesData);
        this.dragonbonesFactory.parseTextureAtlasData(textureData,texture);
        this.armature = this.dragonbonesFactory.buildArmatureDisplay(this.armatureName);
        this.armature.addEventListener( dragonBones.AnimationEvent.COMPLETE, this.onLoopComplete,this);
        this.addChild(this.armature);
        this.play(0,this.playtime);
        if(this.mparent)
        {
            this.mparent.addChild(this);
        }
    }

    private  onLoopComplete(event: dragonBones.AnimationEvent):void {
 
        if(this.completeFun!=null)
        {
            this.completeFun.fun.call(this.completeFun.thisObj,this);        
        }
        
    } 

    public play(time?:number ,playTime?:number):void
    {
        if(this.armature)
        {
            this.armature.animation.gotoAndPlayByTime(this.animationName,time,playTime);
        }

    }

    public stop():void
    {
        if(this.armature)
        {
            this.armature.animation.stop();

        }
    }


    public unload():void
    {
        this.stop();
        if(this.armature)
        {
            this.removeChild(this.armature);      
        }
        if(this.mparent)
        {
            this.mparent.removeChild(this);
        }
        this.armature = null;
    }


}
 
