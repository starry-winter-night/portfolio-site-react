import React, { useMemo } from 'react';
import style from './loading.module.css';

const Loading = ({ styles }) => {
  styles = useMemo(() => {
    console.log('??');
    return styles ? styles : style;
  }, [styles]);

  return (
    <div className={styles.loadingBox}>
      <img
        className={styles.loading}
        src="/imgs/loading.gif"
        alt="loading.gif"
      ></img>
    </div>
  );
};

export default Loading;
