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
var SocketManager = (function (_super) {
    __extends(SocketManager, _super);
    function SocketManager() {
        var _this = _super.call(this) || this;
        _this.msgReqeustList = {}; //消息请求队列
        _this.init();
        return _this;
    }
    Object.defineProperty(SocketManager, "instance", {
        get: function () {
            if (!SocketManager.instance) {
                SocketManager._instance = new SocketManager();
            }
            return SocketManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager.prototype.init = function () {
        this.socket = new egret.WebSocket();
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
    };
    SocketManager.prototype.onSocketData = function (event) {
        var msg = event.data;
        if (typeof msg == "string") {
            var vo = JSON.parse(msg);
            var msgId = vo.msgId; //消息ID
            var data = this.msgReqeustList[msgId];
            delete this.msgReqeustList[msgId]; //删除引用
            if (data) {
                if (data.thisObject) {
                    data.callBackFun.apply(data.thisObject, [new SocketEvent(msgId, data)]);
                }
                else {
                    data.callBackFun(new SocketEvent(msgId, data));
                }
            }
            if (this.hasEventListener(msgId)) {
                this.dispatchEvent(new SocketEvent(msgId, data));
            }
        }
    };
    SocketManager.prototype.onConnect = function (event) {
        console.log('socket 已链接');
    };
    SocketManager.prototype.onClose = function (event) {
        console.log('socket 已经关闭');
    };
    SocketManager.prototype.connect = function (url) {
        this.socket.connectByUrl(url);
    };
    /**
     * 发送JSON消息
     * @param msgId 消息ID
     * @param data  消息数据
     * @param callBackFun  回调
     * @param thisObject   回调指向
     */
    SocketManager.prototype.send = function (msgId, data, callBackFun, thisObject) {
        if (callBackFun === void 0) { callBackFun = null; }
        if (thisObject === void 0) { thisObject = null; }
        var msgVo = new MessageVo();
        msgVo.msgId = msgId;
        msgVo.data = data;
        if (this.msgReqeustList[msgId] == null) {
            var vo = {};
            vo.msgId = msgId;
            vo.callBackFun = callBackFun;
            vo.thisObject = thisObject;
            this.msgReqeustList[msgId] = vo;
        }
        var msg = msgVo.toJson();
        this.socket.writeUTF(msg);
    };
    return SocketManager;
}(egret.EventDispatcher));
__reflect(SocketManager.prototype, "SocketManager");
var MessageVo = (function () {
    function MessageVo() {
    }
    MessageVo.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return MessageVo;
}());
__reflect(MessageVo.prototype, "MessageVo");
//# sourceMappingURL=SocketManager.js.map