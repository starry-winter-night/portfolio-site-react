import React from 'react';
import styles from './directory.module.css';
import List from './list';
import Loading from '../../../common/loading/loading';

const Directory = ({
  layer,
  onVideoListClick,
  youtube,
  onYoutubeLayerSet,
  loading,
  etcToggleId,
  youtubeRepo,
}) => {
  const currentView = localStorage.getItem('view');
  return (
    <section className={styles.directory}>
      {loading.sectionLoading && <Loading styles={styles} />}
      {!loading.sectionLoadin &&
        layer.map(
          (item) =>
            (currentView
              ? currentView === item.id
                ? 'on'
                : 'off'
              : item.view) === 'on' && (
              <List
                key={item.id}
                videoList={item}
                onVideoListClick={onVideoListClick}
                youtube={youtube}
                onYoutubeLayerSet={onYoutubeLayerSet}
                loading={loading}
                etcToggleId={etcToggleId}
                youtubeRepo={youtubeRepo}
                search={
                  item.id === 'search' &&
                  JSON.parse(localStorage.getItem('search'))
                }
              />
            )
        )}
    </section>
  );
};

export default Directory;
