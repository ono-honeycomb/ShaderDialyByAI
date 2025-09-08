import React from 'react';

type CodeViewerProps = {
  code: string;
};

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 2,
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        padding: '10px',
        pointerEvents: 'none',
        resize: 'none',
      }}
    >
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
