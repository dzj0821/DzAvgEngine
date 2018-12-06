import CommandParserInterface from "./CommandParserInterface";
import DialogWindowManager from "../DialogWindowManager";
import ManagerInterface from "../ManagerInterface";
import ContentManager from "../ContentManager";
import ContentStatus from "../enum/ContentStatus";
import VarManager from "../VarManager";
import CharacterStatus from "../vo/CharacterStatus";
import TextFormatManager from "../TextFormatManager";
import ResourceManager from "../ResourceManager";
import AudioManager from "../AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogCommandParser extends CommandParserInterface {

    @property({
        visible: false,
    })
    audioSource: cc.AudioSource = null;

    @property({
        visible: false,
    })
    waitAudioSource: boolean = false;

    @property({
        visible: false,
    })
    waitEndedCallback: Function = null;

    start () {
        ManagerInterface.managersIsExist([DialogWindowManager]);
    }

    parse(jsonMessage) {
        let dialogWindowManager = DialogWindowManager.instance;
        switch(jsonMessage.Command){
            case "":
                ContentManager.instance.status = ContentStatus.TextAnimation;
                if(!this.isExistNull([jsonMessage.Arg1])){
                    if(typeof(jsonMessage.Arg1) != "string"){
                        cc.error("如果对话需要参数，则应传入一个类型为CharacterStatus的变量名");
                        return;
                    }
                    let characterStatus = VarManager.instance.getVar(jsonMessage.Arg1);
                    if(!(characterStatus instanceof CharacterStatus)){
                        cc.error("变量类型必须是CharacterStatus");
                        return;
                    }
                    DialogWindowManager.instance.setCharacterName(characterStatus.characterName);
                    DialogWindowManager.instance.setCharacterNameImage(characterStatus.characterNameImagePath);
                    DialogWindowManager.instance.setCharacterImage(characterStatus.characterImagePath);
                }
                if(!this.isExistNull([jsonMessage.Voice])){
                    if(typeof(jsonMessage.Voice) != "string"){
                        cc.error("音效应为声音文件路径");
                        return;
                    }
                    ResourceManager.instance.loadAudioSource(jsonMessage.Voice, function(audioSource: cc.AudioClip){
                        AudioManager.instance.playSe(audioSource);
                    });
                }
                jsonMessage.Text = jsonMessage.Text.toString();
                let formatedText = TextFormatManager.instance.format(jsonMessage.Text)
                dialogWindowManager.setMainText(formatedText);
                break;
            default:
                return;
        }
    }

}
