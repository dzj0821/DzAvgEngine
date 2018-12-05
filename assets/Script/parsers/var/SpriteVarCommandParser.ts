import CommandParserInterface from "../CommandParserInterface";
import ManagerInterface from "../../ManagerInterface";
import VarManager from "../../VarManager";
import ResourceManager from "../../ResourceManager";
import SpriteManager from "../../SpriteManager";
import ContentManager from "../../ContentManager";
import ContentStatus from "../../enum/ContentStatus";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberVarCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([VarManager, ResourceManager]);
    }

    parse(jsonMessage) {
        if(this.isExistNull([jsonMessage.Arg3, jsonMessage.Arg4, jsonMessage.Arg5]) 
        ||typeof(jsonMessage.Arg3) != "string" || typeof(jsonMessage.Arg4) != "number" || typeof(jsonMessage.Arg5) != "number"){
            cc.error("Var命令声明的Sprite变量的Arg3必须为图片路径，Arg4和Arg5分别为图片坐标");
            return;
        }
        SpriteManager.instance.createSprite(jsonMessage.Arg2, jsonMessage.Arg3, jsonMessage.Arg4, jsonMessage.Arg5);
        ContentManager.instance.status = ContentStatus.ReadNext;
    }
}
