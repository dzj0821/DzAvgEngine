import ManagerInterface from "./ManagerInterface";
import ContentStatus from "./enum/ContentStatus";
import ContentManager from "./ContentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationManager extends ManagerInterface {

    static instance : AnimationManager = null;

    onLoad(){
        AnimationManager.instance = this;
    }

    playAnimation(node : cc.Node, animationName: string, time: number){
        let action;
        switch(animationName){
            case "FadeIn":
                action = cc.sequence(cc.callFunc(function(){
                    node.opacity = 0;
                }), cc.fadeIn(time), cc.callFunc(this.onEndAnimation));
                break;
            case "FadeOut":
                action = cc.sequence(cc.callFunc(function(){
                    node.opacity = 255;
                }), cc.fadeOut(time), cc.callFunc(this.onEndAnimation));
                break;
            case "Blink":
                action = cc.sequence(cc.callFunc(function(){
                    node.opacity = 0;
                }), cc.fadeIn(time / 2), cc.fadeOut(time / 2), cc.callFunc(this.onEndAnimation));
                break;
            case "Shark":
                let randomRange = 100;
                let pos, random;
                let onceTime = 0.05;
                
                
                action = cc.sequence(cc.callFunc(function(){
                    pos = node.position;
                }), cc.repeat(cc.sequence(cc.callFunc(function(){
                    let flag = true;
                    if(flag){
                        random = new cc.Vec2(pos.x + Math.random() * randomRange - randomRange / 2, pos.y + Math.random() * randomRange - randomRange / 2);
                    } else {
                        random = new cc.Vec2(pos.x - Math.random() * randomRange - randomRange / 2, pos.y - Math.random() * randomRange - randomRange / 2);
                    }
                    flag = !flag;
                    node.runAction(cc.moveTo(onceTime, random));
                }), cc.delayTime(onceTime)), Math.floor(time / onceTime) - 1), cc.moveTo(onceTime, pos), cc.callFunc(this.onEndAnimation));
                
                /*
                瞬间抖动
                action = cc.sequence(cc.callFunc(function(){
                    pos = node.position;
                }), cc.repeat(cc.sequence(cc.callFunc(function(){
                    let flag = true;
                    if(flag){
                        random = new cc.Vec2(pos.x + Math.random() * randomRange - randomRange / 2, pos.y + Math.random() * randomRange - randomRange / 2);
                    } else {
                        random = new cc.Vec2(pos.x - Math.random() * randomRange - randomRange / 2, pos.y - Math.random() * randomRange - randomRange / 2);
                    }
                    flag = !flag;
                    cc.log(random);
                    node.setPosition(random);
                }), cc.delayTime(onceTime)), Math.floor(time / onceTime) - 1), cc.moveTo(onceTime, pos), cc.callFunc(this.onEndAnimation));
                */
                break;
            default:
                cc.error("未找到对应的动画：" + animationName);
                return;
        }
        cc.log("播放动画：" + animationName);
        node.runAction(action);
    }

    onEndAnimation(){
        ContentManager.instance.status = ContentStatus.ReadNext;
        ContentManager.instance.next();
    }
}
