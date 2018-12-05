import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResourceManager extends ManagerInterface {

    static instance : ResourceManager = null;

    onLoad(){
        ResourceManager.instance = this;
    }

    loadSpriteFrame(path: string, sprite: cc.Sprite){
        cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
            if(err){
                cc.error("加载SpriteFrame失败，" + err.message);
                return;
            }
            sprite.spriteFrame = spriteFrame;
        });
    }

    loadAudioSource(path: string, loadEndedCallback: Function){
        cc.loader.load(cc.url.raw("resources/" + path), function(err, result){
            if(err){
                cc.error("加载音频失败：" + err);
                return;
            }
            cc.log(result);
            loadEndedCallback(result);
        });
    }
}
