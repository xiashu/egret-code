var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageType = (function () {
    function MessageType() {
    }
    //登录
    MessageType.LOGIN = "100000";
    return MessageType;
}());
__reflect(MessageType.prototype, "MessageType");
//# sourceMappingURL=MessageType.js.map