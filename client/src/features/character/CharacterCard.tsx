import { type FC } from 'react'
import { getFormattedCharacter } from './getFormattedCharacter'
import { type RootState } from '../../app/store/rootStore'
import { Icon } from '../../common/components/icon/Icon'
import { CounterControl } from '../../common/components/counterControl/CounterControl'
import { EditableText } from '../../common/components/editableText/EditableText'
import { DeleteButton } from '../../common/components/deleteButton/DeleteButton'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { increaseCharacterSleepTimeAction, removeCharacterAction, updateCharacterNameAction } from '../party/reducer'

const MINUTES_INCREMENT = 30

export interface CharacterCardProps {
  characterId: string
}

export const CharacterCard: FC<CharacterCardProps> = ({ characterId }) => {
  const dispatch = useAppDispatch()
  const character = useAppSelector((state: RootState) =>
    getFormattedCharacter(state, characterId)
  )

  const increaseSleepTime = () =>
    dispatch(
      increaseCharacterSleepTimeAction({
        characterId,
        minutes: MINUTES_INCREMENT
      })
    )

  const decreaseSleepTime = () =>
    dispatch(
      increaseCharacterSleepTimeAction({
        characterId,
        minutes: -MINUTES_INCREMENT
      })
    )

  const removeCharacter = () =>
    dispatch(removeCharacterAction({ characterId }))

  const updateCharacterName = (name: string) =>
    dispatch(
      updateCharacterNameAction({
        characterId,
        name
      })
    )

  if (character == null) {
    return null
  }

  return (
      <div className="flex items-start p-4 border border-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center flex-grow">
          <Icon
            name="barbarian"
            className="w-16 h-16 mr-4 text-black rounded-full"
          />
          <div className="flex-grow">
            <EditableText
              value={character?.name}
              as="h2"
              className="text-xl font-medium text-gray-900 title-font cursor-text"
              onChange={updateCharacterName}
            />
            <div className="flex items-center space-x-4 text-lg text-gray-700">
              <CounterControl
                icon="sleep-time"
                size="small"
                label="Sleep time"
                value={character?.requiredSleepTime}
                increase={increaseSleepTime}
                decrease={decreaseSleepTime}
              />
            </div>
          </div>
        </div>
        <div>
          <DeleteButton onClick={removeCharacter} />
        </div>
      </div>
  )
}
