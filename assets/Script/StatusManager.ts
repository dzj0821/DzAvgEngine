import ManagerInterface from "./ManagerInterface";
import Status from "./enum/Status";

const {ccclass, property} = cc._decorator;

/**
 * 给其他管理器提供状态的类，如让输入管理器判断是否应该继续剧情
 */
@ccclass
export default class StatusManager extends ManagerInterface {

    @property({
        visible: false,
    })
    status = Status.Play;

    onLoad(){
        StatusManager.instance = this;
    }
    
}