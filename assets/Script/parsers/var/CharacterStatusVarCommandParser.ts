import CommandParserInterface from "../CommandParserInterface";
import ManagerInterface from "../../ManagerInterface";
import VarManager from "../../VarManager";
import CharacterStatus from "../../vo/CharacterStatus";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CharacterStatusVarCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([VarManager]);
    }

    parse(jsonMessage) {
        if((!this.isExistNull([jsonMessage.Arg3]) && typeof(jsonMessage.Arg3) != "string") 
        || (!this.isExistNull([jsonMessage.Arg4]) && typeof(jsonMessage.Arg4) != "string") 
        || (!this.isExistNull([jsonMessage.Arg5]) && typeof(jsonMessage.Arg5) != "string")){
            cc.error("Var命令声明的CharacterStatus变量的Arg3、Arg4、Arg5应为字符串，分别为角色名字，角色名字背景图路径，角色头像路径");
            return;
        }
        let characterName = jsonMessage.Arg3;
        let characterNameImagePath = null;
        if(!this.isExistNull([jsonMessage.Arg4])){
            characterNameImagePath = jsonMessage.Arg4;
        }
        let characterImagePath = null;
        if(!this.isExistNull([jsonMessage.Arg5])){
            characterImagePath = jsonMessage.Arg5;
        }
        let characterStatus = new CharacterStatus(characterName, characterNameImagePath, characterImagePath);
        VarManager.instance.setVar(jsonMessage.Arg2, characterStatus);
    }
}
