import CommandParserInterface from "./CommandParserInterface";
import VarManager from "../VarManager";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";
import SpriteManager from "../SpriteManager";
import AnimationManager from "../AnimationManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayAnimationCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "PlayAnimation":
                ContentManager.instance.status = ContentStatus.Stop;
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Arg2, jsonMessage.Arg3]) 
                || typeof(jsonMessage.Arg1) != "string" 
                || typeof(jsonMessage.Arg2) != "string" 
                || typeof(jsonMessage.Arg3) != "number"){
                    cc.error("PlayAnimation命令的第一个参数应为需要播放动画的变量名，第二个参数应为需要播放动画的名称，第三个动画应为需要播放动画的时间（以秒为单位）");
                    return;
                }
                
                let sprite = VarManager.instance.getVar(jsonMessage.Arg1);
                if(!(sprite instanceof cc.Sprite)){
                    cc.error("需要播放动画的变量不是Sprite类型：" + jsonMessage.Arg1);
                    return;
                }
                if(sprite.node.active === false){
                    SpriteManager.instance.setVisible(jsonMessage.Arg1, true);
                }
                AnimationManager.instance.playAnimation(sprite.node, jsonMessage.Arg2, jsonMessage.Arg3);

                break;
            default:
                break;
        }
    }

}
