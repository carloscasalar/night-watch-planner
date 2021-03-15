// eslint-disable-next-line
export const partyRepositoryStub = party => ({
  getParty: () => party,
  save: jest.fn(),
});
