import IncreaseCharacterRequiredSleepTime from './IncreaseCharacterRequiredSleepTime';
import PartyEntity from '../domain/PartyEntity';
import { GANDALF, GIMLI } from '../domain/stub/characters';
import { firstParameterOfFirstCallTo, numberOfCallsTo } from '../jest/utils';
import { partyRepositoryStub } from './stub/partyRepository';

const FIRST_CHARACTER_INDEX = 0;
const SECOND_CHARACTER_INDEX = 1;
const ONE_HOUR_IN_MINUTES = 60;
const GIMLI_REGULAR_SLEEP_TIME_PLUS_ONE_HOUR = GIMLI.requiredSleepTime + ONE_HOUR_IN_MINUTES;

let partyWithGimli;
let partyWithGandalfAndGimli;
beforeEach(() => {
  partyWithGandalfAndGimli = new PartyEntity({ characters: [GANDALF.copy(), GIMLI.copy()] });
  partyWithGimli = new PartyEntity({ characters: [GIMLI.copy()] });
});

test('increase character required sleep time should persist party', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const increaseRequiredSleepTime = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseRequiredSleepTime.execute(GIMLI.name, ONE_HOUR_IN_MINUTES);

  expect(numberOfCallsTo(partyRepository.save)).toBe(1);
});

test('should increase character required sleep time in a party of one character', () => {
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const increaseRequiredSleepTime = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseRequiredSleepTime.execute(GIMLI.name, ONE_HOUR_IN_MINUTES);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toHaveProperty(
    ['characters', FIRST_CHARACTER_INDEX, 'requiredSleepTime'],
    GIMLI_REGULAR_SLEEP_TIME_PLUS_ONE_HOUR,
  );
});

test('should increase character required sleep time in a party with several characters', () => {
  const partyRepository = partyRepositoryStub(partyWithGandalfAndGimli);

  const increaseRequiredSleepTime = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseRequiredSleepTime.execute(GIMLI.name, ONE_HOUR_IN_MINUTES);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).toHaveProperty(
    ['characters', SECOND_CHARACTER_INDEX, 'requiredSleepTime'],
    GIMLI_REGULAR_SLEEP_TIME_PLUS_ONE_HOUR,
  );
});

test('should not mutate original party', () => {
  const partyRepository = partyRepositoryStub(partyWithGandalfAndGimli);

  const increaseRequiredSleepTime = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseRequiredSleepTime.execute(GIMLI.name, ONE_HOUR_IN_MINUTES);

  const savedParty = firstParameterOfFirstCallTo(partyRepository.save);
  expect(savedParty).not.toBe(partyWithGandalfAndGimli);
});

test('should not mutate character in original party', () => {
  const { requiredSleepTime: requiredSleepTimeBeforeUpdate } = partyWithGimli.characters[FIRST_CHARACTER_INDEX];
  const partyRepository = partyRepositoryStub(partyWithGimli);

  const increaseRequiredSleepTime = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseRequiredSleepTime.execute(GIMLI.name, ONE_HOUR_IN_MINUTES);

  expect(requiredSleepTimeBeforeUpdate).toEqual(GIMLI.requiredSleepTime);
});
