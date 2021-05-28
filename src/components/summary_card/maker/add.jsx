import React, { useEffect, useRef } from 'react';
import styles from './maker.module.css';
import Button from '../../common/button/button';
import ImageInput from '../../common/button/imageInput';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const Add = ({ cards, onAddOrUpdateCard, selectCardId }) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const bookmarkRef = useRef();
  const formRef = useRef();

  const selectedId = selectCardId === 'preview' ? 'preview' : selectCardId;
  const buttonValue = selectCardId === 'preview' ? 'Add' : 'Edit';

  useEffect(() => {
    if (!cards[selectedId]) return;
    const selectedCard = cards[selectedId];

    titleRef.current.value = selectedCard.title || '';
    subtitleRef.current.value = selectedCard.subTitle || '';
    editorRef.current.getInstance().setHtml(selectedCard.description);

    if (selectedCard.bookmark) {
      bookmarkRef.current.value = selectedCard.bookmark;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const onChange = (e) => {
    if (e.currentTarget || e.source) {
      let name = '';
      let value = '';

      if (e.source) {
        name = 'description';
        value = editorRef.current.getInstance().getHtml();
      } else if (e.currentTarget) {
        e.preventDefault();

        name = e.currentTarget.name;
        value = e.currentTarget.value;
      }

      if (value === '') return;

      onAddOrUpdateCard({
        ...cards[selectedId],
        [name]: value,
        id: selectedId,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const id = selectedId === 'preview' ? Date.now() : selectedId;

    const card = {
      id: id,
      title: titleRef.current.value || '',
      subTitle: subtitleRef.current.value || '',
      description: editorRef.current.getInstance().getHtml() || '',
      bookmark: bookmarkRef.current.value,
    };

    formRef.current.reset();
    editorRef.current.getInstance().setHtml();

    const submitType = buttonValue;

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
      <div className={styles.fileInput}>
        <ImageInput name="Logo" imageInputButton={styles.imageInputButton} />
      </div>
      <input
        className={styles.cardSubtitle}
        type="text"
        name="subTitle"
        placeholder="Subtitle"
        ref={subtitleRef}
        onChange={onChange}
      ></input>
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
        onClick={onSubmit}
      />
    </form>
  );
};

export default Add;
