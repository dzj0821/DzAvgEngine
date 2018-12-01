import CommandParserInterface from "./CommandParserInterface";
import SelectManager from "../SelectManager";
import ManagerInterface from "../ManagerInterface";
import ContentManager from "../ContentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectCommandParser extends CommandParserInterface {

    @property({
        visible: false,
    })
    selecting: boolean = false;

    selectVarName: string = "";

    selects: string[] = [];

    start () {
        ManagerInterface.managersIsExist([SelectManager, ContentManager]);
    }

    parse(jsonMessage) {
        switch(jsonMessage.Command){
            case "SelectStart":
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
                if(this.isNull(jsonMessage.Arg1)){
                    cc.error("SelectStart命令应设置Arg1一个变量名用来存储玩家选择的选项");
                    return;
                }
                if(this.isNull(jsonMessage.Text)){
                    cc.error("SelectStart命令应设置Text作为选项显示的文本");
                    return;
                }
                let value = Number(jsonMessage.Arg1);
                if(value == NaN || value % 1 !== 0 || !this.isNull(this.selects[value])){
                    cc.error("参数不合法：Select的Arg1应该是所有选项中的一个唯一的整数");
                    return;
                }
                if(!this.selecting){
                    cc.error("尚未执行SelectStart命令");
                    return;
                }
                cc.log(typeof jsonMessage.Arg1);
                this.selects[value] = jsonMessage.Text;
                break;
            case "SelectEnd":
                this.selecting = false;
                SelectManager.instance.showSelects(this.selectVarName, this.selects);
                return;
        }
        ContentManager.instance.next();
    }

    isNull(value): boolean{
        return typeof(value) == "undefined" || value === null || value == "";
    }

}
