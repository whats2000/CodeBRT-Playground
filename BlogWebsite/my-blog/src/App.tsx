import React from 'react';
import Layout from './components/Layout.tsx';
import MainContent from './components/MainContent.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
};

export default App;