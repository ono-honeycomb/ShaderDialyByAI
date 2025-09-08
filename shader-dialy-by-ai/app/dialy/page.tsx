import React from 'react';

const DiaryCover: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5e6ca 0%, #d4b483 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Georgia', serif",
      }}
    >
      <div
        style={{
          background: '#fffbe6',
          border: '4px solid #d4b483',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(212,180,131,0.15)',
          padding: '48px 32px',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <h1
          style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#b3925a' }}
        >
          Shader Diary
        </h1>
        <p
          style={{ fontSize: '1.2rem', color: '#7c6a4c', marginBottom: '32px' }}
        >
          日々のシェーダー学習記録
        </p>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #b3925a 60%, #fffbe6 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: '#fffbe6',
            boxShadow: '0 4px 16px rgba(180,146,90,0.15)',
          }}
        >
          📓
        </div>
        <span style={{ color: '#b3925a', fontWeight: 'bold' }}>2024</span>
      </div>
    </div>
  );
};

export default DiaryCover;
