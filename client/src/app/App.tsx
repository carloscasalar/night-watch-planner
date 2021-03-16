import { FC } from 'react';
import { Provider } from 'react-redux';
import { rootStore } from './store/rootStore';

const App: FC = () => {
  return <Provider store={rootStore}>The app goes here</Provider>;
};

export default App;
