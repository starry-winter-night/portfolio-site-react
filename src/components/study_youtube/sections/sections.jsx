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
  query,
  loading,
  cardRepo,
  etcToggleId,
}) => {
  return (
    <main className={styles.main}>
      <Contents
        videoPlay={videoPlay}
        onVideoSave={onVideoSave}
        cardRepo={cardRepo}
      />
      <Directory
        layer={layer}
        onVideoListClick={onVideoListClick}
        youtube={youtube}
        onYoutubeLayerSet={onYoutubeLayerSet}
        query={query}
        loading={loading}
        etcToggleId={etcToggleId}
      />
    </main>
  );
};

export default Sections;
