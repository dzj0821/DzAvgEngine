"use strict";
cc._RF.push(module, 'bededuJyl9G7oqaxdRtYiXh', 'SelectButton');
// Script/vo/SelectButton.ts

Object.defineProperty(exports, "__esModule", { value: true });
var VarManager_1 = require("./../VarManager");
var SelectManager_1 = require("./../SelectManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 绑定在默认选项按钮下
 */
var SelectButton = /** @class */ (function (_super) {
    __extends(SelectButton, _super);
    function SelectButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.varName = "";
        _this.value = 0;
        _this.textLabel = null;
        return _this;
    }
    SelectButton_1 = SelectButton;
    SelectButton.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            VarManager_1.default.instance.setVar(event.currentTarget.getComponent(SelectButton_1).varName, event.currentTarget.getComponent(SelectButton_1).value);
            SelectManager_1.default.instance.endSelects();
        });
    };
    SelectButton.prototype.init = function (varName, value, showText) {
        this.varName = varName;
        this.value = value;
        this.textLabel.string = showText;
    };
    var SelectButton_1;
    __decorate([
        property({
            visible: false,
        })
    ], SelectButton.prototype, "varName", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], SelectButton.prototype, "value", void 0);
    __decorate([
        property(cc.Label)
    ], SelectButton.prototype, "textLabel", void 0);
    SelectButton = SelectButton_1 = __decorate([
        ccclass
    ], SelectButton);
    return SelectButton;
}(cc.Component));
exports.default = SelectButton;

cc._RF.pop();