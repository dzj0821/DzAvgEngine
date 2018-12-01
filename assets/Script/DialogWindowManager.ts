import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogWindowManager extends ManagerInterface {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.Sprite)
    characterImage: cc.Sprite = null;

    @property(cc.Sprite)
    characterName: cc.Sprite = null;

    @property(cc.RichText)
    mainText: cc.RichText = null;

    onLoad () {
        DialogWindowManager.instance = this;
    }

    setMainText (text) {
        this.mainText.string = text;
    }
}
