var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HttpRequest = (function (_super) {
    __extends(HttpRequest, _super);
    function HttpRequest() {
        return _super.call(this) || this;
    }
    HttpRequest.prototype.send = function (url, param, dataFormatType) {
        if (dataFormatType === void 0) { dataFormatType = egret.URLLoaderDataFormat.TEXT; }
        var request = new egret.URLRequest();
        request.method = egret.URLRequestMethod.POST;
        request.url = url;
        if (dataFormatType == egret.URLLoaderDataFormat.TEXT) {
            request.data = JSON.stringify(param);
        }
        else if (dataFormatType == egret.URLLoaderDataFormat.VARIABLES) {
            request.data = new egret.URLVariables(this.urlEncode(param));
        }
        request.requestHeaders = [
            new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        ];
        //实例化创建URLLoader对象
        var urlloader = new egret.URLLoader();
        urlloader.dataFormat = egret.URLLoaderDataFormat.BINARY;
        urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        urlloader.load(request); //发送请求 
    };
    HttpRequest.prototype.onComplete = function (event) {
        this.remove(event.currentTarget);
        this.dispatchEventWith(HttpRequestEvent.ON_DATA, false, event.currentTarget.data);
    };
    HttpRequest.prototype.onIOError = function (event) {
        this.remove(event.currentTarget);
        this.dispatchEventWith(HttpRequestEvent.ON_ERROR);
    };
    HttpRequest.prototype.remove = function (urlloader) {
        urlloader.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
    };
    HttpRequest.prototype.urlEncode = function (data) {
        {
            var result_1 = [];
            var _loop_1 = function (key) {
                var value = data[key];
                if (value.constructor === Array) {
                    value.forEach(function (_value) {
                        result_1.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value));
                    });
                }
                else {
                    result_1.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                }
            };
            for (var key in data) {
                _loop_1(key);
            }
            return result_1.length ? result_1.join('&') : '';
        }
    };
    return HttpRequest;
}(egret.EventDispatcher));
__reflect(HttpRequest.prototype, "HttpRequest");
var HttpRequestEvent = (function (_super) {
    __extends(HttpRequestEvent, _super);
    function HttpRequestEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpRequestEvent.ON_DATA = "ON_DATA";
    HttpRequestEvent.ON_ERROR = "ON_ERROR";
    return HttpRequestEvent;
}(egret.Event));
__reflect(HttpRequestEvent.prototype, "HttpRequestEvent");
//# sourceMappingURL=HttpRequest.js.map