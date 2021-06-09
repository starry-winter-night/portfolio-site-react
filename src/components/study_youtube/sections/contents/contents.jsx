import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './contents.module.css';
import Video from '../../../common/youtube/video';
import Card from '../../../summary_card/preview/card';

const Contents = memo(({ videoPlay, onVideoSave, summaryCard }) => {
  const [cards, setCards] = useState({});

  const history = useHistory();
  const auth = localStorage.getItem('state');
  const getVideo = localStorage.getItem('video');

  const video = JSON.parse(getVideo) || videoPlay.snippet;

  const developVideoId = video?.resourceId?.videoId;
  const searchVideoId = videoPlay.id;

  let videoId = developVideoId;
  let channelId = video.videoOwnerChannelId;

  if (!videoId) videoId = searchVideoId;
  if (!channelId) channelId = video.channelId;

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    onVideoSave(videoPlay);
  };

  const onSummaryCardButtonClick = (e) => {
    e.preventDefault();

    history.push({
      pathname: '/summary',
      state: { videoId, title: video.title },
    });
  };

  useEffect(() => {
    summaryCard.readCard(auth, videoId, (result) => {
      if (result) {
        setCards(result);
      } else {
        setCards({});
      }
    });

    return () => {
      setCards({});
    };
  }, [auth, summaryCard, videoId]);

  return (
    <section className={styles.contents}>
      <div className={styles.videoBox}>
        <Video videoId={videoId} height="600px" />
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{video.title}</h3>
        <button className={styles.summary} onClick={onSummaryCardButtonClick}>
          요약노트
        </button>
        <button className={styles.save} onClick={onSaveButtonClick}>
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
      {Object.keys(cards).length !== 0 &&
        Object.keys(cards)
          .sort()
          .map(
            (key) =>
              previewCheck(cards[key]) && (
                <Card key={key} card={cards[key]} styles={styles} />
              )
          )}
    </section>
  );
});

function previewCheck(card) {
  if (!card.title && !card.subTitle && !card.logoURL) {
    return false;
  } else {
    return true;
  }
}

export default Contents;
