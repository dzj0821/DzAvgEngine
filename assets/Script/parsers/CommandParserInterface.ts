// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class CommandParserInterface extends cc.Component {

    @property([cc.String])
    needParseCommand: string[] = [];
    
    abstract parse(jsonMessage);

    isExistNull(value: any[]): boolean{
        for(let i = 0; i < value.length; i++){
            let element = value[i];
            if(typeof(element) == "undefined" || element === null || element === ""){
                return true;
            }
        }
        return false;
    }
}
