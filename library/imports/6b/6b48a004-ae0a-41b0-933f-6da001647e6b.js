"use strict";
cc._RF.push(module, '6b48aAErgpBsJM/baABZH5r', 'DialogCommandParser');
// Script/parsers/DialogCommandParser.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CommandParserInterface_1 = require("./CommandParserInterface");
var DialogWindowManager_1 = require("../DialogWindowManager");
var ManagerInterface_1 = require("../ManagerInterface");
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
        DialogWindowManager_1.default.instance.setMainText(jsonMessage.Text);
    };
    DialogCommandParser = __decorate([
        ccclass
    ], DialogCommandParser);
    return DialogCommandParser;
}(CommandParserInterface_1.default));
exports.default = DialogCommandParser;

cc._RF.pop();