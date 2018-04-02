const removeCharacter = (state, {character}) => {
    const party = state.party.filter(({id}) => id !== character.id);

    return {
        ...state,
        party
    };
};

export default removeCharacter;
