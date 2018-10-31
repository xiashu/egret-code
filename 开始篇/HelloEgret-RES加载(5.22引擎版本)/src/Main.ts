class Main extends egret.DisplayObjectContainer {
             
    public constructor() {
        super();
        this.init();
    }
             
  private init():void
  {                  
       var txt:egret.TextField = new egret.TextField();
       this.addChild(txt);//添加到显示列表
       txt.size = 60;//字体大小
       txt.textColor  = 0xff0000;//文本颜色
       txt.text = "HelloWorld";//文本内容
       txt.x = 200;//x 坐标
       txt.y = 200;//y 坐标
        
       this.loadResource()   
  }
 

private async loadResource()
{
    try{
       await RES.loadConfig("resource/default.res.json", "resource/");
       await RES.getResByUrl("resource/assets/bg.jpg",this.onImgLoadHandler,this,RES.ResourceItem.TYPE_IMAGE);
    }
    catch(e)
    {
        console.log(e);
    }

}
 
 
  private onImgLoadHandler(texture:any):void
  {
      //创建纹理，并赋值给位图Bitmap
      var  bitmap:egret.Bitmap = new egret.Bitmap(); 
      bitmap.texture = texture;
      bitmap.x = 0;
      bitmap.y = 100;
      this.addChildAt(bitmap,0);//添加到显示列表
  }

              
}