import ManagerInterface from "./ManagerInterface";
import SelectButton from "./SelectButton";
import StatusManager from "./StatusManager";
import Status from "./enum/Status";
import InputManager from "./InputManager";
import ContentManager from "./ContentManager";

const {ccclass, property} = cc._decorator;

/**
 * 默认的选项按钮和动态生成的都在此节点下
 */
@ccclass
export default class SelectManager extends ManagerInterface {

    @property(cc.Node)
    defaultSelectButton: cc.Node = null;

    @property({
        visible: false,
    })
    selectButtons: cc.Node[] = [];

    onLoad(){
        SelectManager.instance = this;
    }

    start(){
        ManagerInterface.managersIsExist([StatusManager, InputManager, ContentManager]);
    }

    showSelects(varName: string,selects: string[]){
        StatusManager.instance.status = Status.Select;
        //每有一个按钮，起始位置向上挪100
        let startPosY = this.defaultSelectButton.position.y + selects.length * 100;
        selects.forEach((element, index) => {
            let button = cc.instantiate(this.defaultSelectButton);
            //将生成的按钮记录至数组
            this.selectButtons[this.selectButtons.length] = button;
            button.getComponent(SelectButton).varName = varName;
            button.getComponent(SelectButton).value = index;
            button.getComponent(SelectButton).textLabel.string = element;
            button.parent = this.node;
            button.setPosition(button.position.x, startPosY - index * 200);
            button.active = true;
        });

    }

    endSelects(){
        if(StatusManager.instance.status != Status.Select){
            cc.error("当前不是选择选项状态，当前状态为：" + InputManager.instance.status);
            return;
        }
        this.selectButtons.forEach((element) => {
            element.destroy();
        });
        this.selectButtons = [];
        StatusManager.instance.status = Status.Play;
        ContentManager.instance.next();
    }
    
}