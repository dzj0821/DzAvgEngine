"use strict";
cc._RF.push(module, '5e390IeIFpO56IAuXbPHvNx', 'DialogWindowManager');
// Script/DialogWindowManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogWindowManager = /** @class */ (function (_super) {
    __extends(DialogWindowManager, _super);
    function DialogWindowManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.characterImage = null;
        _this.characterName = null;
        _this.mainText = null;
        return _this;
    }
    DialogWindowManager_1 = DialogWindowManager;
    DialogWindowManager.prototype.onLoad = function () {
        DialogWindowManager_1.instance = this;
    };
    DialogWindowManager.prototype.setMainText = function (text) {
        this.mainText.string = text;
    };
    var DialogWindowManager_1;
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "background", void 0);
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "characterImage", void 0);
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "characterName", void 0);
    __decorate([
        property(cc.RichText)
    ], DialogWindowManager.prototype, "mainText", void 0);
    DialogWindowManager = DialogWindowManager_1 = __decorate([
        ccclass
    ], DialogWindowManager);
    return DialogWindowManager;
}(ManagerInterface_1.default));
exports.default = DialogWindowManager;

cc._RF.pop();