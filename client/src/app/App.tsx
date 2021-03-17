import { FC } from 'react';
import { Provider } from 'react-redux';
import { rootStore } from './store/rootStore';
import { Header } from './layout/Header';

const App: FC = () => {
  return (
    <Provider store={rootStore}>
      <Header />
    </Provider>
  );
};

export default App;
