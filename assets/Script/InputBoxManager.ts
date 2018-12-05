import ManagerInterface from "./ManagerInterface";
import InputBox from "./vo/InputBox";
import ContentManager from "./ContentManager";
import ContentStatus from "./enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputBoxManager extends ManagerInterface {

    static instance : InputBoxManager = null;

    @property(cc.Node)
    defaultInputBox : cc.Node = null;

    onLoad(){
        InputBoxManager.instance = this;
    }

    showInputBox(title: string, varName: string){
        this.defaultInputBox.getComponent(InputBox).init(title, varName);
        this.defaultInputBox.active = true;
    }

    endInput(){
        this.defaultInputBox.active = false;
        ContentManager.instance.status = ContentStatus.ReadNext;
        ContentManager.instance.next();
    }
    
}
