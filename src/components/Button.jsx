import React from 'react'

const Button = ({ children, onClick, color }) => {
  if (color) {
    return (
      <button
        style={{
          backgroundColor: color,
          border: "none",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return <button onClick={onClick}>{children}</button>;
};

export default Button