class Heart extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.init();
    }

    private init(): void 
    {
        var shape: egret.Shape = new egret.Shape();
        this.addChild(shape);
        shape.x = 275;
        shape.y = 200;
        this.drawLove(shape,5);

        var tf:egret.TextField = new egret.TextField();
        tf.text = "你还不来，我怎敢老去";
        this.addChild(tf);
        tf.x = 120;
        tf.y = 283; 

    }

    private drawLove(shape: egret.Shape,scale:number): void 
    {
        shape.graphics.beginFill(0xff0000);
        for (var i: number = 0; i <= 360; i++) 
        {
            var t: number = i * Math.PI / 180;
            var nextPoint: egret.Point = this.getPoint(t,scale);
            if (i == 0) 
            {
                shape.graphics.moveTo(nextPoint.x, nextPoint.y);
            }

            shape.graphics.lineTo(nextPoint.x, nextPoint.y);
        }

        shape.graphics.endFill();
    }

    //获取某一点的位置;
    private getPoint(t: number, scale: number = 1): egret.Point
    {
        var x: number = 16 * Math.pow((Math.sin(t)), 3);
        var y: number = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return new egret.Point(x*scale, -y*scale);
    }

}