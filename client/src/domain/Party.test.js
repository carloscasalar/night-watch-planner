import Party from './Party';
import Character from './Character';

const GANDALF = new Character({id:1, name: 'Gandalf'});
const GIMLI = new Character({id:2, name: 'Gimli'});

test('should be able to instantiate a party with no members', () => {
   const party = new Party();

   expect(party.characters).toEqual([]);
});

test('should be able to instantiate a party with empty sample object', () => {
   const party = new Party({});

   expect(party.characters).toEqual([]);
});

test('add character should return a party with a new character', () => {
    const characters = [GANDALF];
    const party = new Party({characters}).addCharacter(GIMLI);

    expect(party.characters).toEqual([GANDALF, GIMLI]);
});

test('remove a character sould return a party without the character', () => {
   const characters = [GANDALF, GIMLI];
   const party = new Party({characters}).removeCharacter(GIMLI);

   expect(party.characters).toEqual([GANDALF]);
});

test('add an already added character should not duplicate it', () => {
    const characters = [GANDALF, GIMLI];
    const party = new Party({characters}).addCharacter(GIMLI);

    expect(party.characters).toEqual([GANDALF, GIMLI]);
});
