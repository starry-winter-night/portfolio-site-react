import React from 'react';
import styles from './edit.module.css';
import Button from '../../common/button/button';
import ImageInput from '../../common/image_input/imageInput';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const Edit = ({ title, subtitle }) => {
  const onSubmit = () => {};
  return (
    <form className={styles.form}>
      <input
        className={styles.title}
        type="text"
        name="title"
        placeholder="title"
        value={title}
      ></input>
      <select className={styles.select}>
        <option value="light">light</option>
        <option value="pink">pink</option>
        <option value="colorful">colorful</option>
      </select>
      <div className={styles.fileInput}>
        <ImageInput />
      </div>
      <input
        className={styles.subtitle}
        type="text"
        name="subtitle"
        placeholder="subtitle"
        value={subtitle}
      ></input>

      <Editor
        className={styles.toastEditor}
        initialValue=""
        height="auto"
        previewStyle="tab"
        previewHighlight={false}
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        usageStatistics={true}
      />

      <div className={styles.deleteButton}>
        <Button name="Delete" onClick={onSubmit} />
      </div>
    </form>
  );
};

export default Edit;
