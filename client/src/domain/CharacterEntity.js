import IdRequiredException from './IdRequiredException';

const NO_ID = null;
const DEFAULT_NAME = 'No name character';
const MIN_TIME = 0;
export const DEFAULT_REQUIRED_SLEEP_MINUTES = 6 * 60;

export default class CharacterEntity {
    constructor({id = NO_ID, name = DEFAULT_NAME, requiredSleepTime = DEFAULT_REQUIRED_SLEEP_MINUTES}){
        if(id === NO_ID){
            throw new IdRequiredException();
        }
        this._id = id;
        this._name = name;
        this._requiredSleepTime = requiredSleepTime;
    }

    get id(){
        return this._id;
    }

    get name() {
        return this._name;
    }

    get requiredSleepTime() {
        return this._requiredSleepTime;
    }

    withRequiredSleepTimeAdded(time) {
        const id = this.id;
        const name = this.name;
        const requiredSleepTime = Math.max(MIN_TIME, this.requiredSleepTime + time);
        return new CharacterEntity({id, name, requiredSleepTime});
    };

    withName(name) {
        const id = this.id;
        const requiredSleepTime = this.requiredSleepTime;
        return new CharacterEntity({id, name, requiredSleepTime});
    };
}
