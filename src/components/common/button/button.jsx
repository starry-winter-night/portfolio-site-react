import React from 'react';

const Button = ({ value, onClick, buttonStyle, buttonAddStyle }) => (
  <button className={`${buttonStyle} ${buttonAddStyle}`} onClick={onClick}>
    {value}
  </button>
);

export default Button;
