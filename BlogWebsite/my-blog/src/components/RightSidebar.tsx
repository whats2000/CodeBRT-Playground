import React from 'react';

const RightSidebar: React.FC = () => {
  return (
    <div style={{ 
      width: '250px', 
      padding: '20px', 
      borderLeft: '1px solid #eee', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>相關資訊</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#666', marginBottom: '10px' }}>熱門文章</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '5px' }}>
            <a href="#" style={{ 
              textDecoration: 'none', 
              color: '#0066cc',
              transition: 'color 0.3s ease'
            }}>React 最佳實踐</a>
          </li>
          <li style={{ marginBottom: '5px' }}>
            <a href="#" style={{ 
              textDecoration: 'none', 
              color: '#0066cc',
              transition: 'color 0.3s ease'
            }}>TypeScript 進階技巧</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 style={{ color: '#666', marginBottom: '10px' }}>最新文章</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '5px' }}>
            <a href="#" style={{ 
              textDecoration: 'none', 
              color: '#0066cc',
              transition: 'color 0.3s ease'
            }}>2023 年度回顧</a>
          </li>
          <li style={{ marginBottom: '5px' }}>
            <a href="#" style={{ 
              textDecoration: 'none', 
              color: '#0066cc',
              transition: 'color 0.3s ease'
            }}>開發者成長之路</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;