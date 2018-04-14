import { toPartyEntity, toPlainParty } from './partyAdapters';

export default class PartyRepository {
  constructor(state) {
    this.state = state;
  }

  getParty() {
    return toPartyEntity(this.state.party);
  }

  save(partyEntity) {
    const party = toPlainParty(partyEntity);
    this.state = {
      ...this.state,
      party,
    };
  }
}

