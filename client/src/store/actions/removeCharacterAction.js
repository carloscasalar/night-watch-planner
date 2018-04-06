import {CHARACTER_REMOVE} from './actions';

const removeCharacterAction = (character) => ({
    type: CHARACTER_REMOVE,
    character
});

export default removeCharacterAction;
