const updateCharacterName = (state, {character: {id: characterId}, newName}) => {
    const party = [...state.party];
    const characterIndex = party.findIndex(({id}) => id === characterId);
    if (!characterIndex && characterIndex !== 0) {
        return state;
    }

    party[characterIndex] = party[characterIndex].withName(newName);
    return {
        ...state,
        party
    };
};

export default updateCharacterName;
