import CommandParserInterface from "./CommandParserInterface";
import DialogWindowManager from "../DialogWindowManager";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";
import VarManager from "../VarManager";
import CharacterStatus from "../vo/CharacterStatus";
import TextFormatManager from "../TextFormatManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FormatCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "Format":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(jsonMessage.Arg1 === "Set"){
                    if(this.isExistNull([jsonMessage.Arg2, jsonMessage.Arg3]) 
                    || typeof(jsonMessage.Arg2) != "string" || typeof(jsonMessage.Arg3) != "string"){
                        cc.error("Format命令的子命令Set的Arg2和Arg3必须为string类型，分别为格式化的标识字符串和对应的变量名");
                    }
                    TextFormatManager.instance.setFormatParam(jsonMessage.Arg2, jsonMessage.Arg3);
                }
                break;
            default:
                return;
        }
    }

}
