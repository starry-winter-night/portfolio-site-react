import React, { useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

import ImageInput from '../../common/button/imageInput';
import Button from '../../common/button/button';
import styles from './maker.module.css';

const Write = ({
  cards,
  selectedCard,
  cloudinary,
  onLoadingStart,
  onUpdateCard,
}) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const bookmarkRef = useRef();
  const imageRef = useRef();
  const labelRef = useRef();
  const formRef = useRef();

  const key = selectedCard.id;
  const state = selectedCard.state;

  useEffect(() => {
    if (!cards[key]) return;

    const {
      title, //
      subTitle,
      description,
      logoName,
      logoURL,
      bookmark,
    } = cards[key];

    titleRef.current.value = title || '';
    subtitleRef.current.value = subTitle || '';
    editorRef.current.getInstance().setHtml(description || '');
    labelRef.current.innerText = logoName || 'No Image';
    imageRef.current.src = logoURL || '';

    if (bookmark) {
      bookmarkRef.current.value = bookmark;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state]);

  const onChange = (e) => {
    if (e.currentTarget || e.source) {
      let card = {};
      let name = '';
      let value = '';

      if (e.source) {
        name = 'description';
        value = editorRef.current.getInstance().getHtml();
      }

      if (e.currentTarget) {
        e.preventDefault();

        if (e.currentTarget.files) {
          const logo = e.currentTarget.files[0];

          if (!logo) {
            labelRef.current.innerText = 'No Image';

            card = {
              ...cards[key],
              logoURL: 'imgs/note.png',
              logoName: 'note.png',
              id: key,
            };

            onUpdateCard(card);

            return;
          }

          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              card = {
                ...cards[key],
                logoURL: reader.result,
                logoName: logo.name,
                id: key,
              };

              onUpdateCard(card);
            },
            false
          );

          labelRef.current.innerText = logo.name;

          reader.readAsDataURL(logo);

          return;
        }

        name = e.currentTarget?.name;
        value = e.currentTarget?.value;
      }

      card = {
        ...cards[key],
        [name]: value,
        id: key,
      };

      if (!value) delete card[name];

      if (JSON.stringify(card) === JSON.stringify(cards[key])) {
        return;
      }

      onUpdateCard(card);
    }
  };

  const onReset = useCallback(
    (e) => {
      e.preventDefault();

      formRef.current.reset();
      labelRef.current.innerText = 'No Image';
      editorRef.current.getInstance().reset();

      const card = {
        id: key,
      };

      onUpdateCard(card);
    },
    [key, onUpdateCard]
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    const logo = imageRef.current.files[0] || '';

    const card = {
      id: key === 'preview' ? Date.now() : key,
    };

    if (logo) {
      onLoadingStart(card.id);

      await cloudinary.imageUpload(logo);
    }

    console.log(card);

    // onAddCard(card);
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
      <div className={styles.fileInput}>
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
      <Button
        value={<FontAwesomeIcon icon={faRedoAlt} />}
        onClick={onReset}
        buttonStyle={styles.reset}
      />
      <div className={styles.editor}>
        <Editor
          className={styles.toastEditor}
          previewStyle="tab"
          height="250px"
          previewHighlight={false}
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          usageStatistics={false}
          hideModeSwitch={true}
          plugins={[colorSyntax, tableMergedCell]}
          ref={editorRef}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default Write;
