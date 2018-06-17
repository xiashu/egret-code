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
//MyAlert 组件
var MyAlert = (function (_super) {
    __extends(MyAlert, _super);
    function MyAlert() {
        var _this = _super.call(this) || this;
        _this.skinName = "MyAlertSkin";
        return _this;
    }
    //展示框
    MyAlert.show = function (msg, title, buttons, closeHandler, thisObject) {
        if (title === void 0) { title = '提示'; }
        if (buttons === void 0) { buttons = "确定"; }
        var alert = new MyAlert();
        alert.msg = msg;
        alert.title = title;
        alert.closeHandler = closeHandler;
        alert.thisObject = thisObject;
        var array = buttons.split("|");
        if (array) {
            alert.setButton(array);
        }
        PopUpManager.addPopUp(alert, true);
        return alert;
    };
    MyAlert.prototype.hide = function () {
        PopUpManager.removePopUp(this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.canelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    MyAlert.prototype.setButton = function (array) {
        if (array.length == 1) {
            this.canelBtn.visible = false;
            this.okBtn.visible = true;
            this.okBtn.x = (this.width - this.okBtn.width) / 2;
            this.okBtn.label = array[0];
            this.okBtn["tag"] = 1;
        }
        else {
            this.canelBtn.visible = true;
            this.canelBtn.label = array[0];
            this.canelBtn["tag"] = 1;
            this.okBtn.visible = true;
            this.okBtn.label = array[1];
            this.okBtn["tag"] = 2;
        }
        this.contentTxt.text = this.msg;
        this.titleTxt.text = this.title;
        this.init();
    };
    MyAlert.prototype.init = function () {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.canelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    MyAlert.prototype.onClickHandler = function (event) {
        if (this.closeHandler) {
            var tag = (event.currentTarget)["tag"];
            this.closeHandler.apply(this.thisObject, [tag]);
        }
        this.hide();
    };
    return MyAlert;
}(eui.Component));
__reflect(MyAlert.prototype, "MyAlert");
//# sourceMappingURL=MyAert.js.map