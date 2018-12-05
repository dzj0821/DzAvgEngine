import ManagerInterface from "./ManagerInterface";
import CommandParserManager from "./parsers/CommandParserManager";
import ContentStatus from "./enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ContentManager extends ManagerInterface {

    static instance : ContentManager = null;

    @property(cc.JsonAsset)
    jsonContent: cc.JsonAsset = null;

    @property({
        visible: false,
    })
    line: number = 0;

    @property({
        visible: false,
    })
    status: number = ContentStatus.Wait;

    onLoad(){
        ContentManager.instance = this;
    }

    start(){
        this.next();
    }

    next () {
        do{
            if(this.jsonContent.json.length == this.line){
                cc.log("脚本结束");
                this.status = ContentStatus.Stop;
                //TODO 结束
                return;
            }
            if(this.status == ContentStatus.Select || this.status == ContentStatus.Stop){
                break;
            }
            CommandParserManager.instance.parse(this.jsonContent.json[this.line++]);
            
            if(this.status == ContentStatus.Wait){
                break;
            }
        }while(true);
    }
}
