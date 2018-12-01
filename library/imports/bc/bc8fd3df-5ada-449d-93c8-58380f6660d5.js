"use strict";
cc._RF.push(module, 'bc8fdPfWtpEnZPIWDgPZmDV', 'SelectManager');
// Script/SelectManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var SelectButton_1 = require("./SelectButton");
var StatusManager_1 = require("./StatusManager");
var Status_1 = require("./enum/Status");
var InputManager_1 = require("./InputManager");
var ContentManager_1 = require("./ContentManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 默认的选项按钮和动态生成的都在此节点下
 */
var SelectManager = /** @class */ (function (_super) {
    __extends(SelectManager, _super);
    function SelectManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultSelectButton = null;
        _this.selectButtons = [];
        return _this;
    }
    SelectManager_1 = SelectManager;
    SelectManager.prototype.onLoad = function () {
        SelectManager_1.instance = this;
    };
    SelectManager.prototype.start = function () {
        ManagerInterface_1.default.managersIsExist([StatusManager_1.default, InputManager_1.default, ContentManager_1.default]);
    };
    SelectManager.prototype.showSelects = function (varName, selects) {
        var _this = this;
        StatusManager_1.default.instance.status = Status_1.default.Select;
        //每有一个按钮，起始位置向上挪100
        var startPosY = this.defaultSelectButton.position.y + selects.length * 100;
        selects.forEach(function (element, index) {
            var button = cc.instantiate(_this.defaultSelectButton);
            //将生成的按钮记录至数组
            _this.selectButtons[_this.selectButtons.length] = button;
            button.getComponent(SelectButton_1.default).varName = varName;
            button.getComponent(SelectButton_1.default).value = index;
            button.getComponent(SelectButton_1.default).textLabel.string = element;
            button.parent = _this.node;
            button.setPosition(button.position.x, startPosY - index * 200);
            button.active = true;
        });
    };
    SelectManager.prototype.endSelects = function () {
        if (StatusManager_1.default.instance.status != Status_1.default.Select) {
            cc.error("当前不是选择选项状态，当前状态为：" + InputManager_1.default.instance.status);
            return;
        }
        this.selectButtons.forEach(function (element) {
            element.destroy();
        });
        this.selectButtons = [];
        StatusManager_1.default.instance.status = Status_1.default.Play;
        ContentManager_1.default.instance.next();
    };
    var SelectManager_1;
    __decorate([
        property(cc.Node)
    ], SelectManager.prototype, "defaultSelectButton", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], SelectManager.prototype, "selectButtons", void 0);
    SelectManager = SelectManager_1 = __decorate([
        ccclass
    ], SelectManager);
    return SelectManager;
}(ManagerInterface_1.default));
exports.default = SelectManager;

cc._RF.pop();