import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';

const Study = memo(({ FontAwesome, youtube, authService, loginState }) => {
  const [etcToggle, setEtcToggle] = useState('off');
  const [videoPlay, setVideoPlay] = useState(null);
  const [videoList, setVideoList] = useState([
    { id: 'search', content: [] },
    { id: 'my', content: [] },
    { id: 'card', content: [] },
    { id: 'webdev', content: [] },
  ]);
  const [menus, setMenu] = useState([
    { id: 'search', title: 'Search', view: 'off' },
    { id: 'my', title: 'My', view: 'off' },
    { id: 'card', title: 'Card', view: 'off' },
    { id: 'webdev', title: 'WebDev', view: 'on' },
  ]);
  const history = useHistory();

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user) history.push('/login');
    });
  }, [authService, history]);

  useEffect(() => {
    if (loginState.state === 'login') {
      youtube
        .developList() //
        .then((result) => {
          setVideoList((list) =>
            list.map((item) => {
              if (item.id === 'webdev') return { ...item, content: result };

              return item;
            })
          );

          setVideoPlay(result[0]);
        });
    }
  }, [youtube, loginState.state]);

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

  const onDropbox = useCallback(() => {
    etcToggle === 'on' ? setEtcToggle('off') : setEtcToggle('on');
  }, [etcToggle]);

  const handleClickVideoList = useCallback((video) => {
    setVideoPlay({ ...video });
  }, []);

  const onStudyClick = (e) => {
    const menu = e.target.closest('li');
    if (!menu) setEtcToggle('off');

    if (menu) {
      const id = menu.dataset.id;

      if (id !== 'etc') setEtcToggle('off');
    }
  };

  return (
    <div onClick={onStudyClick}>
      {loginState.state === 'login' && (
        <>
          <Navbar
            menus={menus}
            FontAwesome={FontAwesome}
            onMenu={onSetMenu}
            onSearch={onSearch}
            onDropbox={onDropbox}
            etcToggle={etcToggle}
            authService={authService}
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
      )}
    </div>
  );
});
export default Study;
