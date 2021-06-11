import React, { memo, useRef, useState } from 'react';
import styles from './imageInput.module.css';
import Loading from '../loading/loading';

const ImageInput = memo(({
  imageLabelStyle,
  name,
  onImageChange,
  cloudinary,
  word,
}) => {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const labelRef = useRef();

  const onLabelClick = (e) => {
    e.preventDefault();

    inputRef.current.click();
  };

  const onChange = async (e) => {
    e.preventDefault();

    let image = {};

    if (!e.currentTarget.files) {
      labelRef.current.label = 'No Image';

      return;
    }

    const logo = e.target.files[0];

    if (!logo) {
      image = {
        url: 'imgs/note.png',
        name: 'No Image',
      };

      labelRef.current.innerText = image.name;
    } else {
      setLoading(true);

      const uploaded = await cloudinary.imageUpload(logo);

      image = {
        url: uploaded.url,
        name: `${uploaded.original_filename}.${uploaded.format}`,
      };

      labelRef.current.innerText = image.name;

      setLoading(false);

      inputRef.current.value = null;
    }

    onImageChange(image);
  };

  return (
    <>
      <label
        className={imageLabelStyle}
        htmlFor={name}
        ref={labelRef}
        onClick={onLabelClick}
      >
        {word || 'No Image'}
      </label>
      <input
        type="file"
        accept="image/*"
        name="imageName"
        className={styles.input}
        id={name}
        ref={inputRef}
        onChange={onChange}
      ></input>
      {loading && <Loading styles={styles} />}
    </>
  );
});

export default ImageInput;
