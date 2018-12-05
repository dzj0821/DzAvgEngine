import InputBoxManager from "../InputBoxManager";
import VarManager from "../VarManager";

const {ccclass, property} = cc._decorator;

/**
 * 绑定在默认输入框下
 */
@ccclass
export default class InputBox extends cc.Component {

    @property({
        visible: false,
    })
    varName: string = "";

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.EditBox)
    input: cc.EditBox = null;

    @property(cc.Button)
    button: cc.Button = null;

    init(title: string, varName: string){
        this.title.string = title;
        this.node.once(cc.Node.EventType.TOUCH_END, function(event: cc.Event){
            let result = event.currentTarget.getComponent(InputBox).input.string;
            VarManager.instance.setVar(event.currentTarget.getComponent(InputBox).varName, result);
            InputBoxManager.instance.endInput();
        });
    }
}
