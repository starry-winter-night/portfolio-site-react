import React, { memo, useEffect, useState, useCallback } from 'react';
import Item from './item';
import LoadContentsByObserve from '../../../../service/youtube/loadContentsByObserve';
import { useHistory } from 'react-router';
import styles from './list.module.css';
import Loading from '../../../common/loading/loading';

const List = memo(
  ({ videoList, onList, token, id, youtube, setLayer, query }) => {
    const [last, setLast] = useState(null);
    const [loading, setLoading] = useState(null);
    const history = useHistory();

    const getLastElement = useCallback((ref) => {
      setLast(ref);
    }, []);

    useEffect(() => {
      if (last) {
        const nextPageToken = token;
        const loadContentsByObserve = new LoadContentsByObserve(
          youtube,
          setLayer,
          nextPageToken,
          id,
          query,
          history
        );

        loadContentsByObserve.on(last, setLoading);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [last]);

    return (
      <ul>
        {loading && <Loading styles={styles} />}

        {videoList &&
          videoList.map((item, index) => {
            if (index === videoList.length - 1) {
              return (
                <Item
                  key={item.id}
                  item={item}
                  onList={onList}
                  lastElementRef={getLastElement}
                />
              );
            } else {
              return <Item key={item.id} item={item} onList={onList} />;
            }
          })}
      </ul>
    );
  }
);

export default List;
