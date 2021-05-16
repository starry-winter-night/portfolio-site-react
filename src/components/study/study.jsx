import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import InfiniteScroll from '../../service/infiniteScroll/infiniteScroll.js';
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
      contents: { videoList: [], nextPageToken: null, lastElement: null },
      nextPageToken: null,
    },
    {
      id: 'mylist',
      title: 'My List',
      view: null,
      contents: { videoList: [], nextPageToken: null, lastElement: null },
      nextPageToken: null,
    },
    {
      id: 'smpark',
      title: "Smpark's Picks",
      view: null,
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

  const getLastElement = useCallback((ref) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.view === 'on') {
          const cloneItem = _.cloneDeep(item);

          cloneItem.contents.lastElement = ref;

          return cloneItem;
        }

        return item;
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
    [youtube]
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
              lastElementRef={getLastElement}
            />
          )}
        </div>
      )}
    </div>
  );
});
export default Study;
