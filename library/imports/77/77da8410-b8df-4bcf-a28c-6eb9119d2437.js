"use strict";
cc._RF.push(module, '77da8QQuN9Lz6KMbrkRnSQ3', 'InputManager');
// Script/InputManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var StatusManager_1 = require("./StatusManager");
var Status_1 = require("./enum/Status");
var ContentManager_1 = require("./ContentManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InputManager = /** @class */ (function (_super) {
    __extends(InputManager, _super);
    function InputManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputManager_1 = InputManager;
    InputManager.prototype.onLoad = function () {
        InputManager_1.instance = this;
    };
    InputManager.prototype.start = function () {
        ManagerInterface_1.default.managersIsExist([StatusManager_1.default, ContentManager_1.default]);
    };
    InputManager.prototype.onTouchEnd = function () {
        switch (StatusManager_1.default.instance.status) {
            case Status_1.default.Play:
                ContentManager_1.default.instance.next();
                break;
            default:
                break;
        }
    };
    var InputManager_1;
    InputManager = InputManager_1 = __decorate([
        ccclass
    ], InputManager);
    return InputManager;
}(ManagerInterface_1.default));
exports.default = InputManager;

cc._RF.pop();