import React from 'react';
const Loading = ({ styles }) => {
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
