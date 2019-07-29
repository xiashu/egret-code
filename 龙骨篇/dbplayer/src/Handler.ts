
/**
 * 函数主体
 */
class Handler {

    constructor(fun: Function = null, thisObj: any = null) {
        this.fun = fun;
        this.thisObj = thisObj;
    }

    /**
     * 处理的函数
     */
    public fun: Function;
    /**处理函数所属对象*/
    public thisObj: any;

    public dispose(): void {
        this.fun = null;
        this.thisObj = null;
    }

    /**
     * 创建Handler 
     * @param fun
     * @param thisObj
     */    
    public static create(fun: Function = null, thisObj: any = null):Handler
    {
         return  new Handler(fun,thisObj);    
    }
    
}