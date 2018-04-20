import PartyEntity from '../domain/PartyEntity';
import RemoveCharacterFromParty from './RemoveCharacterFromParty';
import { GANDALF, GIMLI } from '../domain/stub/characters';
import { partyRepositoryStub } from './stub/partyRepository';
import { firstParameterOfFirstCallTo, numberOfCallsTo } from '../jest/utils';

let emptyParty;
let partyWithGimli;
let partyWithGandalfAndGimli;
beforeEach(() => {
  emptyParty = new PartyEntity();
  partyWithGandalfAndGimli = new PartyEntity({ characters: [GANDALF, GIMLI] });
  partyWithGimli = new PartyEntity({ characters: [GIMLI] });
});

test('remove character should save', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const removeCharacterFromParty = new RemoveCharacterFromParty(partyRepository);
  removeCharacterFromParty.execute(GIMLI.id);

  expect(numberOfCallsTo(partyRepository.save)).toBe(1);
});

test('remove last character should persist an empty party', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const removeCharacterFromParty = new RemoveCharacterFromParty(partyRepository);
  removeCharacterFromParty.execute(GIMLI.id);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toMatchObject(emptyParty);
});

test('remove a character should persist a party without that character', () => {
  const partyRepository = partyRepositoryStub(partyWithGandalfAndGimli);

  const removeCharacterFromParty = new RemoveCharacterFromParty(partyRepository);
  removeCharacterFromParty.execute(GANDALF.id);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toHaveProperty(['characters', 0, 'name'], GIMLI.name);
});
