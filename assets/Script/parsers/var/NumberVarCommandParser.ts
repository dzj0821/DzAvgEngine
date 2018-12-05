import CommandParserInterface from "../CommandParserInterface";
import VarManager from "../../VarManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberVarCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        if(!this.isExistNull([jsonMessage.Arg3]) && typeof(jsonMessage.Arg3) != "number"){
            cc.error("Var命令声明的Number变量的Arg3必须为数字");
            return;
        }
        let value = 0;
        if(!this.isExistNull([jsonMessage.Arg3])){
            value = jsonMessage.Arg3;
        }
        VarManager.instance.setVar(jsonMessage.Arg2, value);
    }
}
