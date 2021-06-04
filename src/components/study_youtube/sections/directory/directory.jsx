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
            />
          )
      )}
    </section>
  );
};

export default Directory;
