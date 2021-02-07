//@flow
import * as React from 'react';
import Layout from './components/Layout/Layout';
import News from './components/News/News';

function App(): React.Node {
  return (
    <Layout>
      <News />
    </Layout>
  );
}

export default App;
