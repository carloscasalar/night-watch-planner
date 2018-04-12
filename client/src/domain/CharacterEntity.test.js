import CharacterEntity from './CharacterEntity';
import IdRequiredException from './IdRequiredException';

const SIX_HOURS_IN_MINUTES = 6 * 60;
const EIGHT_HOURS_IN_MINUTES = 8 * 60;
const CHARACTER_ID = 3;

test('cannot create a character without id', () => {
    const characterWithNoId = {name: 'Gandalf', requiredSleepTime: 400};
    expect(() => new CharacterEntity(characterWithNoId)).toThrow(IdRequiredException);
});

test('should be able to build a character providing only an id', () => {
    const character = new CharacterEntity({id: CHARACTER_ID});

    expect(character.id).toBe(CHARACTER_ID);
});

test('new character should have the provided name', () => {
    const id = CHARACTER_ID;
    const name = 'Gimli';
    const character = new CharacterEntity({id, name});

    expect(character.name).toBe(name);
});

test('new character should have the provided requiredSleepTime', () => {
    const id = CHARACTER_ID;
    const requiredSleepTime = EIGHT_HOURS_IN_MINUTES;
    const character = new CharacterEntity({id, requiredSleepTime});

    expect(character.requiredSleepTime).toEqual(requiredSleepTime);
});

test('by default, a new character should require 6 hours (360 minutes) to sleep', () => {
    const character = new CharacterEntity({id: CHARACTER_ID});

    expect(character.requiredSleepTime).toBe(SIX_HOURS_IN_MINUTES);
});

