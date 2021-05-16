import React, { memo } from 'react';
import Item from './item';

const List = memo(({ videoList, onList, lastElementRef }) => {
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
                lastElementRef={lastElementRef}
              />
            );
          } else {
            return <Item key={item.id} item={item} onList={onList} />;
          }
        })}
    </ul>
  );
});

export default List;
