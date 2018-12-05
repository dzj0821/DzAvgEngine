"use strict";
cc._RF.push(module, '77da8QQuN9Lz6KMbrkRnSQ3', 'InputManager');
// Script/InputManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
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
    InputManager.prototype.onTouchEnd = function () {
        ContentManager_1.default.instance.next();
    };
    var InputManager_1;
    InputManager = InputManager_1 = __decorate([
        ccclass
    ], InputManager);
    return InputManager;
}(ManagerInterface_1.default));
exports.default = InputManager;

cc._RF.pop();