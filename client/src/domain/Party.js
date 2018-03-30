export default class Party {
    constructor({characters = []}){
        this._characters = characters;
    }

    get characters(){
        return this._characters;
    }

    addCharacter = (character) => {
        const characters = [...this._characters, character];
        return new Party({characters});
    };

    removeCharacter = (character) => {
        const characters = this._characters.filter(({id}) => id !== character.id);
        return new Party({characters});
    }
}