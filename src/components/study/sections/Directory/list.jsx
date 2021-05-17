import React, { memo, useEffect, useState } from 'react';
import Item from './item';
import InfiniteScroll from '../../../../service/infiniteScroll/infiniteScroll.js';
import { useCallback } from 'react/cjs/react.development';

const List = memo(
  ({ videoList, onList, token, id, youtube, setLayer, query }) => {
    const [last, setLast] = useState(null);

    const getLastElement = useCallback((ref) => {
      setLast(ref);
    }, []);

    useEffect(() => {
      if (last) {
        const nextPageToken = token;
        const infiniteScroll = new InfiniteScroll(
          youtube,
          setLayer,
          nextPageToken,
          id,
          query
        );

        infiniteScroll.on(last);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [last]);

    return (
      <ul>
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
