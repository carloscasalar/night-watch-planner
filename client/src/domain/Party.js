const NO_CHARACTERS = [];
const EMPTY_PARTY = {characters: NO_CHARACTERS};

export default class Party {
    constructor({characters = NO_CHARACTERS} = EMPTY_PARTY){
        this._characters = characters;
    }

    get characters(){
        return this._characters;
    }

    addCharacter = (character) => {
        if(this._characters.some(({id}) => id === character.id)){
            return this;
        }
        const characters = [...this._characters, character];
        return new Party({characters});
    };

    removeCharacter = (character) => {
        const characters = this._characters.filter(({id}) => id !== character.id);
        return new Party({characters});
    }
}