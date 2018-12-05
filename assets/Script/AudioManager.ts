import ManagerInterface from "./ManagerInterface";
import ContentStatus from "./enum/ContentStatus";
import ContentManager from "./ContentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends ManagerInterface {

    static instance : AudioManager = null;

    onLoad(){
        AudioManager.instance = this;
    }

    playSe(audioSource: cc.AudioClip){
        cc.log("播放音效");
        cc.audioEngine.play(audioSource, false, 1);
    }
}
