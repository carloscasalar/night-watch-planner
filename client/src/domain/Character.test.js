import Character from './Character';
import IdRequiredException from './IdRequiredException';

const SIX_HOURS_IN_MINUTES = 60 * 6;
const EIGHT_HOURS_IN_MINUTES = 8 * 60;
const CHARACTER_ID = 3;

test('cannot create a character without id', () => {
    expect(() => new Character({name: 'Gandalf', requiredSleepTime: 400})).toThrow(IdRequiredException);
});

test('should build be able to build a character providing only an id', () => {
    const character = new Character({id: CHARACTER_ID});

    expect(character.id).toBe(CHARACTER_ID);
});

test('constructed character should have the provided name', () => {
    const id = CHARACTER_ID;
    const name = 'Gimli';
    const character = new Character({id, name});

    expect(character.name).toBe(name);
});

test('constructed character should have the provided requiredSleepTime', () => {
    const id = CHARACTER_ID;
    const requiredSleepTime = EIGHT_HOURS_IN_MINUTES;
    const character = new Character({id, requiredSleepTime});

    expect(character.requiredSleepTime).toEqual(requiredSleepTime);
});

test('by default, a new character should require 6 hours (360 minutes) to sleep', () => {
    const character = new Character({id: CHARACTER_ID});

    expect(character.requiredSleepTime).toBe(SIX_HOURS_IN_MINUTES);
});

test('copy should return a character that is equal but not the same', () => {
    const id = CHARACTER_ID;
    const name = 'Tanis';
    const requiredSleepTime = EIGHT_HOURS_IN_MINUTES;

    const originalCharacter = new Character({id, name, requiredSleepTime});
    const copy = originalCharacter.copy();

    expect(copy.id).toEqual(originalCharacter.id);
    expect(copy.name).toEqual(originalCharacter.name);
    expect(copy.requiredSleepTime).toEqual(originalCharacter.requiredSleepTime);
    expect(copy).not.toBe(originalCharacter);
});