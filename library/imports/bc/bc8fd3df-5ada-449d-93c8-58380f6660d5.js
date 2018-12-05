"use strict";
cc._RF.push(module, 'bc8fdPfWtpEnZPIWDgPZmDV', 'SelectManager');
// Script/SelectManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var InputManager_1 = require("./InputManager");
var ContentManager_1 = require("./ContentManager");
var ContentStatus_1 = require("./enum/ContentStatus");
var SelectButton_1 = require("./vo/SelectButton");
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
        ManagerInterface_1.default.managersIsExist([InputManager_1.default, ContentManager_1.default]);
    };
    SelectManager.prototype.showSelects = function (varName, selects) {
        var _this = this;
        //每有一个按钮，起始位置向上挪100
        var startPosY = this.defaultSelectButton.position.y + selects.length * 100;
        selects.forEach(function (element, index) {
            var button = cc.instantiate(_this.defaultSelectButton);
            //将生成的按钮记录至数组
            _this.selectButtons[_this.selectButtons.length] = button;
            button.getComponent(SelectButton_1.default).init(varName, index, element);
            button.setParent(_this.node);
            button.setPosition(button.position.x, startPosY - index * 200);
            button.active = true;
        });
    };
    SelectManager.prototype.endSelects = function () {
        this.selectButtons.forEach(function (element) {
            element.destroy();
        });
        this.selectButtons = [];
        ContentManager_1.default.instance.status = ContentStatus_1.default.ReadNext;
        ContentManager_1.default.instance.next();
    };
    var SelectManager_1;
    SelectManager.instance = null;
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