import UpdateCharacterName from './UpdateCharacterName';
import PartyEntity from '../domain/PartyEntity';
import { GANDALF, GIMLI } from '../domain/stub/characters';
import { firstParameterOfFirstCallTo, numberOfCallsTo } from '../jest/utils';
import { partyRepositoryStub } from './stub/partyRepository';

const FIRST_CHARACTER_INDEX = 0;
const SECOND_CHARACTER_INDEX = 1;
const GIMLI_SON_OF_GLOIN_NAME = `${GIMLI.name} son of Glóin`;

let partyWithGimli;
let partyWithGandalfAndGimli;
beforeEach(() => {
  partyWithGandalfAndGimli = new PartyEntity({ characters: [GANDALF.copy(), GIMLI.copy()] });
  partyWithGimli = new PartyEntity({ characters: [GIMLI.copy()] });
});

test('update character name should persist party', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const updateCharacterName = new UpdateCharacterName(partyRepository);
  updateCharacterName.execute(GIMLI.id, GIMLI_SON_OF_GLOIN_NAME);

  expect(numberOfCallsTo(partyRepository.save)).toBe(1);
});

test('should update character name in a party of one character', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const updateCharacterName = new UpdateCharacterName(partyRepository);
  updateCharacterName.execute(GIMLI.id, GIMLI_SON_OF_GLOIN_NAME);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toHaveProperty(['characters', FIRST_CHARACTER_INDEX, 'name'], GIMLI_SON_OF_GLOIN_NAME);
});

test('should update character name in a party with several characters', () => {
  const partyRepository = partyRepositoryStub(partyWithGandalfAndGimli);

  const updateCharacterName = new UpdateCharacterName(partyRepository);
  updateCharacterName.execute(GIMLI.id, GIMLI_SON_OF_GLOIN_NAME);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toHaveProperty(['characters', SECOND_CHARACTER_INDEX, 'name'], GIMLI_SON_OF_GLOIN_NAME);
});
