import CharacterEntity from './CharacterEntity';
import CharacterNotFoundException from './CharacterNotFoundException';

const NO_CHARACTERS = [];
const INITIAL_CHARACTER_COUNTER = 0;
const EMPTY_PARTY = {
    characterCounter: INITIAL_CHARACTER_COUNTER,
    characters: NO_CHARACTERS
};

export default class PartyEntity {
    constructor({characters = NO_CHARACTERS, characterCounter = INITIAL_CHARACTER_COUNTER} = EMPTY_PARTY) {
        this.characters = characters;
        this.characterCounter = characterCounter;
    }

    get isEmpty(){
        return this.characters.length === 0;
    }

    findCharacterById(characterId){
        return this.characters.find(({id}) => id === characterId);
    }

    findCharacterByName(characterName){
        return this.characters.find(({name}) => name === characterName);
    }

    copy() {
        const characters = this.characters.map(character => character.copy());
        const characterCounter = this.characterCounter;
        return new PartyEntity({characters, characterCounter});
    }

    addCharacterWith(name) {
        const id = this.nextCharacterId();
        const character = new CharacterEntity({id, name});
        this.characters.push(character);
        return this;
    }

    updateCharacter(character) {
        const characterIndex = this.characters.findIndex(({id}) => id === character.id);
        if (characterIndex < 0) {
            throw new CharacterNotFoundException();
        }

        this.characters[characterIndex] = character;
        return this;
    };

    removeCharacter(character) {
        this.characters = this.characters.filter(({id}) => id !== character.id);
        return this;
    }

    nextCharacterId() {
        this.characterCounter = this.characterCounter + 1;
        return this.characterCounter;
    }
}
