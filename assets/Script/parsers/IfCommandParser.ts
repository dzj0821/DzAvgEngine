import CommandParserInterface from "./CommandParserInterface";
import ManagerInterface from "../ManagerInterface";
import ContentManager from "../ContentManager";
import VarManager from "../VarManager";
import ContentStatus from "../enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IfCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([]);
    }

    parse(jsonMessage) {
        let contentManager = ContentManager.instance;
        switch(jsonMessage.Command){
            case "If":
                contentManager.status = ContentStatus.ReadNext;
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Arg2, jsonMessage.Arg3])){
                    cc.error("If命令应该包含3个参数：Arg1为表达式的左值， Arg2为判断表达式运算符, Arg3为表达式的右值");
                    return;
                }
                //执行表达式，如果为false跳过到End If
                let result = VarManager.instance.eval(jsonMessage.Arg1, jsonMessage.Arg2, jsonMessage.Arg3);
                cc.log(jsonMessage.Arg1 + jsonMessage.Arg2 + jsonMessage.Arg3 + "表达式的值为：" + result);
                if(!result){
                    //需要跳过多少个if，防止嵌套if只跳过了第一个end if
                    let ifs = 1;
                    while(ifs != 0){
                        let command = contentManager.jsonContent.json[contentManager.line].Command;
                        if(command === "End If"){
                            ifs--;
                        }
                        if(command === "If"){
                            ifs++;
                        }
                        contentManager.line++;
                        if(contentManager.jsonContent.json.length == contentManager.line){
                            cc.error("在If之后未找到End If");
                            return;
                        }
                    }
                }
                break;
            case "End If":
                contentManager.status = ContentStatus.ReadNext;
                break;
            default:
                break;
        }
    }

}
