import React, { useEffect, useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import Loading from '../common/loading/loading';
import styles from './study.module.css';
import _ from 'lodash';

const Study = memo(({ youtube, authService }) => {
  const [etcToggle, setEtcToggle] = useState('off');
  const [videoPlay, setVideoPlay] = useState(null);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(null);
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

  const auth = localStorage.getItem('state');

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) history.push('/login');
    });
  }, [auth, authService, history]);

  useEffect(() => {
    if (auth) {
      setLoading(true);

      youtube
        .developList() //
        .then((result) => {
          if (!result) {
            setLoading(false);
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
          setLoading(false);
        });
    }
  }, [youtube, history, auth]);

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
            alert('이미 등록되어 있는 영상입니다.');
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

      setLoading(true);

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
          if (!items) {
            setLoading(false);
            return;
          }

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
          setLoading(false);
        });
    },
    [youtube, history]
  );

  const onDropbox = () => {
    etcToggle === 'on' ? setEtcToggle('off') : setEtcToggle('on');
  };

  const handleClickVideoList = useCallback((video) => {
    setVideoPlay({ ...video });

    window.scrollTo({ top: 0 });
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
    <>
      {auth && (
        <div className={styles.study} onClick={onStudyClick}>
          {loading && <Loading styles={styles} />}
          {videoPlay && !loading && (
            <>
              <Navbar
                layer={layer}
                onMenu={onSetMenu}
                onSearch={onSearch}
                onDropbox={onDropbox}
                etcToggle={etcToggle}
                authService={authService}
              />
              <Sections
                layer={layer}
                setLayer={setLayer}
                videoPlay={videoPlay}
                onList={handleClickVideoList}
                onMyList={handleClickSaveVideo}
                youtube={youtube}
                query={query}
              />
            </>
          )}
        </div>
      )}
    </>
  );
});
export default Study;
