import React, { memo } from 'react';
import styles from './contents.module.css';

const Contents = memo(({ videoPlay, onMyList }) => {
  const video = videoPlay.snippet;
  const developVideoId = video?.resourceId?.videoId;
  const searchVideoId = videoPlay.id.videoId;
  const videoId = developVideoId ? developVideoId : searchVideoId;

  const onVideoSave = (e) => {
    e.preventDefault();

    onMyList(videoPlay);
  };

  return (
    <section className={styles.contents}>
      <div className={styles.videoBox}>
        <iframe
          type="text/html"
          title="youtube video player"
          width="100%"
          height="600px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{video.title}</h3>
        <button className={styles.save} onClick={onVideoSave}>
          저장하기
        </button>
        <a
          className={styles.channel}
          href={`https://www.youtube.com/channel/${video.videoOwnerChannelId}/videos`}
          target="noopener"
        >
          채널방문
        </a>
      </div>
    </section>
  );
});

export default Contents;
