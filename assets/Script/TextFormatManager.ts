import ManagerInterface from "./ManagerInterface";
import VarManager from "./VarManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TextFormatManager extends ManagerInterface {
    static instance : TextFormatManager = null;

    formatMap : any[] = [];

    onLoad(){
        TextFormatManager.instance = this;
    }

    setFormatParam(formatName: string, varName: string){
        if(!VarManager.instance.isExistVar(varName)){
            cc.error("变量尚未定义：" + varName);
            return;
        }
        this.formatMap[formatName] = varName;
    }

    format(str: string): string{
        let result = str;
        for(let key in this.formatMap){
            let reg = new RegExp("({" + key + "})", "g");
            result = result.replace(reg, VarManager.instance.getVar(this.formatMap[key]));
        }
        return result;
    }
}
