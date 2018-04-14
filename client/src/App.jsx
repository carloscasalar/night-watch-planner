import React from 'react';
import './App.less';
import Layout from './components/Layout/Layout';
import PartyBuilder from './containers/PartyBuilder/PartyBuilder';

const app = () => (
  <div className="App">
    <Layout >
      <PartyBuilder />
    </Layout>
  </div>
);

export default app;
