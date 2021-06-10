import React from 'react';
import styles from './directory.module.css';
import List from './list';
import Loading from '../../../common/loading/loading';

const Directory = ({
  layer,
  onVideoListClick,
  youtube,
  onYoutubeLayerSet,
  query,
  loading,
  etcToggleId,
  youtubeRepo
}) => {
  return (
    <section className={styles.directory}>
      {loading.sectionLoading && <Loading styles={styles} />}
      {layer.map(
        (item) =>
          item.view === 'on' && (
            <List
              key={item.id}
              videoList={item}
              onVideoListClick={onVideoListClick}
              youtube={youtube}
              onYoutubeLayerSet={onYoutubeLayerSet}
              query={query}
              loading={loading}
              etcToggleId={etcToggleId}
              youtubeRepo={youtubeRepo}
            />
          )
      )}
    </section>
  );
};

export default Directory;
