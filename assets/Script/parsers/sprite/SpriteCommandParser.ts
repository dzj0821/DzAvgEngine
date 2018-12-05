import CommandParserInterface from "./../CommandParserInterface";
import ManagerInterface from "../../ManagerInterface";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteCommandParser extends CommandParserInterface {

    @property([cc.Node])
    parserNodes: cc.Node[] = [];

    @property({
        visible: false,
    })
    spriteCommandParsers: CommandParserInterface[] = [];

    onLoad(){
        this.spriteCommandParsers = new Array<CommandParserInterface>();

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
                if(typeof(this.spriteCommandParsers[element]) != "undefined"){
                    cc.error(node.name + "存在已被注册的Command，之前注册的内容将被覆盖");
                }
                this.spriteCommandParsers[element] = commandParser;
            });
            
        });
    }

    start () {
        ManagerInterface.managersIsExist([]);
    }

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "Sprite":
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Arg2]) 
                || typeof(jsonMessage.Arg1) != "string" || typeof(jsonMessage.Arg2) != "string"){
                    cc.error("Sprite命令的Arg1需为一个Sprite变量名，Arg2需为一个子命令名称");
                    return;
                }
                if(typeof(this.spriteCommandParsers[jsonMessage.Arg2]) == "undefined"){
                    cc.error("无法识别的指令：" + jsonMessage.Arg2 + "，需要有对应的Parser解析指令");
                    return;
                }
                this.spriteCommandParsers[jsonMessage.Arg2].parse(jsonMessage);
                break;
            default:
                break;
        }
    }

}
