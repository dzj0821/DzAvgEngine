"use strict";
cc._RF.push(module, '5c632nd/t9Hh57rYo0hUo6X', 'CommandParserManager');
// Script/parsers/CommandParserManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CommandParserInterface_1 = require("./CommandParserInterface");
var ManagerInterface_1 = require("../ManagerInterface");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CommandParserManager = /** @class */ (function (_super) {
    __extends(CommandParserManager, _super);
    function CommandParserManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parserNodes = [];
        _this.commandParsers = [];
        return _this;
    }
    CommandParserManager_1 = CommandParserManager;
    CommandParserManager.prototype.onLoad = function () {
        var _this = this;
        CommandParserManager_1.instance = this;
        this.commandParsers = new Array();
        this.parserNodes.forEach(function (node) {
            var commandParser = node.getComponent(node.name);
            if (commandParser == null) {
                cc.error("未找到和Node name对应的脚本，Parser脚本所在的Node必须与脚本同名");
                return;
            }
            if (!(commandParser instanceof CommandParserInterface_1.default)) {
                cc.error("Parser必须继承自CommandParserInterface");
                return;
            }
            commandParser.needParseCommand.forEach(function (element) {
                if (typeof (_this.commandParsers[element]) != "undefined") {
                    cc.error(node.name + "存在已被注册的Command，之前注册的内容将被覆盖");
                }
                _this.commandParsers[element] = commandParser;
            });
        });
    };
    CommandParserManager.prototype.parse = function (jsonMessage) {
        if (typeof (this.commandParsers[jsonMessage.Command]) == "undefined") {
            cc.error("无法识别的指令：" + jsonMessage.Command + "，需要有对应的Parser解析指令");
            return;
        }
        this.commandParsers[jsonMessage.Command].parse(jsonMessage);
    };
    var CommandParserManager_1;
    __decorate([
        property([cc.Node])
    ], CommandParserManager.prototype, "parserNodes", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], CommandParserManager.prototype, "commandParsers", void 0);
    CommandParserManager = CommandParserManager_1 = __decorate([
        ccclass
    ], CommandParserManager);
    return CommandParserManager;
}(ManagerInterface_1.default));
exports.default = CommandParserManager;

cc._RF.pop();