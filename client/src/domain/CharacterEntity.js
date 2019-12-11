import IdRequiredException from './IdRequiredException';

const NO_ID = null;
const DEFAULT_NAME = 'No name character';
const MIN_TIME = 0;
export const DEFAULT_REQUIRED_SLEEP_MINUTES = 6 * 60;

export default class CharacterEntity {
  constructor({
    id = NO_ID,
    name = DEFAULT_NAME,
    requiredSleepTime = DEFAULT_REQUIRED_SLEEP_MINUTES,
  }) {
    if (id === NO_ID) {
      throw new IdRequiredException();
    }
    this.id = id;
    this.name = name;
    this.requiredSleepTime = requiredSleepTime;
  }

    toJSON = () => ({
      id: this.id,
      name: this.name,
      requiredSleepTime: this.requiredSleepTime,
    });

    copy = () => new CharacterEntity(this.toJSON());

    updateName(name) {
      this.name = name;
      return this;
    }

    increaseRequiredSleepTime(time) {
      this.requiredSleepTime = Math.max(MIN_TIME, this.requiredSleepTime + time);
      return this;
    }
}
