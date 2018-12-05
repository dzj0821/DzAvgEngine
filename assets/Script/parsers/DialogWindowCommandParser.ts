import CommandParserInterface from "./CommandParserInterface";
import DialogWindowManager from "../DialogWindowManager";
import ManagerInterface from "../ManagerInterface";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogWindowCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([DialogWindowManager]);
    }

    parse(jsonMessage) {
        let dialogWindowManager = DialogWindowManager.instance;
        switch(jsonMessage.Command){
            case "Dialog Window":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(jsonMessage.Arg1 === "Show"){
                    dialogWindowManager.setVisible(true);
                    ContentManager.instance.status = ContentStatus.ReadNext;
                } else if(jsonMessage.Arg1 === "Hide"){
                    dialogWindowManager.setVisible(false);
                } else {
                    cc.error("未知的参数：" + jsonMessage.Arg1);
                    return;
                }
                break;
            default:
                return;
        }
    }

}
