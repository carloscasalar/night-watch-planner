import { FC } from 'react';

export const Header: FC = () => (
  <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <span className="ml-3 text-xl">Night Watch Planner</span>
      </div>
    </div>
  </header>
);
