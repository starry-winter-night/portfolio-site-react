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
  summaryCard,
}) => {
  return (
    <main className={styles.main}>
      <Contents
        videoPlay={videoPlay}
        onVideoSave={onVideoSave}
        summaryCard={summaryCard}
      />
      <Directory
        layer={layer}
        onVideoListClick={onVideoListClick}
        youtube={youtube}
        onYoutubeLayerSet={onYoutubeLayerSet}
        query={query}
        loading={loading}
      />
    </main>
  );
};

export default Sections;
