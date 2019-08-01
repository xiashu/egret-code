var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 函数主体
 */
var Handler = (function () {
    function Handler(fun, thisObj) {
        if (fun === void 0) { fun = null; }
        if (thisObj === void 0) { thisObj = null; }
        this.fun = fun;
        this.thisObj = thisObj;
    }
    Handler.prototype.dispose = function () {
        this.fun = null;
        this.thisObj = null;
    };
    /**
     * 创建Handler
     * @param fun
     * @param thisObj
     */
    Handler.create = function (fun, thisObj) {
        if (fun === void 0) { fun = null; }
        if (thisObj === void 0) { thisObj = null; }
        return new Handler(fun, thisObj);
    };
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
//# sourceMappingURL=Handler.js.map