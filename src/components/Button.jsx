import React from 'react';

const Button = ({ children, onClick, color }) => {
  if (color) {
    return (
      <button
        style={{
          bottom: "0",
          width: "120px",
          backgroundColor: color,
          border: "none",
          minWidth: "fitContent",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return <button onClick={onClick}>{children}</button>;
};

export default Button;