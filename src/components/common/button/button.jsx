import React, { memo } from 'react';

const Button = memo(({ value, onClick, buttonStyle, buttonAddStyle }) => (
  <button className={`${buttonStyle} ${buttonAddStyle}`} onClick={onClick}>
    {value}
  </button>
));

export default Button;
