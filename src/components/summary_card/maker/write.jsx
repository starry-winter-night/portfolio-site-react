import React, { useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import ImageInput from '../../common/button/imageInput';
import styles from './maker.module.css';

const Write = ({
  cards,
  onAddCard,
  onUpdateCard,
  selectedCard,
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

  const key = selectedCard;
  const type = selectedCard === 'preview' ? 'Add' : 'Edit';
  const addStyle = type === 'Edit' ? styles.edit : '';

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
    const dd = editorRef.current.getInstance();
    console.log(dd);
    titleRef.current.value = title || '';
    subtitleRef.current.value = subTitle || '';
    editorRef.current.getInstance().setHtml(description || '');
    labelRef.current.innerText = logoName || 'No Image';
    imageRef.current.src = logoURL || '';

    if (bookmark) {
      bookmarkRef.current.value = bookmark;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const onChange = (e) => {
    if (e.currentTarget || e.source) {
      let name = '';
      let value = '';

      if (e.source) {
        name = 'description';
        value = editorRef.current.getInstance().getHtml();

        if (!value) return;
      }

      if (e.currentTarget) {
        e.preventDefault();

        if (e.currentTarget.files) {
          const logo = e.currentTarget.files[0];
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              const logoURL = reader.result;

              const card = {
                ...cards[key],
                logoURL,
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

      const card = {
        ...cards[key],
        [name]: value,
        id: key,
      };

      onUpdateCard(card);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const logo = imageRef.current.files[0] || '';

    const card = {
      id: key === 'preview' ? Date.now() : key,
    };

    formRef.current.reset();
    labelRef.current.innerText = 'No Image';
    editorRef.current.getInstance().reset();

    if (logo) {
      onLoadingStart(card.id);

      await cloudinary.imageUpload(logo);
    }

    console.log(card);

    onAddCard(card);
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
          previewStyle="tab"
          height="250px"
          previewHighlight={false}
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          usageStatistics={false}
          hideModeSwitch={true}
          plugins={[
            colorSyntax,
            tableMergedCell,
            codeSyntaxHighlight,
            { hljs },
          ]}
          ref={editorRef}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default Write;
