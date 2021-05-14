import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';

const Study = memo(({ FontAwesome, youtube, authService, loginState }) => {
  const [etcToggle, setEtcToggle] = useState('off');
  const [videoPlay, setVideoPlay] = useState(null);
  const [videoList, setVideoList] = useState([
    { id: 'search', content: [] },
    { id: 'mylist', content: [] },
    { id: 'smpark', content: [] },
  ]);
  const [menus, setMenu] = useState([
    { id: 'search', title: 'Search', view: 'off' },
    { id: 'mylist', title: 'My List', view: 'off' },
    { id: 'smpark', title: "Smpark's Picks", view: 'on' },
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
              if (item.id === 'smpark') return { ...item, content: result };

              return item;
            })
          );

          setVideoPlay(result[0]);
        });
    }
  }, [youtube, loginState.state]);

  const handleClickSaveVideo = useCallback((selectedList) => {
    setVideoList((list) =>
      list.map((item) => {
        if (item.id === 'mylist') {
          let check = null;
          item.content.forEach((contents) => {
            if (contents.etag === selectedList.etag) {
              check = 'exist';
              return;
            }
          });

          if (!check) {
            return { ...item, content: [...item.content, selectedList] };
          }
        }
        return item;
      })
    );

    alert('저장 되었습니다.');
  }, []);

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
        <div>
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
              onMyList={handleClickSaveVideo}
            />
          )}
        </div>
      )}
    </div>
  );
});
export default Study;
