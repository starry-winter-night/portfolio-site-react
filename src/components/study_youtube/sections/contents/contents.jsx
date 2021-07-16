import React, { memo } from 'react';
import { useHistory } from 'react-router';
import styles from './contents.module.css';
import Video from '../../../common/youtube/video';
import Card from '../../../summary_card/preview/card';
import Dropbox from '../../../common/button/dropbox';

const Contents = memo(({ videoPlay, onVideoSave, etcToggleId }) => {
  const history = useHistory();
  const list = ['요약카드', '저장하기', '채널방문'];

  const video = videoPlay.snippet;

  const videoId = video?.resourceId?.videoId || videoPlay?.id;
  const channelId = video.videoOwnerChannelId || video.channelId;

  const goToSummary = () => {
    history.push({
      pathname: '/summary',
      state: { videoId, title: video.title },
    });
  };

  const onSaveButtonClick = (e) => {
    alert('My list에 저장 되었습니다.');

    onVideoSave(videoPlay, videoId);
  };

  const onSummaryCardButtonClick = (e) => {
    onVideoSave(videoPlay, videoId);

    goToSummary();
  };

  const onDropBoxListClick = (text) => {
    switch (text) {
      case '요약카드':
        onSummaryCardButtonClick();
        break;
      case '저장하기':
        onSaveButtonClick();
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
      {videoPlay?.card &&
        Object.keys(videoPlay.card).length !== 0 &&
        Object.keys(videoPlay.card)
          .sort()
          .map(
            (key) =>
              previewCheck(videoPlay.card[key]) && (
                <Card key={key} card={videoPlay.card[key]} styles={styles} />
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
