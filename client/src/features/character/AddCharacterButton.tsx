import { type FC } from 'react'
import { Icon } from '../../common/components/icon/Icon'
import classNames from 'classnames'
import { addCharacterAction } from '../party/reducer'
import { useAppDispatch } from '../../app/store/hooks'

export interface AddCharacterButtonProps {
  className?: string
}

export const AddCharacterButton: FC<AddCharacterButtonProps> = ({
  className
}) => {
  const dispatch = useAppDispatch()

  const addCharacter = () =>
    dispatch(
      addCharacterAction({
        name: 'Rename me!'
      })
    )

  return (
    <div
      className={classNames(
        'h-full flex items-center opacity-25 hover:opacity-100',
        className
      )}
    >
      <button
        className="ml-2 border border-gray-200 rounded-full shadow-lg cursor-pointer hover:shadow-xl focus:outline-none"
        onClick={addCharacter}
      >
        <Icon
          name="add-character"
          className="self-center w-24 h-24 p-4 text-black"
        />
      </button>
    </div>
  )
}
