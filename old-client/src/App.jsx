import React from 'react';
import './App.less';
import Layout from './components/Layout/Layout';
import PartyBuilder from './containers/PartyBuilder/PartyBuilder';
import PlanTable from './containers/Plan/PlanTable';

const app = () => (
  <div className="App">
    <Layout >
      <PartyBuilder />
      <PlanTable />
    </Layout>
  </div>
);

export default app;
