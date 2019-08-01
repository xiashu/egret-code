class SoundManager {    
  public constructor() {
  }
    
  private static instance:SoundManager;
 
  private soundDic:Object = {};
 
  public static getInstance():SoundManager
  {
     if(this.instance==null)
     {
       this.instance = new SoundManager();
     }
     return this.instance;
  }
    
   /**
   * 播放音乐
   */
  public playBg(key:string,startime:number =1,loops:number=0,volume:number=1):void
  {
        
      var sound = RES.getRes(key);
      if(sound)
      { 
        var channel = sound.play(startime,loops);
        this.soundDic[key] = {channel:channel,position:startime,volume:volume,loops:loops,istop:false};
        if( this.soundDic[key].channel)
        {
            this.soundDic[key].channel.volume = volume;
        }
      }
      else
      {
          this.soundDic[key] = {channel:null,position:startime,volume:volume,loops:loops,istop:false};
          RES.getResAsync(key,this.onLoadComplete,this);
      }
  }
    
  private onLoadComplete(data:any,key:string):void
  { 
      var sound = RES.getRes(key);      
      var channel = sound.play(this.soundDic[key].position,this.soundDic[key].loops);
      this.soundDic[key].channel = channel;
      if(this.soundDic[key].channel)
      {
         this.soundDic[key].channel.volume = this.soundDic[key].volume;
      }
  }
    
     
    
 /**
   * 停止背景音效
   */
  public stopByKey(key:string):void
  { 
     if(this.soundDic[key] && this.soundDic[key].channel)
     {
        this.soundDic[key].position = this.soundDic[key].channel.position;
        this.soundDic[key].channel.stop();
        this.soundDic[key].istop = true;
     }
  }
      
    
 /**
   * 暂停
   */
  public pause(key:string,bool:boolean = true):void
  { 
    if(bool)
    {
       this.stopByKey(key);
    }
    else
    {   
        if(this.soundDic[key] && this.soundDic[key].channel)
        { 
            this.soundDic[key].channel.stop();
          	var sound:egret.Sound = RES.getRes(key);
            this.soundDic[key].channel = sound.play(this.soundDic[key].position,this.soundDic[key].loops);
            this.soundDic[key].istop = false;
        }

    }
  }



  public getChangel(key:string):Object
  {
    return  this.soundDic[key];
  }

 /**
   * 停止所有channel 
   */  
  public stopAllSound():void
  {

      for (var key in this.soundDic) 
      {
          if(this.soundDic[key] && this.soundDic[key].channel)
          {
              this.soundDic[key].channel.stop();      
          }
      }
  }
     
}