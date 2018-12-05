export default class CharacterStatus {
    characterName: string = null;
    characterNameImagePath: string = null;
    characterImagePath: string = null;

    /**
     *
     */
    constructor(characterName: string, characterNameImagePath: string, characterImagePath: string) {
        this.characterName = characterName;
        this.characterNameImagePath = characterNameImagePath;
        this.characterImagePath = characterImagePath;
    }
}
