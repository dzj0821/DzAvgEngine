import ManagerInterface from "./ManagerInterface";
import StatusManager from "./StatusManager";
import Status from "./enum/Status";
import ContentManager from "./ContentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends ManagerInterface {

    onLoad(){
        InputManager.instance = this;
    }

    start () {
        ManagerInterface.managersIsExist([StatusManager, ContentManager]);
    }

    onTouchEnd() {
        switch(StatusManager.instance.status){
            case Status.Play:
                ContentManager.instance.next();
                break;
            default:
                break;
        }
    }
    
}
