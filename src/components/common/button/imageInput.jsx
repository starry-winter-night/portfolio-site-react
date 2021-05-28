import React from 'react';
const ImageInput = ({ name, imageInputStyle, imageInputAddStyle }) => (
  <button className={`${imageInputStyle} ${imageInputAddStyle}`}>{name}</button>
);

export default ImageInput;
