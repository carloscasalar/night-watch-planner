import { type FC } from 'react'
import { Icon } from '../../common/components/icon/Icon'

export const Header: FC = () => (
  <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Icon name="campfire" className="w-20 h-20 text-black rounded-full" />
        <span className="ml-3 text-4xl">Night Watch Planner</span>
      </div>
    </div>
  </header>
)
