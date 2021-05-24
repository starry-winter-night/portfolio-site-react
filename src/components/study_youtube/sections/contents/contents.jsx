import React from 'react';
import { useHistory } from 'react-router';
import styles from './contents.module.css';

const Contents = ({ videoPlay, onMyList }) => {
  const history = useHistory();

  const video = videoPlay.snippet;
  const developVideoId = video?.resourceId?.videoId;
  const searchVideoId = videoPlay.id;

  let videoId = developVideoId;
  let channelId = video.videoOwnerChannelId;

  if (!videoId) videoId = searchVideoId;
  if (!channelId) channelId = video.channelId;

  const onVideoSave = (e) => {
    e.preventDefault();

    onMyList(videoPlay);
  };

  const onSummary = (e) => {
    e.preventDefault();

    history.push({
      pathname: '/summary',
      state: { videoId, title: video.title },
    });
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
        <button className={styles.summary} onClick={onSummary}>
          요약노트
        </button>
        <button className={styles.save} onClick={onVideoSave}>
          저장하기
        </button>
        <a
          className={styles.channel}
          href={`https://www.youtube.com/channel/${channelId}/videos`}
          target="noopener"
        >
          채널방문
        </a>
      </div>
    </section>
  );
};

export default Contents;
