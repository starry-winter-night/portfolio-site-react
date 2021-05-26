import React from 'react';

const Button = ({ name, addButton, onClick }) => (
  <button className={addButton} onClick={onClick}>
    {name}
  </button>
);

export default Button;
