"use strict";
cc._RF.push(module, '43d11hFwbBA9o+hdJC/MkZK', 'VarManager');
// Script/VarManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 管理游戏内变量数据
 */
var VarManager = /** @class */ (function (_super) {
    __extends(VarManager, _super);
    function VarManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.varMap = [];
        return _this;
    }
    VarManager_1 = VarManager;
    VarManager.prototype.onLoad = function () {
        VarManager_1.instance = this;
    };
    VarManager.prototype.setVar = function (name, value) {
        this.varMap[name] = value;
        cc.log("设置变量" + name + "为" + value);
    };
    VarManager.prototype.getVar = function (name) {
        if (typeof (this.varMap[name]) == "undefined") {
            cc.error("变量" + name + "未定义过");
        }
        return this.varMap[name];
    };
    var VarManager_1;
    __decorate([
        property({
            visible: false,
        })
    ], VarManager.prototype, "varMap", void 0);
    VarManager = VarManager_1 = __decorate([
        ccclass
    ], VarManager);
    return VarManager;
}(ManagerInterface_1.default));
exports.default = VarManager;

cc._RF.pop();