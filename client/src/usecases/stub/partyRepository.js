export const partyRepositoryStub = party => ({
  getParty: () => party,
  save: jest.fn(),
});
