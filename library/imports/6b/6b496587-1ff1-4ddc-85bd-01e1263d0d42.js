"use strict";
cc._RF.push(module, '6b496WHH/FN3IW9AeEmPQ1C', 'ContentManager');
// Script/ContentManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerInterface_1 = require("./ManagerInterface");
var CommandParserManager_1 = require("./parsers/CommandParserManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ContentManager = /** @class */ (function (_super) {
    __extends(ContentManager, _super);
    function ContentManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonContent = null;
        _this.line = 0;
        return _this;
    }
    ContentManager_1 = ContentManager;
    ContentManager.prototype.onLoad = function () {
        ContentManager_1.instance = this;
    };
    ContentManager.prototype.start = function () {
        ManagerInterface_1.default.managersIsExist([CommandParserManager_1.default]);
        this.next();
    };
    ContentManager.prototype.next = function () {
        if (this.jsonContent.json.length == this.line) {
            //TODO 结束
            return;
        }
        CommandParserManager_1.default.instance.parse(this.jsonContent.json[this.line++]);
    };
    var ContentManager_1;
    __decorate([
        property(cc.JsonAsset)
    ], ContentManager.prototype, "jsonContent", void 0);
    __decorate([
        property({
            visible: false,
        })
    ], ContentManager.prototype, "line", void 0);
    ContentManager = ContentManager_1 = __decorate([
        ccclass
    ], ContentManager);
    return ContentManager;
}(ManagerInterface_1.default));
exports.default = ContentManager;

cc._RF.pop();