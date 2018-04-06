import PartyEntity from './PartyEntity';
import CharacterEntity from './CharacterEntity';

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
    const party = new PartyEntity({characters}).addCharacter(GIMLI);

    expect(party.characters).toEqual([GANDALF, GIMLI]);
});

test('remove a character sould return a party without the character', () => {
   const characters = [GANDALF, GIMLI];
   const party = new PartyEntity({characters}).removeCharacter(GIMLI);

   expect(party.characters).toEqual([GANDALF]);
});

test('add an already added character should not duplicate it', () => {
    const characters = [GANDALF, GIMLI];
    const party = new PartyEntity({characters}).addCharacter(GIMLI);

    expect(party.characters).toEqual([GANDALF, GIMLI]);
});
