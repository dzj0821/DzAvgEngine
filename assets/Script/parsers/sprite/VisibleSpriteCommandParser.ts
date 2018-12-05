import CommandParserInterface from "../CommandParserInterface";
import ManagerInterface from "../../ManagerInterface";
import VarManager from "../../VarManager";
import SpriteManager from "../../SpriteManager";
import ContentManager from "../../ContentManager";
import ContentStatus from "../../enum/ContentStatus";


const {ccclass, property} = cc._decorator;

@ccclass
export default class VisibleSpriteCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([VarManager]);
    }

    parse(jsonMessage) {
        if(!this.isExistNull([jsonMessage.Arg3]) && typeof(jsonMessage.Arg3) != "boolean"){
            cc.error("Sprite命令的子命令Visible的Arg3必须为True或False");
            return;
        }
        SpriteManager.instance.setVisible(jsonMessage.Arg1, jsonMessage.Arg3);
        ContentManager.instance.status = ContentStatus.ReadNext;
    }
}
