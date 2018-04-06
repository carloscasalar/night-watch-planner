import CharacterEntity from '../../domain/CharacterEntity';

const addCharacter = (state, {name}) => {
    const id = state.characterCounter + 1;
    const character = new CharacterEntity({id, name});

    return {
        ...state,
        party: [...state.party, character],
        characterCounter: id
    };
};

export default addCharacter;
