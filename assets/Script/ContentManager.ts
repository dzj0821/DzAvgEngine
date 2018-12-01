import ManagerInterface from "./ManagerInterface";
import CommandParserManager from "./parsers/CommandParserManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ContentManager extends ManagerInterface {

    @property(cc.JsonAsset)
    jsonContent: cc.JsonAsset = null;

    @property({
        visible: false,
    })
    line: number = 0;

    onLoad(){
        ContentManager.instance = this;
    }

    start(){
        ManagerInterface.managersIsExist([CommandParserManager]);

        this.next();
    }

    next () {
        if(this.jsonContent.json.length == this.line){
            //TODO 结束
            return;
        }
        CommandParserManager.instance.parse(this.jsonContent.json[this.line++]);
    }
}
