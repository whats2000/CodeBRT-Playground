import React from 'react';
import Sidebar from './Sidebar.tsx';
import MainContent from './MainContent.tsx';
import RightSidebar from './RightSidebar.tsx';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
        {children}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Layout;