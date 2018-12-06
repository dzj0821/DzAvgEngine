import ManagerInterface from "./ManagerInterface";
import ResourceManager from "./ResourceManager";
import ContentManager from "./ContentManager";
import ContentStatus from "./enum/ContentStatus";

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

    @property({
        visible: false,
    })
    setMainTextAction: cc.Action = null;

    @property({
        visible: false,
    })
    targetMainText: string = "";

    onLoad () {
        DialogWindowManager.instance = this;

        this.defaultBackgroundImageSpriteFrame = this.background.spriteFrame;
        this.defaultCharacterImageSpriteFrame = this.characterImage.spriteFrame;
        this.defaultCharacterNameImageSpriteFrame = this.characterNameImage.spriteFrame;
    }

    setMainText (text: string) {
        //this.mainText.string = text;
        let i = 1;
        let delayTime = 0.1;
        this.targetMainText = text;
        cc.log("设置文字为" + text);
        //执行一个动作序列，先重复text.length次，每次将文本内容置为text.substring(0, i++)，随后等待delayTime秒的时间，即实现了打字机的效果
        this.setMainTextAction = cc.sequence(cc.repeat(cc.sequence(cc.callFunc(function(target, mainText: cc.RichText){
            mainText.string = text.substring(0, i++);
        }, this, this.mainText), cc.delayTime(delayTime)), text.length), cc.callFunc(function(){
            //恢复接收输入状态
            cc.log("打字机特效结束：" + text);
            ContentManager.instance.status = ContentStatus.Wait;
            this.setMainTextAction = null;
        }, this));
        cc.log(this.setMainTextAction);
        this.node.runAction(this.setMainTextAction);
    }

    shuntdownSetMainText(){
        if(this.setMainTextAction === null){
            cc.error("当前对话栏不在显示文字！");
            return;
        }
        cc.log(this.setMainTextAction);
        this.node.stopAction(this.setMainTextAction);
        this.setMainTextAction = null;
        ContentManager.instance.status = ContentStatus.Wait;

        this.mainText.string = this.targetMainText;
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
