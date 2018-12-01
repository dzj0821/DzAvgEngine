import CommandParserInterface from "./CommandParserInterface";
import DialogWindowManager from "../DialogWindowManager";
import ManagerInterface from "../ManagerInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogCommandParser extends CommandParserInterface {

    start () {
        ManagerInterface.managersIsExist([DialogWindowManager]);
    }

    parse(jsonMessage) {
        DialogWindowManager.instance.setMainText(jsonMessage.Text);
    }

}
