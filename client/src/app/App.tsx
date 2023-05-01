import { type FC } from 'react'
import { Provider } from 'react-redux'

import { rootStore } from './store/rootStore'
import { Header } from './layout/Header'
import { PartyTable } from '../features/party/PartyTable'
import { NightWatchConfig } from '../features/config/NightWatchConfig'
import { PlanPanel } from '../features/plan/PlanPanel'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App: FC = () => (
    <Provider store={rootStore}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50">
          <Header />
          <PartyTable />
          <NightWatchConfig />
          <PlanPanel />
        </div>
      </QueryClientProvider>
    </Provider>
)

export default App
