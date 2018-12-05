import CommandParserInterface from "./CommandParserInterface";
import SelectManager from "../SelectManager";
import ManagerInterface from "../ManagerInterface";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectCommandParser extends CommandParserInterface {

    @property({
        visible: false,
    })
    selecting: boolean = false;

    @property({
        visible: false,
    })
    selectVarName: string = "";

    @property({
        visible: false,
    })
    selects: string[] = [];

    start () {
        ManagerInterface.managersIsExist([SelectManager, ContentManager]);
    }

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "SelectStart":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(typeof(jsonMessage.Arg1) == "undefined" || jsonMessage.Arg1 == ""){
                    cc.error("SelectStart命令应设置Arg1一个变量名用来存储玩家选择的选项");
                    return;
                }
                if(this.selecting){
                    cc.error("SelectStart已经执行过，是否上个Select忘记执行SelectEnd？");
                    return;
                }
                this.selecting = true;
                this.selectVarName = jsonMessage.Arg1;
                break;
            case "Select":
                ContentManager.instance.status = ContentStatus.ReadNext;
                if(this.isExistNull([jsonMessage.Arg1, jsonMessage.Text])){
                    cc.error("SelectStart命令应设置Arg1一个变量名用来存储玩家选择的选项，Text作为选项显示的文本");
                    return;
                }
                let value = Number(jsonMessage.Arg1);
                if(value == NaN || value % 1 !== 0 || !this.isExistNull([this.selects[value]])){
                    cc.error("参数不合法：Select的Arg1应该是所有选项中的一个唯一的整数");
                    return;
                }
                if(!this.selecting){
                    cc.error("尚未执行SelectStart命令");
                    return;
                }
                this.selects[value] = jsonMessage.Text;
                break;
            case "SelectEnd":
                ContentManager.instance.status = ContentStatus.Select;
                SelectManager.instance.showSelects(this.selectVarName, this.selects);
                this.selecting = false;
                this.selects = [];
                return;
            default:
                cc.error("未知指令：" + jsonMessage.Command);
                break;
        }
    }

}
