import PartyEntity from './PartyEntity';

test('should be able to instantiate a party with no members', () => {
  const party = new PartyEntity();

  expect(party.characters).toEqual([]);
});

test('should be able to instantiate a party with empty sample object', () => {
  const party = new PartyEntity({});

  expect(party.characters).toEqual([]);
});
