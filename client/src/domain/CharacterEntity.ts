const MIN_TIME = 0

export type CharacterId = string
export interface CharacterEntityAttributes {
  id: CharacterId
  name: string
  requiredSleepTime: number
}

export class CharacterEntity implements CharacterEntityAttributes {
  private readonly _id: CharacterId
  private _name: string
  private _requiredSleepTime: number
  constructor ({ id, name, requiredSleepTime }: CharacterEntityAttributes) {
    this._id = id
    this._name = name
    this._requiredSleepTime = requiredSleepTime
  }

  updateName (name: string): CharacterEntity {
    this._name = name
    return this
  }

  increaseRequiredSleepTime (time: number): CharacterEntity {
    this._requiredSleepTime = Math.max(
      MIN_TIME,
      this._requiredSleepTime + time
    )
    return this
  }

  get id (): CharacterId {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get requiredSleepTime (): number {
    return this._requiredSleepTime
  }

  serialize (): CharacterEntityAttributes {
    const { id, name, requiredSleepTime } = this
    return { id, name, requiredSleepTime }
  }

  copy = (): CharacterEntity => new CharacterEntity(this)
}
