import ManagerInterface from "./ManagerInterface";
import ResourceManager from "./ResourceManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogWindowManager extends ManagerInterface {

    static instance : DialogWindowManager = null;

    @property(cc.Node)
    dialogWindow: cc.Node = null;

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.Sprite)
    characterImage: cc.Sprite = null;

    @property(cc.Sprite)
    characterNameImage: cc.Sprite = null;

    @property(cc.Label)
    characterName: cc.Label = null;

    @property(cc.RichText)
    mainText: cc.RichText = null;

    
    @property({
        visible: false,
    })
    defaultBackgroundImageSpriteFrame: cc.SpriteFrame = null;

    @property({
        visible: false,
    })
    defaultCharacterImageSpriteFrame: cc.SpriteFrame = null;

    @property({
        visible: false,
    })
    defaultCharacterNameImageSpriteFrame: cc.SpriteFrame = null;

    onLoad () {
        DialogWindowManager.instance = this;

        this.defaultBackgroundImageSpriteFrame = this.background.spriteFrame;
        this.defaultCharacterImageSpriteFrame = this.characterImage.spriteFrame;
        this.defaultCharacterNameImageSpriteFrame = this.characterNameImage.spriteFrame;
    }

    setMainText (text: string) {
        this.mainText.string = text;
    }

    setCharacterImage(path: string){
        if(path === null){
            this.characterImage.spriteFrame = this.defaultCharacterImageSpriteFrame;
        } else {
            cc.log("load:" + path);
            ResourceManager.instance.loadSpriteFrame(path, this.characterImage);
        }
    }

    setCharacterNameImage(path: string){
        if(path === null){
            this.characterNameImage.spriteFrame = this.defaultCharacterNameImageSpriteFrame;
        } else {
            ResourceManager.instance.loadSpriteFrame(path, this.characterNameImage);
        }
    }

    setCharacterName(name: string){
        this.characterName.string = name;
    }

    setBackGroundImage(path: string){
        if(path === null){
            this.background.spriteFrame = this.defaultBackgroundImageSpriteFrame;
        } else {
            ResourceManager.instance.loadSpriteFrame(path, this.background);
        }
    }

    setVisible(value: boolean){
        cc.log("设置对话栏是否开启：" + value);
        this.dialogWindow.active = value;
    }

    
}
