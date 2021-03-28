import { FC } from 'react';
import { Provider } from 'react-redux';
import { rootStore } from './store/rootStore';
import { Header } from './layout/Header';
import { PartyTable } from '../features/party/PartyTable';
import { NightWatchConfig } from '../features/config/NightWatchConfig';

const App: FC = () => {
  return (
    <Provider store={rootStore}>
      <Header />
      <PartyTable />
      <NightWatchConfig />
    </Provider>
  );
};

export default App;
