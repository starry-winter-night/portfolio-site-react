import React from 'react';
import styles from './sections.module.css';
import Contents from './contents/contents';
import Directory from './directory/directory';

const Sections = ({
  onYoutubeLayerSet,
  videoPlay,
  layer,
  onVideoListClick,
  onVideoSave,
  youtube,
  loading,
  cardRepo,
  etcToggleId,
  youtubeRepo,
}) => {
  return (
    <main className={styles.main}>
      <Contents
        videoPlay={videoPlay}
        onVideoSave={onVideoSave}
        cardRepo={cardRepo}
        etcToggleId={etcToggleId}
      />
      <Directory
        layer={layer}
        onVideoListClick={onVideoListClick}
        youtube={youtube}
        onYoutubeLayerSet={onYoutubeLayerSet}
        loading={loading}
        etcToggleId={etcToggleId}
        youtubeRepo={youtubeRepo}
      />
    </main>
  );
};

export default Sections;
