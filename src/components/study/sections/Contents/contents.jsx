import React, { memo } from 'react';
import styles from './contents.module.css';

const Contents = memo(({ items }) => {
  const video = items.snippet;
  console.log(video);
  return (
    <section className={styles.contents}>
      <div className={styles.videoBox}>
        <iframe
          type="text/html"
          title="youtube video player"
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${video.resourceId.videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{video.title}</h3>
        <button className={styles.channel}>채널방문</button>
      </div>
    </section>
  );
});

export default Contents;
