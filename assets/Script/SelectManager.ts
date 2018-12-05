import ManagerInterface from "./ManagerInterface";
import InputManager from "./InputManager";
import ContentManager from "./ContentManager";
import ContentStatus from "./enum/ContentStatus";
import SelectButton from "./vo/SelectButton";

const {ccclass, property} = cc._decorator;

/**
 * 默认的选项按钮和动态生成的都在此节点下
 */
@ccclass
export default class SelectManager extends ManagerInterface {

    static instance : SelectManager = null;

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
        ManagerInterface.managersIsExist([InputManager, ContentManager]);
    }

    showSelects(varName: string, selects: string[]){
        //每有一个按钮，起始位置向上挪100
        let startPosY = this.defaultSelectButton.position.y + selects.length * 100;
        selects.forEach((element, index) => {
            let button = cc.instantiate(this.defaultSelectButton);
            //将生成的按钮记录至数组
            this.selectButtons[this.selectButtons.length] = button;
            button.getComponent(SelectButton).init(varName, index, element);
            button.setParent(this.node);
            button.setPosition(button.position.x, startPosY - index * 200);
            button.active = true;
        });

    }

    endSelects(){
        this.selectButtons.forEach((element) => {
            element.destroy();
        });
        this.selectButtons = [];
        ContentManager.instance.status = ContentStatus.ReadNext;
        ContentManager.instance.next();
    }
    
}