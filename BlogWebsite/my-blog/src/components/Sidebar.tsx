import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div style={{ 
      width: '250px', 
      padding: '20px', 
      borderRight: '1px solid #eee', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>導覽</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <a href="/" style={{ 
            textDecoration: 'none', 
            color: '#0066cc', 
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}>首頁</a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="/articles" style={{ 
            textDecoration: 'none', 
            color: '#0066cc', 
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}>文章列表</a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="/about" style={{ 
            textDecoration: 'none', 
            color: '#0066cc', 
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}>關於我</a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="/contact" style={{ 
            textDecoration: 'none', 
            color: '#0066cc', 
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}>聯絡方式</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;