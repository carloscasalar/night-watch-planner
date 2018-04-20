import PartyRepository from './PartyRepository';
import { GANDALF, GIMLI } from '../domain/stub/characters';
import PartyEntity from '../domain/PartyEntity';

test('getParty should return a correct party object', () => {
  const state = {
    party: {
      characters: [
        {
          id: GIMLI.id,
          name: GIMLI.name,
          requiredSleepTime: GIMLI.requiredSleepTime,
        },
        {
          id: GANDALF.id,
          name: GANDALF.name,
          requiredSleepTime: GANDALF.requiredSleepTime,
        },
      ],
    },
  };

  const expectedParty = new PartyEntity({ characters: [GIMLI, GANDALF] });

  const partyRepository = new PartyRepository(state);
  const party = partyRepository.getParty();

  expect(party).toBeInstanceOf(PartyEntity);
  expect(party).toHaveProperty('characters');
  expect(party.characters.map(it => it.toJSON()))
    .toMatchObject(expectedParty.characters.map(it => it.toJSON()));
});

test('save should return a state with a plain Object party attribute', () => {
  const partyRepository = new PartyRepository({});

  const domainParty = new PartyEntity({ characters: [GIMLI, GANDALF] });

  const expectedPartySate = {
    characters: [
      {
        id: GIMLI.id,
        name: GIMLI.name,
        requiredSleepTime: GIMLI.requiredSleepTime,
      },
      {
        id: GANDALF.id,
        name: GANDALF.name,
        requiredSleepTime: GANDALF.requiredSleepTime,
      },
    ],
    isEmpty: false,
  };

  partyRepository.save(domainParty);
  expect(partyRepository.state).toHaveProperty('party');
  expect(partyRepository.state.party).toMatchObject(expectedPartySate);
});

test('save should not mutate state', () => {
  const state = {};
  const partyRepository = new PartyRepository(state);
  expect(state).toBe(partyRepository.state);

  const party = new PartyEntity();
  partyRepository.save(party);

  expect(state).not.toBe(partyRepository.state);
});

test('save should preserve other state attributes different than party', () => {
  const otherAttr = 'A';
  const anotherAttr = 'B';
  const state = { otherAttr, anotherAttr };
  const partyRepository = new PartyRepository(state);

  const party = new PartyEntity();
  partyRepository.save(party);

  expect(partyRepository.state).toHaveProperty('otherAttr', 'A');
  expect(partyRepository.state).toHaveProperty('anotherAttr', 'B');
});
