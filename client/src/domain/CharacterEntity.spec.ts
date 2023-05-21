import { beforeEach, describe, it, expect } from 'vitest'
import { CharacterEntity } from './CharacterEntity'

const EIGHT_HOURS_IN_MINUTES = 480

interface DefaultCharacterProps {
  id: string
  name: string
  requiredSleepTime: number
}

describe('domain/CharacterEntity', () => {
  let defaultCharacterProps: DefaultCharacterProps
  beforeEach(() => {
    defaultCharacterProps = {
      id: 'character-id',
      name: 'default name',
      requiredSleepTime: EIGHT_HOURS_IN_MINUTES
    }
  })

  describe('constructor', () => {
    it('should instantiate a character with same attributes as provided', () => {
      const id = 'gimli'
      const name = 'Gimli'
      const requiredSleepTime = 1_000

      const character = new CharacterEntity({ id, name, requiredSleepTime })

      expect(character).toMatchObject({
        id: 'gimli',
        name: 'Gimli',
        requiredSleepTime: 1_000
      })
    })
  })

  describe('updateName', () => {
    it("should update the character's name", () => {
      const character = new CharacterEntity(defaultCharacterProps)

      character.updateName('Boromir')

      expect(character.name).toBe('Boromir')
    })
  })

  describe('increaseRequiredSleepTime', () => {
    it('should increase the provided amount of time', () => {
      const initialRequiredSleepTime = 1_000
      const character = new CharacterEntity({
        ...defaultCharacterProps,
        requiredSleepTime: initialRequiredSleepTime
      })

      character.increaseRequiredSleepTime(500)

      expect(character.requiredSleepTime).toBe(1_500)
    })

    it('should not be able to decrease the required sleep time below 0', () => {
      const initialRequiredSleepTime = 1_000
      const character = new CharacterEntity({
        ...defaultCharacterProps,
        requiredSleepTime: initialRequiredSleepTime
      })

      character.increaseRequiredSleepTime(-2_000)

      expect(character.requiredSleepTime).toBe(0)
    })
  })

  describe('serialize', () => {
    it('should serialize the character to a plain object', () => {
      const id = 'frodo'
      const name = 'Frodo'
      const requiredSleepTime = 2_000

      const character = new CharacterEntity({ id, name, requiredSleepTime })

      expect(character.serialize()).toEqual({
        id: 'frodo',
        name: 'Frodo',
        requiredSleepTime: 2_000
      })
    })
  })

  describe('copy', () => {
    it('should copy the character entity', () => {
      const character = new CharacterEntity(defaultCharacterProps)

      const { id, name, requiredSleepTime } = character.copy()

      expect(character).toMatchObject({ id, name, requiredSleepTime })
    })
  })
})
