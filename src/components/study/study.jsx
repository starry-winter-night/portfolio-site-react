import React, { useEffect, useState, useCallback, memo } from 'react';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';

const Study = memo(({ FontAwesome, youtube, onStudy }) => {
  const [videoPlay, setVideoPlay] = useState(null);
  const [videoList, setVideoList] = useState([
    { id: 'develop', content: [] },
    { id: 'search', content: [] },
    { id: 'etc', content: [] },
    { id: 'card', content: [] },
  ]);

  const [menus, setMenu] = useState([
    { id: 'develop', title: 'Develop', view: 'on' },
    { id: 'search', title: 'Search', view: 'off' },
    { id: 'etc', title: 'Etc', view: 'off' },
    { id: 'card', title: 'Card', view: 'off' },
  ]);

  useEffect(() => {
    youtube
      .developList() //
      .then((result) => {
        setVideoList((list) =>
          list.map((item) => {
            if (item.id === 'develop') return { ...item, content: result };

            return item;
          })
        );

        setVideoPlay(result[0]);
      });
  }, [youtube]);

  const onSetMenu = useCallback((title) => {
    setMenu((menu) =>
      menu.map((item) => {
        if (item.title === title) {
          return { ...item, view: 'on' };
        }

        return { ...item, view: 'off' };
      })
    );
  }, []);

  const onSearch = useCallback(
    (query, title) => {
      youtube
        .search(query) //
        .then((result) => {
          setVideoList((list) =>
            list.map((item) => {
              if (item.id === 'search') return { ...item, content: result };

              return item;
            })
          );

          onSetMenu(title);
        });
    },
    [youtube, onSetMenu]
  );

  const handleClickMenu = useCallback(
    (title) => {
      onSetMenu(title);
    },
    [onSetMenu]
  );

  const handleClickVideoList = useCallback((video) => {
    setVideoPlay({ ...video });
  }, []);

  return (
    <>
      <Navbar
        menus={menus}
        onStudy={onStudy}
        FontAwesome={FontAwesome}
        onMenu={handleClickMenu}
        onSearch={onSearch}
      />
      {videoPlay && (
        <Sections
          videoList={videoList}
          videoPlay={videoPlay}
          menus={menus}
          onList={handleClickVideoList}
        />
      )}
    </>
  );
});
export default Study;
