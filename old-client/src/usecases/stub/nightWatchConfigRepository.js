const nightWatchConfigRepositoryStub = nightWatchConfig => ({
  getNightWatchConfig: () => nightWatchConfig,
  save: jest.fn(),
});

export default nightWatchConfigRepositoryStub;
