import { ApolloProvider } from '@apollo/client';

import './App.less';

import { Header } from './components/Header';
import { ShipmentList } from './components/ShipmentList';
import client from './utils/api';

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <main className="main">
        <ShipmentList />
      </main>
    </ApolloProvider>
  );
}

export default App;
