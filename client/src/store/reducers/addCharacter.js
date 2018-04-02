import Character from '../domain/Character';

const addCharacter = (state, {name}) => {
    const id = state.characterCounter + 1;
    const character = new Character({id, name});

    return {
        ...state,
        party: [...state.party, character],
        characterCounter: id
    };
};

export default addCharacter;
