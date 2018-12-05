import ManagerInterface from "./ManagerInterface";
import VarManager from "./VarManager";
import ResourceManager from "./ResourceManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteManager extends ManagerInterface {

    static instance : SpriteManager = null;

    onLoad(){
        SpriteManager.instance = this;
    }

    createSprite(name: string, path: string, posx: number, posy: number){
        if(VarManager.instance.isExistVar(name)){
            cc.error("变量名已被定义过：" + name);
            return;
        }
        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        ResourceManager.instance.loadSpriteFrame(path, sprite);
        this.node.addChild(node);
        node.active = false;
        node.setPosition(posx, posy);
        VarManager.instance.setVar(name, sprite);
    }

    setVisible(spriteName: string, value: boolean){
        let sprite = VarManager.instance.getVar(spriteName);
        if(!(sprite instanceof cc.Sprite)){
            cc.error("变量不是Sprite类型：" + spriteName);
            return;
        }
        sprite.node.active = value;
    }

}
