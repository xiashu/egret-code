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
var RadioView = (function (_super) {
    __extends(RadioView, _super);
    function RadioView() {
        var _this = _super.call(this) || this;
        _this.skinName = "RadioViewSkin";
        return _this;
    }
    RadioView.prototype.childrenCreated = function () {
        this.miBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
        this.sanBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
        this.appBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
        this.huaBtn.addEventListener(eui.UIEvent.CHANGE, this.onChangeHandler, this);
    };
    RadioView.prototype.onChangeHandler = function (event) {
        var btn = (event.currentTarget);
        console.log(btn.label, btn.value, btn.selected);
    };
    return RadioView;
}(eui.Component));
__reflect(RadioView.prototype, "RadioView");
//# sourceMappingURL=RadioView.js.map