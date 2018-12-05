import ManagerInterface from "./ManagerInterface";
import CommandParserInterface from "./parsers/CommandParserInterface";

const {ccclass, property} = cc._decorator;

/**
 * 管理游戏内变量数据
 */
@ccclass
export default class VarManager extends ManagerInterface {

    static instance : VarManager = null;

    @property({
        visible: false,
    })
    varMap = [];

    onLoad(){
        VarManager.instance = this;
        this.setVar("Canvas", cc.find("Canvas/DisplayArea").getComponent(cc.Sprite));
    }

    start(){
        
    }

    setVar(name: string, value): void{
        if(!this.validVarName(name)){
            return;
        }
        if(typeof(this.varMap[name]) != "undefined" && typeof(value) != typeof(this.varMap[name])){
            cc.error("设置变量类型不匹配：" + typeof(value) + "，应为" + typeof(this.varMap[name]));
        }
        this.varMap[name] = value;
        cc.log("设置变量" + name + "为" + value);
    }

    getVar(name: string){
        if(!this.validVarName(name)){
            return;
        }
        if(typeof(this.varMap[name]) == "undefined"){
            cc.error("变量" + name +"未定义过");
        }
        return this.varMap[name];
    }

    isExistVar(name: string): boolean{
        if(!this.validVarName(name)){
            return;
        }
        if(typeof(this.varMap[name]) == "undefined"){
            return false;
        }
        return true;
    }

    validVarName(name): boolean{
        if(typeof(name) != "string"){
            cc.error("变量名必须为string类型");
            return false;
        }
        return true;
    }

    eval(left, operator, right){
        if(this.isVar(left)){
            left = VarManager.instance.getVar(left);
        }
        else if(typeof(left) == "string"){
            left = this.getConstString(left);
        }
        if(this.isVar(right)){
            right = VarManager.instance.getVar(right);
        }
        else if(typeof(right) == "string"){
            right = this.getConstString(right);
        }
        if(typeof(left) != typeof(right)){
            cc.error("类型不一致，左值：" + typeof(left) + "，右值：" + typeof(right));
            return;
        }
        switch(operator){
            case "==":
                return left === right;
            case ">":
                return left > right;
            case ">=":
                return left >= right;
            case "<":
                return left < right;
            case "<=":
                return left <= right;
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "%":
                return left % right;
            default:
                cc.error("未知的运算符：" + operator);
                return false;
        }
    }

    isVar(value): boolean{
        if(typeof(value) != "string"){
            return false;
        }
        if(value.charAt(0) == "\"" && value.charAt(value.length-1) == "\""){
            return false;
        }
        return true;
    }

    
    getConstString(value): string{
        if(typeof(value) != "string" || value.charAt(0) != "\"" || value.charAt(value.length-1) != "\""){
            cc.error(value + "不是一个字符串常量");
            return null;
        }
        let result = value.substring(1);
        result.substring(0, result.length - 1);
        return result;
    }
    
}