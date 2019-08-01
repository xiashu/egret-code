//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

   
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void 
    {
         this.playBgSound();
    }

    private  playBgSound():void
    {
        
        var startBtn:eui.Button = new eui.Button();
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
        startBtn.label = "音乐一开始";
        startBtn.width = 200;
        startBtn.height = 40;
        startBtn.y = 100;
        startBtn.x = 50;
        this.addChild(startBtn);
             
        var pauseBtn:eui.Button = new eui.Button();
        pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPause,this);
        pauseBtn.label = "音乐一暂停";
        pauseBtn.width = 200;
        pauseBtn.height = 40;
        pauseBtn.y = 100;
        pauseBtn.x = 250;
        this.addChild(pauseBtn);

         
        startBtn = new eui.Button();
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart2,this);
        startBtn.label = "音乐二开始";
        startBtn.width = 200;
        startBtn.height = 40;
        startBtn.y = 200;
        startBtn.x = 50;
        this.addChild(startBtn);
             
        pauseBtn= new eui.Button();
        pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPause2,this);
        pauseBtn.label = "音乐二暂停";
        pauseBtn.width = 200;
        pauseBtn.height = 40;
        pauseBtn.y = 200;
        pauseBtn.x = 250;
        this.addChild(pauseBtn);
 
    
        var stopBtn:eui.Button = new eui.Button();
        stopBtn.label = '停在所有音乐';
        stopBtn.width = 200;
        stopBtn.height = 50;
        stopBtn.y = 300;
        stopBtn.x = 250;
        this.addChild(stopBtn);
        stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:TouchEvent)=>{
                 
                 SoundManager.getInstance().stopAllSound();
             
        },this);

   }
         
    private onStart(event:egret.TouchEvent):void
    {
        SoundManager.getInstance().stopByKey("bgm_mp3"); 
        SoundManager.getInstance().playBg("bgm_mp3");
    }
        

    private onPause(event:egret.TouchEvent):void
    {
        var soundObj = SoundManager.getInstance().getChangel("bgm_mp3");
        if(!soundObj) return;
        if(!soundObj['istop'])
        {
           SoundManager.getInstance().pause("bgm_mp3",true);
        }
        else
        {
           SoundManager.getInstance().pause("bgm_mp3",false);
        }  
    }
 
    private onStart2(event:egret.TouchEvent):void
    {
        SoundManager.getInstance().stopByKey("light_mp3"); 
        SoundManager.getInstance().playBg("light_mp3");
    }
        

    private onPause2(event:egret.TouchEvent):void
    {
        var soundObj = SoundManager.getInstance().getChangel("light_mp3");
        if(!soundObj) return;
        if(!soundObj['istop'])
        {
           SoundManager.getInstance().pause("light_mp3",true);
        }
        else
        {
           SoundManager.getInstance().pause("light_mp3",false);
        }  
    }


}
