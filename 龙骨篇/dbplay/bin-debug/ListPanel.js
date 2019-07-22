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
var ListPanel = (function (_super) {
    __extends(ListPanel, _super);
    function ListPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ListPanelSKin";
        return _this;
    }
    ListPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var items = [];
        for (var i = 0; i < 100; i++) {
            items.push("内容" + i);
        }
        this.list.dataProvider = new eui.ArrayCollection(items);
    };
    return ListPanel;
}(eui.Component));
__reflect(ListPanel.prototype, "ListPanel");
//# sourceMappingURL=ListPanel.js.map