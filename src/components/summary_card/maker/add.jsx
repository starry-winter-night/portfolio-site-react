import React, { useRef } from 'react';
import styles from './maker.module.css';
import Button from '../../common/button/button';
import ImageInput from '../../common/button/imageInput';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const Add = ({ cards, onAddOrUpdateCard, selectCard }) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const bookmarkRef = useRef();
  const formRef = useRef();

  const { title, subTitle, description, bookmark } = cards;
  const id = !selectCard ? 'preview' : selectCard;

  const onChange = (e) => {
    if (e.currentTarget || e.source) {
      if (e.source) {
        const NAME = 'description';

        onAddOrUpdateCard({
          ...cards[id],
          [NAME]: editorRef.current.getInstance().getHtml(),
          id,
        });

        return;
      }

      if (e.currentTarget) {
        e.preventDefault();

        const name = e.currentTarget.name;

        onAddOrUpdateCard({
          ...cards[id],
          [name]: e.currentTarget.value,
          id,
        });

        return;
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const card = {
      id: Date.now(),
      title: titleRef.current.value || '',
      subTitle: subtitleRef.current.value || '',
      description: editorRef.current.getInstance().getHtml() || '',
      bookmark: bookmarkRef.current.value,
    };

    formRef.current.reset();
    editorRef.current.getInstance().setHtml('');

    onAddOrUpdateCard(card);
  };

  return (
    <form className={styles.form} ref={formRef}>
      <input
        className={styles.cardTitle}
        type="text"
        name="title"
        placeholder="Title"
        ref={titleRef}
        value={title}
        onChange={onChange}
      ></input>
      <select
        className={styles.select}
        name="bookmark"
        ref={bookmarkRef}
        value={bookmark}
        onChange={onChange}
      >
        <option value="light">light</option>
        <option value="pink">pink</option>
        <option value="colorful">colorful</option>
      </select>
      <div className={styles.fileInput}>
        <ImageInput
          name="Logo Image"
          imageInputButton={styles.imageInputButton}
        />
      </div>
      <input
        className={styles.cardSubtitle}
        type="text"
        name="subTitle"
        placeholder="Subtitle"
        ref={subtitleRef}
        vlaue={subTitle}
        onChange={onChange}
      ></input>
      <div className={styles.editor}>
        <Editor
          className={styles.toastEditor}
          initialValue={description}
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

      <Button name="Add" addButton={styles.addButton} onClick={onSubmit} />
    </form>
  );
};

export default Add;
