import React, { forwardRef } from 'react';
import styles from './imageInput.module.css';

const ImageInput = forwardRef(({ imageLabelStyle, name, onChange }, ref) => {
  const { labelRef, imageRef } = ref;

  return (
    <>
      <label className={imageLabelStyle} htmlFor={name} ref={labelRef}></label>
      <input
        type="file"
        accept="image/*"
        name="logoName"
        className={styles.input}
        id={name}
        onChange={onChange}
        ref={imageRef}
      ></input>
    </>
  );
});

export default ImageInput;
