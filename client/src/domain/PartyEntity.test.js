import PartyEntity from './PartyEntity';
import CharacterEntity from './CharacterEntity';
import CharacterNotFoundException from './CharacterNotFoundException';

const GANDALF = new CharacterEntity({id:1, name: 'Gandalf'});
const GIMLI = new CharacterEntity({id:2, name: 'Gimli'});

test('should be able to instantiate a party with no members', () => {
   const party = new PartyEntity();

   expect(party.characters).toEqual([]);
});

test('should be able to instantiate a party with empty sample object', () => {
   const party = new PartyEntity({});

   expect(party.characters).toEqual([]);
});

test('add character should return a party with a new character', () => {
    const characters = [GANDALF];
    const party = new PartyEntity({characters}).addCharacterWith(GIMLI.name);
    const assertGimliExistsInParty = () => party.characters.find(({name}) => name === GIMLI.name);
    expect(assertGimliExistsInParty).toBeTruthy();
});

test('remove a character sould return a party without the character', () => {
   const characters = [GANDALF, GIMLI];
   const party = new PartyEntity({characters}).removeCharacter(GIMLI);

   expect(party.characters).toEqual([GANDALF]);
});

test('update a non existing character should throw an exception', () => {
    const characters = [GANDALF];
    const tryTuUpdateNonExistingCharacter = () => new PartyEntity({characters}).updateCharacter(GIMLI);

    expect(tryTuUpdateNonExistingCharacter).toThrow(CharacterNotFoundException);
});
