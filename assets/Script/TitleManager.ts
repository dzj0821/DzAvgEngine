import ManagerInterface from "./ManagerInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TitleManager extends ManagerInterface {
    static instance : TitleManager = null;

    onLoad(){
        TitleManager.instance = this;
    }

    startButtonCallback(){
        cc.director.loadScene("MainScene", function(){

        });
    }

    loadButtonCallback(){
        cc.director.loadScene("SaveLoadScene", function(){

        });
    }

    galleryButtonCallback(){
        cc.director.loadScene("GalleryScene", function(){

        });
    }

    exitButtonCallback(){
        cc.director.end();
    }
}
