import { PartyEntity } from './PartyEntity';

export interface PartyRepository {
  getParty: () => PartyEntity;
  save: (partyEntity: PartyEntity) => void;
}
