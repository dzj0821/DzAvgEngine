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
}
