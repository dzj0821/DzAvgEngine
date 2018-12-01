"use strict";
cc._RF.push(module, 'b64ac0bXHxNzbviP1TQIHkV', 'SelectCommandParser');
// Script/parsers/SelectCommandParser.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CommandParserInterface_1 = require("./CommandParserInterface");
var SelectManager_1 = require("../SelectManager");
var ManagerInterface_1 = require("../ManagerInterface");
var ContentManager_1 = require("../ContentManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectCommandParser = /** @class */ (function (_super) {
    __extends(SelectCommandParser, _super);
    function SelectCommandParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selecting = false;
        _this.selectVarName = "";
        _this.selects = [];
        return _this;
    }
    SelectCommandParser.prototype.start = function () {
        ManagerInterface_1.default.managersIsExist([SelectManager_1.default, ContentManager_1.default]);
    };
    SelectCommandParser.prototype.parse = function (jsonMessage) {
        switch (jsonMessage.Command) {
            case "SelectStart":
                if (typeof (jsonMessage.Arg1) == "undefined" || jsonMessage.Arg1 == "") {
                    cc.error("SelectStart命令应设置Arg1一个变量名用来存储玩家选择的选项");
                    return;
                }
                if (this.selecting) {
                    cc.error("SelectStart已经执行过，是否上个Select忘记执行SelectEnd？");
                    return;
                }
                this.selecting = true;
                this.selectVarName = jsonMessage.Arg1;
                break;
            case "Select":
                if (this.isNull(jsonMessage.Arg1)) {
                    cc.error("SelectStart命令应设置Arg1一个变量名用来存储玩家选择的选项");
                    return;
                }
                if (this.isNull(jsonMessage.Text)) {
                    cc.error("SelectStart命令应设置Text作为选项显示的文本");
                    return;
                }
                var value = Number(jsonMessage.Arg1);
                if (value == NaN || value % 1 !== 0 || !this.isNull(this.selects[value])) {
                    cc.error("参数不合法：Select的Arg1应该是所有选项中的一个唯一的整数");
                    return;
                }
                if (!this.selecting) {
                    cc.error("尚未执行SelectStart命令");
                    return;
                }
                cc.log(typeof jsonMessage.Arg1);
                this.selects[value] = jsonMessage.Text;
                break;
            case "SelectEnd":
                this.selecting = false;
                SelectManager_1.default.instance.showSelects(this.selectVarName, this.selects);
                return;
        }
        ContentManager_1.default.instance.next();
    };
    SelectCommandParser.prototype.isNull = function (value) {
        return typeof (value) == "undefined" || value === null || value == "";
    };
    __decorate([
        property({
            visible: false,
        })
    ], SelectCommandParser.prototype, "selecting", void 0);
    SelectCommandParser = __decorate([
        ccclass
    ], SelectCommandParser);
    return SelectCommandParser;
}(CommandParserInterface_1.default));
exports.default = SelectCommandParser;

cc._RF.pop();