const increaseCharacterRequiredSleepTime = (state, {characterName, time}) => {
    const party = [...state.party];
    const characterIndex = party.findIndex(({name}) => name === characterName);
    if(!characterIndex && characterIndex !==0){
        return state;
    }

    party[characterIndex] = party[characterIndex].withRequiredSleepTimeAdded(time);
    return {
        ...state,
        party
    };
};

export default increaseCharacterRequiredSleepTime;

