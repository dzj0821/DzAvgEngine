import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

/**
 * 管理游戏内变量数据
 */
@ccclass
export default class VarManager extends ManagerInterface {

    @property({
        visible: false,
    })
    varMap = [];

    onLoad(){
        VarManager.instance = this;
    }

    setVar(name: string, value): void{
        this.varMap[name] = value;
        cc.log("设置变量" + name + "为" + value);
    }

    getVar(name: string){
        if(typeof(this.varMap[name]) == "undefined"){
            cc.error("变量" + name +"未定义过");
        }
        return this.varMap[name];
    }
    
}