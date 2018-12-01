const {ccclass, property} = cc._decorator;

/**
 * 所有的Manager都需要在onLoad中给instance赋值自身，便于其他类调用，同时调用类应在start中判断是否为null防止意外
 */
@ccclass
export default abstract class ManagerInterface extends cc.Component {
    static instance: any = null;

    static managersIsExist (Managers: any[]){
        Managers.forEach(element => {
            if(element.instance == null){
                cc.error("未找到" + element.prototype.__classname__);
            }
        });
    }
}
