"use strict";
cc._RF.push(module, '52057++EQdJd4tDDNv+MyWW', 'ManagerInterface');
// Script/ManagerInterface.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 所有的Manager都需要在onLoad中给instance赋值自身，便于其他类调用，同时调用类应在start中判断是否为null防止意外
 */
var ManagerInterface = /** @class */ (function (_super) {
    __extends(ManagerInterface, _super);
    function ManagerInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManagerInterface.managersIsExist = function (Managers) {
        Managers.forEach(function (element) {
            if (element.instance == null) {
                cc.error("未找到" + element.prototype.__classname__);
            }
        });
    };
    ManagerInterface.instance = null;
    ManagerInterface = __decorate([
        ccclass
    ], ManagerInterface);
    return ManagerInterface;
}(cc.Component));
exports.default = ManagerInterface;

cc._RF.pop();