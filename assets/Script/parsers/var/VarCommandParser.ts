import CommandParserInterface from "./../CommandParserInterface";
import ManagerInterface from "../../ManagerInterface";
import VarManager from "../../VarManager";
import ContentManager from "../../ContentManager";
import ContentStatus from "../../enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VarCommandParser extends CommandParserInterface {

    @property([cc.Node])
    parserNodes: cc.Node[] = [];

    @property({
        visible: false,
    })
    varCommandParsers: CommandParserInterface[] = [];

    onLoad(){
        this.varCommandParsers = new Array<CommandParserInterface>();

        this.parserNodes.forEach(node => {
            let commandParser = node.getComponent(node.name);
            if(commandParser == null){
                cc.error("未找到和Node name对应的脚本，Parser脚本所在的Node必须与脚本同名");
                return;
            }
            if(!(commandParser instanceof CommandParserInterface)){
                cc.error("Parser必须继承自CommandParserInterface");
                return;
            }
            commandParser.needParseCommand.forEach(element => {
                if(typeof(this.varCommandParsers[element]) != "undefined"){
                    cc.error(node.name + "存在已被注册的Command，之前注册的内容将被覆盖");
                }
                this.varCommandParsers[element] = commandParser;
            });
            
        });
    }

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "Var":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Arg2]) || typeof(jsonMessage.Arg2) != "string"){
                    cc.error("Var命令的Arg1需为定义变量的类型，Arg2为需要定义的变量名");
                    return;
                }
                if(VarManager.instance.isExistVar(jsonMessage.Arg2)){
                    cc.error("变量名已被定义过：" + jsonMessage.Arg2);
                    return;
                }
                if(typeof(this.varCommandParsers[jsonMessage.Arg1]) == "undefined"){
                    cc.error("无法识别的指令：" + jsonMessage.Arg1 + "，需要有对应的Parser解析指令");
                    return;
                }
                this.varCommandParsers[jsonMessage.Arg1].parse(jsonMessage);
                break;
            case "Compute":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Arg2, jsonMessage.Arg3, jsonMessage.Arg4])){
                    cc.error("Compute命令的Arg1应为一个已定义的变量，Arg2和Arg4应为一个常量值，Arg3应为运算符");
                    return;
                }
                let varManager = VarManager.instance;
                if(!varManager.isExistVar(jsonMessage.Arg1)){
                    cc.error("变量尚未定义：" + jsonMessage.Arg1);
                }
                let result = varManager.eval(jsonMessage.Arg2, jsonMessage.Arg3, jsonMessage.Arg4);
                varManager.setVar(jsonMessage.Arg1, result);
                break;
            default:
                break;
        }
    }

}
