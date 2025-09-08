import React from 'react';

type AIStatusProps = {
  status: string;
};

const AIStatus: React.FC<AIStatusProps> = ({ status }) => {
  return (
    <div
      style={{
        position: 'absolute',
        // top: "20px",
        // right: "20px",
        padding: '0px 3px 3px 2px',
        left: '10px',
        zIndex: 2,
        backgroundColor: 'black',
        color: 'white',
        pointerEvents: 'none',
        height: '15px',
        fontSize: '10px',
      }}
    >
      <pre>
        <p>{status}</p>
      </pre>
    </div>
  );
};

export default AIStatus;
