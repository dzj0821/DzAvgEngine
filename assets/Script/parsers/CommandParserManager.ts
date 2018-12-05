import CommandParserInterface from "./CommandParserInterface";
import ManagerInterface from "../ManagerInterface";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CommandParserManager extends ManagerInterface {

    static instance : CommandParserManager = null;

    @property([cc.Node])
    parserNodes: cc.Node[] = [];

    @property({
        visible: false,
    })
    commandParsers: CommandParserInterface[] = [];


    onLoad () {
        CommandParserManager.instance = this;
        this.commandParsers = new Array<CommandParserInterface>();

        this.parserNodes.forEach(node => {
            let commandParser = node.getComponent(node.name);
            if(commandParser == null){
                cc.error("未找到和Node name对应的脚本，Parser脚本所在的Node必须与脚本同名");
                return;
            }
            if(!(commandParser instanceof CommandParserInterface)){
                cc.error("Parser必须继承自CommandParserInterface：" + node.name);
                return;
            }
            commandParser.needParseCommand.forEach(element => {
                if(typeof(this.commandParsers[element]) != "undefined"){
                    cc.error(node.name + "存在已被注册的Command，之前注册的内容将被覆盖");
                }
                this.commandParsers[element] = commandParser;
            });
            
        });
    }

    parse (jsonMessage){
        if(typeof(this.commandParsers[jsonMessage.Command]) == "undefined"){
            cc.error("无法识别的指令：" + jsonMessage.Command + "，需要有对应的Parser解析指令");
            return;
        }
        this.commandParsers[jsonMessage.Command].parse(jsonMessage);
    }
}
