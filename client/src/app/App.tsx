import { FC } from 'react';
import { Provider } from 'react-redux';
import { rootStore } from './store/rootStore';
import { Header } from './layout/Header';
import { PartyTable } from '../features/party/PartyTable';
import { PlanConfiguration } from '../features/plan/PlanConfiguration';

const App: FC = () => {
  return (
    <Provider store={rootStore}>
      <Header />
      <PartyTable />
      <PlanConfiguration />
    </Provider>
  );
};

export default App;
