import React, { useCallback, useEffect, useRef, memo } from 'react';
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

const Write = memo(({ cards, selectedCard, cloudinary, onUpdateCard }) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const bookmarkRef = useRef();
  const formRef = useRef();

  const key = selectedCard.id;

  const { title, subTitle, description, bookmark, logoName } = cards[key];

  useEffect(() => {
    if (!cards[key]) return;

    titleRef.current.value = title || '';
    subtitleRef.current.value = subTitle || '';
    editorRef.current.getInstance().setHtml(description || '');

    if (bookmark) {
      bookmarkRef.current.value = bookmark;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const onImageChange = (image) => {
    const card = {
      ...cards[key],
      logoURL: image.url,
      logoName: image.name,
      id: key,
    };

    onUpdateCard(card);
  };

  const onContentsChange = (e) => {
    if (e.currentTarget || e.source) {
      let card = {};
      let name = '';
      let value = '';

      if (e.currentTarget) {
        e.preventDefault();

        name = e.currentTarget?.name;
        value = e.currentTarget?.value;
      } else {
        name = 'description';
        value = editorRef.current.getInstance().getHtml();

        editorRef.current
          .getInstance()
          .addHook('addImageBlobHook', async (img) => {
            const uploaded = await cloudinary.imageUpload(img);

            const image = `<img src=${uploaded.url} alt=${uploaded.original_filename}>`;

            value = value + image;
            editorRef.current.getInstance().setHtml(value, true);
          });
      }

      card = {
        ...cards[key],
        [name]: value,
        id: key,
      };

      if (!value) delete card[name];

      if (JSON.stringify(card) === JSON.stringify(cards[key])) return;

      onUpdateCard(card);
    }
  };

  const onReset = useCallback(
    (e) => {
      e.preventDefault();

      const card = {
        ...cards[key],
        logoURL: null,
        logoName: null,
      };

      onUpdateCard(card);
    },
    [cards, key, onUpdateCard]
  );

  return (
    <>
      <form className={styles.form} ref={formRef}>
        <input
          className={styles.cardTitle}
          type="text"
          name="title"
          placeholder="Title"
          ref={titleRef}
          onChange={onContentsChange}
        ></input>
        <input
          className={styles.cardSubtitle}
          type="text"
          name="subTitle"
          placeholder="Subtitle"
          ref={subtitleRef}
          onChange={onContentsChange}
        ></input>
        <div className={styles.fileInput}>
          <ImageInput
            word={logoName}
            imageLabelStyle={styles.imageLabel}
            name="logoImage"
            onImageChange={onImageChange}
            cloudinary={cloudinary}
          />
        </div>
        <Button
          value={<FontAwesomeIcon icon={faRedoAlt} />}
          onClick={onReset}
          buttonStyle={styles.reset}
        />
        <select
          className={styles.select}
          name="bookmark"
          ref={bookmarkRef}
          onChange={onContentsChange}
        >
          <option value="firebrick">firebrick</option>
          <option value="tomato">tomato</option>
          <option value="gold">gold</option>
          <option value="yellowgreen">yellowgreen</option>
          <option value="steelblue">steelblue</option>
          <option value="skyblue">skyblue</option>
          <option value="darkorchid">darkorchid</option>
          <option value="ivory">ivory</option>
        </select>

        <div className={styles.editor}>
          <Editor
            className={styles.toastEditor}
            previewStyle="tab"
            height="auto"
            previewHighlight={false}
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            usageStatistics={false}
            hideModeSwitch={true}
            plugins={[colorSyntax, tableMergedCell]}
            ref={editorRef}
            onChange={onContentsChange}
          />
        </div>
      </form>
    </>
  );
});

export default Write;
