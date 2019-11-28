import { toPartyEntity, toPlainParty } from './partyMappers';

export default class PartyRepository {
  constructor(state) {
    this.state = state;
  }

  getParty() {
    return toPartyEntity(this.state);
  }

  save(partyEntity) {
    const party = toPlainParty(partyEntity);
    this.state = {
      ...this.state,
      ...party,
    };
  }
}
