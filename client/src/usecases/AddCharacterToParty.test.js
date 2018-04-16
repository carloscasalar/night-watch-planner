import PartyEntity from '../domain/PartyEntity';
import AddCharacterToParty from './AddCharacterToParty';
import { GANDALF, GIMLI } from '../domain/stub/characters';
import { partyRepositoryStub } from './stub/partyRepository';
import { firstParameterOfFirstCallTo, numberOfCallsTo } from '../jest/utils';

const EXPECTED_FIRST_CHARACTER_ID = 1;
const EXPECTED_SECOND_CHARACTER_ID = 2;

const FIRST_CHARACTER_INDEX = 0;
const SECOND_CHARACTER_INDEX = 1;

test('add character should save', () => {
  const emptyParty = new PartyEntity();

  const partyRepository = partyRepositoryStub(emptyParty);

  const addCharacterToParty = new AddCharacterToParty(partyRepository);
  addCharacterToParty.execute(GANDALF.name);

  expect(numberOfCallsTo(partyRepository.save)).toBe(1);
});

test('add character should add a new character with the provided name', () => {
  const emptyParty = new PartyEntity();

  const partyRepository = partyRepositoryStub(emptyParty);

  const addCharacterToParty = new AddCharacterToParty(partyRepository);
  addCharacterToParty.execute(GANDALF.name);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  const addedCharacter = savedParty.characters[0];
  expect(addedCharacter.name).toBe(GANDALF.name);
});

test('first character added should have id 1', () => {
  const emptyParty = new PartyEntity();

  const partyRepository = partyRepositoryStub(emptyParty);

  const addCharacterToParty = new AddCharacterToParty(partyRepository);
  addCharacterToParty.execute(GANDALF.name);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  const addedCharacter = savedParty.characters[FIRST_CHARACTER_INDEX];
  expect(addedCharacter.id).toBe(EXPECTED_FIRST_CHARACTER_ID);
});

test('second character added should have id 2', () => {
  const characters = [GANDALF.copy()];
  const partyWithOneCharacter = new PartyEntity({ characters });

  const partyRepository = partyRepositoryStub(partyWithOneCharacter);

  const addCharacterToParty = new AddCharacterToParty(partyRepository);
  addCharacterToParty.execute(GIMLI.name);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  const addedCharacter = savedParty.characters[SECOND_CHARACTER_INDEX];
  expect(addedCharacter.id).toBe(EXPECTED_SECOND_CHARACTER_ID);
});
