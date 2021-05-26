import React, { useRef } from 'react';
import styles from './maker.module.css';
import Button from '../../common/button/button';
import ImageInput from '../../common/button/imageInput';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const Add = ({ onAdd }) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const subTitle = subtitleRef.current.value;
    const description = editorRef.current.getInstance().getHtml();

    onAdd(title, subTitle, description);
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.cardTitle}
        type="text"
        name="title"
        placeholder="Title"
        ref={titleRef}
      ></input>
      <select className={styles.select}>
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
        name="subtitle"
        placeholder="Subtitle"
        ref={subtitleRef}
      ></input>
      <div className={styles.editor}>
        <Editor
          className={styles.toastEditor}
          initialValue=""
          height="auto"
          previewStyle="tab"
          previewHighlight={false}
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          usageStatistics={true}
          ref={editorRef}
        />
      </div>

      <Button name="Add" addButton={styles.addButton} onClick={onSubmit} />
    </form>
  );
};

export default Add;