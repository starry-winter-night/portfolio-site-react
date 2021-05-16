import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import InfiniteScroll from '../../service/infiniteScroll/infiniteScroll.js';

const Study = memo(({ FontAwesome, youtube, authService, loginState }) => {
  const [etcToggle, setEtcToggle] = useState('off');
  const [videoPlay, setVideoPlay] = useState(null);
  const [query, setQuery] = useState(null);
  const [videoList, setVideoList] = useState([
    { id: 'search', content: [], nextPageToken: null },
    { id: 'mylist', content: [], nextPageToken: null },
    { id: 'smpark', content: [], nextPageToken: null },
  ]);

  const [layer, setLayer] = useState([
    {
      id: 'search',
      title: 'Search',
      view: 'off',
      contents: { videoList: [], nextPageToken: null, lastElement: null },
      nextPageToken: null,
    },
    {
      id: 'mylist',
      title: 'My List',
      view: 'off',
      contents: { videoList: [], nextPageToken: null, lastElement: null },
      nextPageToken: null,
    },
    {
      id: 'smpark',
      title: "Smpark's Picks",
      view: 'on',
      contents: { videoList: [], nextPageToken: null, lastElement: null },
    },
  ]);

  // 메뉴의 컨텐츠에 라스트 리스트를 가져와야 한다.
  useEffect(() => {
    layer.forEach((item) => {
      if (item.view === 'on') {
        const infiniteScroll = new InfiniteScroll(
          youtube,
          layer,
          setLayer,
          item.id,
          query
        );

        // infiniteScroll.on(LastElement);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer]);

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
          if (!result) return;

          setLayer((list) =>
            list.map((item) => {
              if (item.id === 'smpark') {
                const data = {
                  ...item,
                  contents: { videoList: result.items },
                };

                data.contents.nextPageToken = result.nextPageToken;

                return data;
              }

              return item;
            })
          );

          setVideoPlay(result.items[0]);
        });
    }
  }, [youtube, loginState.state]);

  const handleClickSaveVideo = useCallback((selectedList) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.id === 'mylist') {
          let check = null;
          item.content.forEach((contents) => {
            if (contents.etag === selectedList.etag) {
              check = 'exist';
              return;
            }
          });

          if (check === 'exist') {
            alert('이미 존재하는 video입니다.');
          } else {
            alert('저장 되었습니다.');
            return { ...item, content: [...item.content, selectedList] };
          }
        }
        return item;
      })
    );
  }, []);

  const onSetMenu = useCallback((title, element) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.title === title) {
          if (element) {
            const data = { ...item, view: 'on' };
            data.contents.lastElement = element;

            return data;
          } else {
            return { ...item, view: 'on' };
          }
        }

        return { ...item, view: 'off' };
      })
    );
  }, []);

  const onSearch = useCallback(
    (query, title) => {
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

          setLayer((list) =>
            list.map((item) => {
              if (item.id === 'search') {
                const data = {
                  ...item,
                  contents: items,
                };

                data.contents.nextPageToken = items[0].nextPageToken;

                return data;
              }

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
              onMenu={onSetMenu}
            />
          )}
        </div>
      )}
    </div>
  );
});
export default Study;
