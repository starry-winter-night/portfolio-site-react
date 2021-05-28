import React from 'react';

const Button = ({ value, buttonStyle, onClick }) => (
  <button className={buttonStyle} onClick={onClick}>
    {value}
  </button>
);

export default Button;
