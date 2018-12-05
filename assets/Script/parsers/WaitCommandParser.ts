import CommandParserInterface from "./CommandParserInterface";
import VarManager from "../VarManager";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";
import SpriteManager from "../SpriteManager";
import AnimationManager from "../AnimationManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WaitCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "Wait":
                ContentManager.instance.status = ContentStatus.Stop;
                if(this.isExistNull([jsonMessage.Arg1]) || (!this.isExistNull([jsonMessage.Arg1]) && typeof(jsonMessage.Arg1) != "number")){
                    cc.error("Wait命令的Arg1应为等待的时间（以秒为单位）");
                    return;
                }
                this.scheduleOnce(function() {
                    ContentManager.instance.status = ContentStatus.ReadNext;
                    ContentManager.instance.next();
                }, jsonMessage.Arg1);

                break;
            default:
                break;
        }
    }

}
