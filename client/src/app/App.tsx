import { type FC } from 'react'
import { Provider } from 'react-redux'

import { rootStore } from './store/rootStore'
import { Header } from './layout/Header'
import { PartyTable } from '../features/party/PartyTable'
import { NightWatchConfig } from '../features/config/NightWatchConfig'
import { PlanPanel } from '../features/plan/PlanPanel'

const App: FC = () => (
    <Provider store={rootStore}>
      <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50">
        <Header />
        <PartyTable />
        <NightWatchConfig />
        <PlanPanel />
      </div>
    </Provider>
)

export default App
