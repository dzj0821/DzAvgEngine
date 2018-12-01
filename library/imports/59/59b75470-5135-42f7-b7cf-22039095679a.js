"use strict";
cc._RF.push(module, '59b75RwUTVC97fPIgOQlWea', 'StatusManager');
// Script/StatusManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var Status_1 = require("./enum/Status");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 给其他管理器提供状态的类，如让输入管理器判断是否应该继续剧情
 */
var StatusManager = /** @class */ (function (_super) {
    __extends(StatusManager, _super);
    function StatusManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status_1.default.Play;
        return _this;
    }
    StatusManager_1 = StatusManager;
    StatusManager.prototype.onLoad = function () {
        StatusManager_1.instance = this;
    };
    var StatusManager_1;
    __decorate([
        property({
            visible: false,
        })
    ], StatusManager.prototype, "status", void 0);
    StatusManager = StatusManager_1 = __decorate([
        ccclass
    ], StatusManager);
    return StatusManager;
}(ManagerInterface_1.default));
exports.default = StatusManager;

cc._RF.pop();