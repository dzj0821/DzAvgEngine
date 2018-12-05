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
        this.setVar("Canvas", cc.find("Canvas/DisplayArea").getComponent(cc.Sprite));
    };
    VarManager.prototype.start = function () {
    };
    VarManager.prototype.setVar = function (name, value) {
        if (!this.validVarName(name)) {
            return;
        }
        if (typeof (this.varMap[name]) != "undefined" && typeof (value) != typeof (this.varMap[name])) {
            cc.error("设置变量类型不匹配：" + typeof (value) + "，应为" + typeof (this.varMap[name]));
        }
        this.varMap[name] = value;
        cc.log("设置变量" + name + "为" + value);
    };
    VarManager.prototype.getVar = function (name) {
        if (!this.validVarName(name)) {
            return;
        }
        if (typeof (this.varMap[name]) == "undefined") {
            cc.error("变量" + name + "未定义过");
        }
        return this.varMap[name];
    };
    VarManager.prototype.isExistVar = function (name) {
        if (!this.validVarName(name)) {
            return;
        }
        if (typeof (this.varMap[name]) == "undefined") {
            return false;
        }
        return true;
    };
    VarManager.prototype.validVarName = function (name) {
        if (typeof (name) != "string") {
            cc.error("变量名必须为string类型");
            return false;
        }
        return true;
    };
    VarManager.prototype.eval = function (left, operator, right) {
        if (this.isVar(left)) {
            left = VarManager_1.instance.getVar(left);
        }
        else if (typeof (left) == "string") {
            left = this.getConstString(left);
        }
        if (this.isVar(right)) {
            right = VarManager_1.instance.getVar(right);
        }
        else if (typeof (right) == "string") {
            right = this.getConstString(right);
        }
        if (typeof (left) != typeof (right)) {
            cc.error("类型不一致，左值：" + typeof (left) + "，右值：" + typeof (right));
            return;
        }
        switch (operator) {
            case "==":
                return left === right;
            case ">":
                return left > right;
            case ">=":
                return left >= right;
            case "<":
                return left < right;
            case "<=":
                return left <= right;
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "%":
                return left % right;
            default:
                cc.error("未知的运算符：" + operator);
                return false;
        }
    };
    VarManager.prototype.isVar = function (value) {
        if (typeof (value) != "string") {
            return false;
        }
        if (value.charAt(0) == "\"" && value.charAt(value.length - 1) == "\"") {
            return false;
        }
        return true;
    };
    VarManager.prototype.getConstString = function (value) {
        if (typeof (value) != "string" || value.charAt(0) != "\"" || value.charAt(value.length - 1) != "\"") {
            cc.error(value + "不是一个字符串常量");
            return null;
        }
        var result = value.substring(1);
        result.substring(0, result.length - 1);
        return result;
    };
    var VarManager_1;
    VarManager.instance = null;
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