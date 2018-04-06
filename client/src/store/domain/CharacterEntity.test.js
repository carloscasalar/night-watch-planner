import CharacterEntity from './CharacterEntity';
import IdRequiredException from './IdRequiredException';

const TWO_HOURS_IN_MINUTES = 2 * 60;
const SIX_HOURS_IN_MINUTES = 6 * 60;
const EIGHT_HOURS_IN_MINUTES = 8 * 60;
const ZERO_MINUTES = 0;
const CHARACTER_ID = 3;

const characterThatRequiresSixHoursToSleep = () => {
    const id = CHARACTER_ID;
    const name = 'Kitiara';
    return new CharacterEntity({id, name, requiredSleepTime: SIX_HOURS_IN_MINUTES});
};

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

test('copyWithRequiredSleepTimeAdded should return a copy of the character with time added', () => {
    const originalCharacter = characterThatRequiresSixHoursToSleep();

    const characterWithTwoMoreHoursRequiredToSleep = originalCharacter.withRequiredSleepTimeAdded(TWO_HOURS_IN_MINUTES);

    expect(characterWithTwoMoreHoursRequiredToSleep.requiredSleepTime).toBe(EIGHT_HOURS_IN_MINUTES);
    expect(originalCharacter).not.toBe(characterWithTwoMoreHoursRequiredToSleep);
});

test('copyWithRequiredSleepTimeAdded should never fall below 0', () => {
    const originalCharacter = characterThatRequiresSixHoursToSleep();

    const characterThatDoesNotNeedToSleep = originalCharacter.withRequiredSleepTimeAdded(-EIGHT_HOURS_IN_MINUTES);

    expect(characterThatDoesNotNeedToSleep.requiredSleepTime).toBe(ZERO_MINUTES);
    expect(originalCharacter).not.toBe(characterThatDoesNotNeedToSleep);
});

test('copyWithName should return a copy of the character with name changed', () => {
    const originalCharacter = characterThatRequiresSixHoursToSleep();
    const otherName = 'Other Name';
    const changedNameToKronos = originalCharacter.withName(otherName);

    expect(changedNameToKronos.name).toBe(otherName);
    expect(originalCharacter).not.toBe(changedNameToKronos);
});
