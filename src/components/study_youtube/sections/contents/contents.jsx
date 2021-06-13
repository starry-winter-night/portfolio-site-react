import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './contents.module.css';
import Video from '../../../common/youtube/video';
import Card from '../../../summary_card/preview/card';
import Dropbox from '../../../common/button/dropbox';

const Contents = memo(({ videoPlay, onVideoSave, cardRepo, etcToggleId }) => {
  const [cards, setCards] = useState({});

  const history = useHistory();
  const list = ['요약카드', '저장하기', '채널방문'];
  const auth = localStorage.getItem('state');
  const getVideo = JSON.parse(localStorage.getItem('video')) || videoPlay;

  const video = getVideo?.snippet || videoPlay?.snippet;

  const developVideoId = video?.resourceId?.videoId;
  const searchVideoId = getVideo?.id;

  let videoId = developVideoId;
  let channelId = video.videoOwnerChannelId;

  if (!videoId) videoId = searchVideoId;
  if (!channelId) channelId = video.channelId;

  const goToSummary = () => {
    history.push({
      pathname: '/summary',
      state: { videoId, title: video.title },
    });
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    onVideoSave(getVideo, videoId);
  };

  const onSummaryCardButtonClick = (e) => {
    e.preventDefault();

    goToSummary();
  };

  const onDropBoxListClick = (text) => {
    switch (text) {
      case '요약카드':
        goToSummary();
        break;
      case '저장하기':
        onVideoSave(getVideo, videoId);
        break;
      case '채널방문':
        window.open(
          `https://www.youtube.com/channel/${channelId}/videos`,
          '_blank'
        );

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    cardRepo.readCard(auth, videoId, (result) => {
      if (result) {
        setCards(result);
      } else {
        setCards({});
      }
    });

    return () => {
      setCards({});
    };
  }, [auth, cardRepo, videoId]);

  return (
    <section className={styles.contents}>
      <div className={styles.videoBox}>
        <Video videoId={videoId} height="600" styles={styles} />
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{video.title}</h3>
        <Dropbox
          etcToggleId={etcToggleId}
          list={list}
          listClick={onDropBoxListClick}
          styles={styles}
          dropboxId={'contentButton'}
        />
        <button className={styles.summary} onClick={onSummaryCardButtonClick}>
          요약카드
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
