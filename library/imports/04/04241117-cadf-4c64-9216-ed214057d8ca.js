"use strict";
cc._RF.push(module, '04241EXyt9MZJIW7SFAV9jK', 'CommandParserInterface');
// Script/parsers/CommandParserInterface.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CommandParserInterface = /** @class */ (function (_super) {
    __extends(CommandParserInterface, _super);
    function CommandParserInterface() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needParseCommand = [];
        return _this;
    }
    CommandParserInterface.prototype.isExistNull = function (value) {
        for (var i = 0; i < value.length; i++) {
            var element = value[i];
            if (typeof (element) == "undefined" || element === null || element === "") {
                return true;
            }
        }
        return false;
    };
    __decorate([
        property([cc.String])
    ], CommandParserInterface.prototype, "needParseCommand", void 0);
    CommandParserInterface = __decorate([
        ccclass
    ], CommandParserInterface);
    return CommandParserInterface;
}(cc.Component));
exports.default = CommandParserInterface;

cc._RF.pop();