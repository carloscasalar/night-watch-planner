export default class PartyRepository {
    constructor(state) {
        this.state = {...state};
    }

    getParty() {
        return this.state.party;
    }

    save(party) {
        this.state = {
            ...this.state,
            party
        };
    }
}

