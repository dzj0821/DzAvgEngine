import VarManager from "./VarManager";
import SelectManager from "./SelectManager";
import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

/**
 * 绑定在默认选项按钮下
 */
@ccclass
export default class SelectButton extends cc.Component {

    @property({
        visible: false,
    })
    varName: string = "";

    @property({
        visible: false,
    })
    value: number = 0;

    @property(cc.Label)
    textLabel: cc.Label = null;
    
    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_END, function(event: cc.Event){
            VarManager.instance.setVar(event.currentTarget.getComponent(SelectButton).varName, event.currentTarget.getComponent(SelectButton).value);
            SelectManager.instance.endSelects();
        });
    }

    start(){
        ManagerInterface.managersIsExist([VarManager, SelectManager]);
    }
}
