"use strict";
cc._RF.push(module, '6b48aAErgpBsJM/baABZH5r', 'DialogCommandParser');
// Script/parsers/DialogCommandParser.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CommandParserInterface_1 = require("./CommandParserInterface");
var DialogWindowManager_1 = require("../DialogWindowManager");
var ManagerInterface_1 = require("../ManagerInterface");
var ContentManager_1 = require("../ContentManager");
var ContentStatus_1 = require("../enum/ContentStatus");
var VarManager_1 = require("../VarManager");
var CharacterStatus_1 = require("../vo/CharacterStatus");
var TextFormatManager_1 = require("../TextFormatManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogCommandParser = /** @class */ (function (_super) {
    __extends(DialogCommandParser, _super);
    function DialogCommandParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogCommandParser.prototype.start = function () {
        ManagerInterface_1.default.managersIsExist([DialogWindowManager_1.default]);
    };
    DialogCommandParser.prototype.parse = function (jsonMessage) {
        var dialogWindowManager = DialogWindowManager_1.default.instance;
        switch (jsonMessage.Command) {
            case "":
                ContentManager_1.default.instance.status = ContentStatus_1.default.Wait;
                if (!this.isExistNull([jsonMessage.Arg1])) {
                    if (typeof (jsonMessage.Arg1) != "string") {
                        cc.error("如果对话需要参数，则应传入一个类型为CharacterStatus的变量名");
                        return;
                    }
                    var characterStatus = VarManager_1.default.instance.getVar(jsonMessage.Arg1);
                    if (!(characterStatus instanceof CharacterStatus_1.default)) {
                        cc.error("变量类型必须是CharacterStatus");
                        return;
                    }
                    DialogWindowManager_1.default.instance.setCharacterName(characterStatus.characterName);
                    DialogWindowManager_1.default.instance.setCharacterNameImage(characterStatus.characterNameImagePath);
                    DialogWindowManager_1.default.instance.setCharacterImage(characterStatus.characterImagePath);
                }
                jsonMessage.Text = jsonMessage.Text.toString();
                var formatedText = TextFormatManager_1.default.instance.format(jsonMessage.Text);
                dialogWindowManager.setMainText(formatedText);
                break;
            default:
                return;
        }
    };
    DialogCommandParser = __decorate([
        ccclass
    ], DialogCommandParser);
    return DialogCommandParser;
}(CommandParserInterface_1.default));
exports.default = DialogCommandParser;

cc._RF.pop();