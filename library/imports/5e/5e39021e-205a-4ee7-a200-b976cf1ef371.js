"use strict";
cc._RF.push(module, '5e390IeIFpO56IAuXbPHvNx', 'DialogWindowManager');
// Script/DialogWindowManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var ResourceManager_1 = require("./ResourceManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogWindowManager = /** @class */ (function (_super) {
    __extends(DialogWindowManager, _super);
    function DialogWindowManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialogWindow = null;
        _this.background = null;
        _this.characterImage = null;
        _this.characterNameImage = null;
        _this.characterName = null;
        _this.mainText = null;
        _this.defaultBackgroundImageSpriteFrame = null;
        _this.defaultCharacterImageSpriteFrame = null;
        _this.defaultCharacterNameImageSpriteFrame = null;
        return _this;
    }
    DialogWindowManager_1 = DialogWindowManager;
    DialogWindowManager.prototype.onLoad = function () {
        DialogWindowManager_1.instance = this;
        this.defaultBackgroundImageSpriteFrame = this.background.spriteFrame;
        this.defaultCharacterImageSpriteFrame = this.characterImage.spriteFrame;
        this.defaultCharacterNameImageSpriteFrame = this.characterNameImage.spriteFrame;
    };
    DialogWindowManager.prototype.setMainText = function (text) {
        this.mainText.string = text;
    };
    DialogWindowManager.prototype.setCharacterImage = function (path) {
        if (path === null) {
            this.characterImage.spriteFrame = this.defaultCharacterImageSpriteFrame;
        }
        else {
            cc.log("load:" + path);
            ResourceManager_1.default.instance.loadSpriteFrame(path, this.characterImage);
        }
    };
    DialogWindowManager.prototype.setCharacterNameImage = function (path) {
        if (path === null) {
            this.characterNameImage.spriteFrame = this.defaultCharacterNameImageSpriteFrame;
        }
        else {
            ResourceManager_1.default.instance.loadSpriteFrame(path, this.characterNameImage);
        }
    };
    DialogWindowManager.prototype.setCharacterName = function (name) {
        this.characterName.string = name;
    };
    DialogWindowManager.prototype.setBackGroundImage = function (path) {
        if (path === null) {
            this.background.spriteFrame = this.defaultBackgroundImageSpriteFrame;
        }
        else {
            ResourceManager_1.default.instance.loadSpriteFrame(path, this.background);
        }
    };
    DialogWindowManager.prototype.setVisible = function (value) {
        cc.log("设置对话栏是否开启：" + value);
        this.dialogWindow.active = value;
    };
    var DialogWindowManager_1;
    DialogWindowManager.instance = null;
    __decorate([
        property(cc.Node)
    ], DialogWindowManager.prototype, "dialogWindow", void 0);
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "background", void 0);
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "characterImage", void 0);
    __decorate([
        property(cc.Sprite)
    ], DialogWindowManager.prototype, "characterNameImage", void 0);
    __decorate([
        property(cc.Label)
    ], DialogWindowManager.prototype, "characterName", void 0);
    __decorate([
        property(cc.RichText)
    ], DialogWindowManager.prototype, "mainText", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], DialogWindowManager.prototype, "defaultBackgroundImageSpriteFrame", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], DialogWindowManager.prototype, "defaultCharacterImageSpriteFrame", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], DialogWindowManager.prototype, "defaultCharacterNameImageSpriteFrame", void 0);
    DialogWindowManager = DialogWindowManager_1 = __decorate([
        ccclass
    ], DialogWindowManager);
    return DialogWindowManager;
}(ManagerInterface_1.default));
exports.default = DialogWindowManager;

cc._RF.pop();