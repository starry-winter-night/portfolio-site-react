import React, { useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Button from '../../common/button/button';
import ImageInput from '../../common/button/imageInput';
import styles from './maker.module.css';

const Write = ({
  cards,
  onAddOrUpdateCard,
  selectCardId,
  cloudinary,
  onLoadingStart,
}) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const bookmarkRef = useRef();
  const imageRef = useRef();
  const labelRef = useRef();
  const formRef = useRef();

  const selectedId = selectCardId === 'preview' ? 'preview' : selectCardId;
  const buttonValue = selectCardId === 'preview' ? 'Add' : 'Edit';
  const addStyle = buttonValue === 'Edit' ? styles.edit : '';

  useEffect(() => {
    if (!cards[selectedId]) return;

    const {
      title, //
      subTitle,
      description,
      logoName,
      logoURL,
      bookmark,
    } = cards[selectedId];

    titleRef.current.value = title || '';
    subtitleRef.current.value = subTitle || '';
    editorRef.current.getInstance().setHtml(description || '');
    labelRef.current.innerText = logoName || 'No Image';
    imageRef.current.src = logoURL || '';

    if (bookmark) {
      bookmarkRef.current.value = bookmark;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const onChange = (e) => {
    if (e.currentTarget || e.source) {
      const type = buttonValue;
      let name = '';
      let value = '';

      if (e.source) {
        name = 'description';
        value = editorRef.current.getInstance().getHtml();
      }

      if (e.currentTarget) {
        e.preventDefault();

        name = e.currentTarget?.name;
        value = e.currentTarget?.value;

        if (e.currentTarget.files) {
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              name = 'logoURL';
              value = reader.result;

              const card = {
                ...cards[selectedId],
                [name]: value,
                id: selectedId,
              };

              onAddOrUpdateCard(card, type);
            },
            false
          );

          labelRef.current.innerText = e.currentTarget.files[0].name;

          reader.readAsDataURL(e.currentTarget.files[0]);

          return;
        }
      }

      const card = {
        ...cards[selectedId],
        [name]: value,
        id: selectedId,
      };

      onAddOrUpdateCard(card, type);
      return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const id = selectedId === 'preview' ? Date.now() : selectedId;
    const title = titleRef.current.value || '';
    const subTitle = subtitleRef.current.value || '';
    const logo = imageRef.current.files[0] || '';
    const description = editorRef.current.getInstance().getHtml() || '';
    const bookmark = bookmarkRef.current.value;
    const submitType = buttonValue;

    const card = {
      id,
      title,
      subTitle,
      description,
      bookmark,
    };

    formRef.current.reset();
    labelRef.current.innerText = 'No Image';
    editorRef.current.getInstance().setHtml();

    if (!logo) {
      if (buttonValue === 'Edit') {
        card.logoName = cards[id].logoName;
        card.logoURL = cards[id].logoURL;
      }
    } else {
      onLoadingStart(id, submitType);

      const uloaded = await cloudinary.imageUpload(logo);

      card.logoName = uloaded.original_filename;
      card.logoURL = uloaded.url;
    }

    onAddOrUpdateCard(card, submitType);
  };

  return (
    <form className={styles.form} ref={formRef}>
      <input
        className={styles.cardTitle}
        type="text"
        name="title"
        placeholder="Title"
        ref={titleRef}
        onChange={onChange}
      ></input>
      <input
        className={styles.cardSubtitle}
        type="text"
        name="subTitle"
        placeholder="Subtitle"
        ref={subtitleRef}
        onChange={onChange}
      ></input>
      <div className={`${styles.fileInput} ${addStyle}`}>
        <ImageInput
          word="No Image"
          imageLabelStyle={styles.imageLabel}
          name="logoImage"
          onChange={onChange}
          ref={{ imageRef, labelRef }}
        />
      </div>
      <select
        className={styles.select}
        name="bookmark"
        ref={bookmarkRef}
        onChange={onChange}
      >
        <option value="light">light</option>
        <option value="pink">pink</option>
        <option value="colorful">colorful</option>
      </select>

      <div className={styles.editor}>
        <Editor
          className={styles.toastEditor}
          height="auto"
          previewStyle="tab"
          previewHighlight={false}
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          usageStatistics={true}
          ref={editorRef}
          onChange={onChange}
        />
      </div>

      <Button
        value={buttonValue}
        buttonStyle={styles.submitButton}
        buttonAddStyle={addStyle}
        onClick={onSubmit}
      />
    </form>
  );
};

export default Write;
