import ManagerInterface from "./ManagerInterface";
import ContentManager from "./ContentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends ManagerInterface {

    onLoad(){
        InputManager.instance = this;
    }

    onTouchEnd() {
        ContentManager.instance.next();
    }
    
}
