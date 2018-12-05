import CommandParserInterface from "../CommandParserInterface";
import VarManager from "../../VarManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StringVarCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        if(!this.isExistNull([jsonMessage.Arg3]) && typeof(jsonMessage.Arg3) != "string"){
            cc.error("Var命令声明的String变量的Arg3必须为字符串类型，应为变量的初始值，留空为空字符串");
            return;
        }
        let value = "";
        if(!this.isExistNull([jsonMessage.Arg3])){
            value = jsonMessage.Arg3;
        }
        VarManager.instance.setVar(jsonMessage.Arg2, value);
    }
}
