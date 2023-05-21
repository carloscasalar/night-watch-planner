import { type FC } from 'react'
import { Icon } from '../icon/Icon'
import classNames from 'classnames'

export interface DeleteButtonProps {
  className?: string
  onClick: () => void
}

export const DeleteButton: FC<DeleteButtonProps> = ({ className, onClick }) => {
  return (
    <button
      className={classNames('p-1 focus:outline-none', className)}
      onClick={onClick}
    >
      <Icon
        name="remove"
        className="w-6 h-6 text-gray-500 rounded-full pb-1 border border-gray-300 shadow-lg hover:shadow-2xl cursor-pointer"
      />
    </button>
  )
}
