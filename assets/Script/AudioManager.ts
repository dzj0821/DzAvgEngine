import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends ManagerInterface {

    static instance : AudioManager = null;

    private bgmID: number  = 0;

    onLoad(){
        AudioManager.instance = this;
    }

    playSe(audioSource: cc.AudioClip){
        cc.log("播放音效");
        cc.audioEngine.play(audioSource, false, 1);
    }

    playBGM(audioSource: cc.AudioClip){
        this.bgmID = cc.audioEngine.play(audioSource, false, 1);
    }

    stopBGM(){
         cc.audioEngine.stop(this.bgmID);
    }
}
