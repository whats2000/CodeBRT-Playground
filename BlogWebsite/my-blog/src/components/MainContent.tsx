import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6' }}>
      <h1 style={{ 
        color: '#333', 
        borderBottom: '2px solid #eee', 
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>歡迎來到我的部落格</h1>
      <p style={{ 
        color: '#666', 
        fontSize: '16px',
        marginBottom: '15px'
      }}>這是一個範例文章的內容，之後會顯示文章的詳細資訊。</p>
      <p style={{ 
        color: '#666', 
        fontSize: '16px'
      }}>
        這個部落格將分享我的技術心得、生活觀察以及個人成長的點滴。
        歡迎大家一起交流和討論。
      </p>
    </div>
  );
};

export default MainContent;