import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import _ from 'lodash';

const Study = memo(({ FontAwesome, youtube, authService, loginState }) => {
  const [etcToggle, setEtcToggle] = useState('off');
  const [videoPlay, setVideoPlay] = useState(null);
  const [query, setQuery] = useState(null);
  const [layer, setLayer] = useState([
    {
      id: 'search',
      title: 'Search',
      view: null,
      contents: { videoList: [], nextPageToken: null },
      nextPageToken: null,
    },
    {
      id: 'mylist',
      title: 'My List',
      view: null,
      contents: { videoList: [], nextPageToken: null },
      nextPageToken: null,
    },
    {
      id: 'smpark',
      title: "Smpark's Picks",
      view: null,
      contents: { videoList: [], nextPageToken: null },
    },
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
          if (!result) {
            return;
          }
          if (result.error) {
            history.push({
              pathname: '/error',
              state: { code: result.error.code },
            });
            return;
          }

          setLayer((list) =>
            list.map((item) => {
              if (item.id === 'smpark') {
                return {
                  ...item,
                  contents: {
                    videoList: result.items,
                    nextPageToken: result.nextPageToken,
                  },
                  view: 'on',
                };
              }

              return { ...item, view: 'off' };
            })
          );

          setVideoPlay(result.items[0]);
        });
    }
  }, [youtube, loginState.state, history]);

  const handleClickSaveVideo = useCallback((selectedList) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.id === 'mylist') {
          let check = null;
          item.contents.videoList.forEach((item) => {
            if (item.id === selectedList.id) {
              check = 'exist';
              return;
            }
          });

          if (check === 'exist') {
            alert('이미 존재하는 video입니다.');
          } else {
            alert('저장 되었습니다.');

            const cloneItem = _.cloneDeep(item);

            cloneItem.contents.videoList.push(selectedList);

            return cloneItem;
          }
        }
        return item;
      })
    );
  }, []);

  const onSetMenu = useCallback((title) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.title === title) {
          return { ...item, view: 'on' };
        }

        return { ...item, view: 'off' };
      })
    );
  }, []);

  const onSearch = useCallback(
    (query) => {
      setQuery(query);

      youtube
        .search(query) //
        .then((result) => {
          if (!result) return;
          return result.items.map((item) => ({
            ...item,
            id: item.id.videoId,
            nextPageToken: result.nextPageToken,
          }));
        })
        .then((items) => {
          if (!items) return;

          if (items.error) {
            history.push({
              pathname: '/error',
              state: { code: items.error.code },
            });
            return;
          }
          setLayer((list) =>
            list.map((item) => {
              if (item.id === 'search') {
                return {
                  ...item,
                  contents: {
                    videoList: items,
                    nextPageToken: items[0].nextPageToken,
                  },
                  view: 'on',
                };
              }

              return { ...item, view: 'off' };
            })
          );
        });
    },
    [youtube, history]
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
            layer={layer}
            FontAwesome={FontAwesome}
            onMenu={onSetMenu}
            onSearch={onSearch}
            onDropbox={onDropbox}
            etcToggle={etcToggle}
            authService={authService}
          />
          {videoPlay && (
            <Sections
              layer={layer}
              setLayer={setLayer}
              videoPlay={videoPlay}
              onList={handleClickVideoList}
              onMyList={handleClickSaveVideo}
              youtube={youtube}
              query={query}
            />
          )}
        </div>
      )}
    </div>
  );
});
export default Study;
