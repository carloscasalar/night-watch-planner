import IdRequiredException from './IdRequiredException';

const NO_ID = null;
const DEFAULT_NAME = 'No name character';
export const DEFAULT_REQUIRED_SLEEP_MINUTES = 6 * 60;

export default class Character {
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

    copy = () => new Character(this);
}