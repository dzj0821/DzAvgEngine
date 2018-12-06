import CommandParserInterface from "./CommandParserInterface";
import ResourceManager from "../ResourceManager";
import AudioManager from "../AudioManager";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BGMCommandParser extends CommandParserInterface {

    parse(jsonMessage) {
        ContentManager.instance.status = ContentStatus.ReadNext;
        switch(jsonMessage.Command){
            case "PlayBGM":
                if(this.isExistNull([jsonMessage.Arg1]) || typeof(jsonMessage.Arg1) != "string"){
                        cc.error("音效应为声音文件路径");
                        return;
                }
                ResourceManager.instance.loadAudioSource(jsonMessage.Arg1, function(audioSource: cc.AudioClip){
                        AudioManager.instance.playBGM(audioSource);
                    });
                break;
            case "StopBGM":
                    AudioManager.instance.stopBGM();
                break;
            default:
                return;
        }
    }

}
