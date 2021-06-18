import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import styles from './study.module.css';
import _ from 'lodash';

const Study = ({ authService, cardRepo, youtube, youtubeRepo }) => {
  const [etcToggleId, setEtcToggleId] = useState(null);
  const [videoPlay, setVideoPlay] = useState(null);
  const [loading, setLoading] = useState({});
  const [layer, setLayer] = useState([
    {
      id: 'search',
      title: 'Search',
    },
    {
      id: 'mylist',
      title: 'My List',
    },
    {
      id: 'smpark',
      title: "Smpark's Picks",
    },
  ]);
  const history = useHistory();

  const auth = localStorage.getItem('state');

  const goToError = useCallback(
    (code) => {
      history.push({
        pathname: '/error',
        state: { code },
      });
    },
    [history]
  );

  const onYoutubeLayerSet = useCallback(
    (youtube, action, loading) => {
      setLoading((item) => loadingPosition(item, loading, true));

      youtube
        .then((result) => {
          if (!result) {
            setLoading((item) => loadingPosition(item, loading, false));

            return;
          }

          if (result.error) {
            setLoading((item) => loadingPosition(item, loading, false));

            const code = result.error.code;

            goToError(code);

            return;
          }

          switch (action) {
            case 'develop':
              const currentVideo = JSON.parse(localStorage.getItem('video'));
              const currentView = localStorage.getItem('view');

              let videoCheck = null;

              cardRepo.readCardList('smpark', (card) => {
                result.items = result.items.map((item) => {
                  item.card = card[item.snippet.resourceId.videoId];

                  if (currentVideo) {
                    const currVideoId =
                      currentVideo?.snippet?.resourceId?.videoId ||
                      currentVideo.id;

                    const videoId = item.snippet.resourceId.videoId;
                    if (currVideoId && currVideoId === videoId) {
                      videoCheck = true;
                      setVideoPlay(item);

                      localStorage.setItem('video', JSON.stringify(item));
                    }
                  }

                  return item;
                });

                setLayer((list) =>
                  list.map((item) => {
                    if (item.id === 'smpark') {
                      if (!currentView) {
                        localStorage.setItem('view', item.id);
                      }
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

                setLoading((item) => loadingPosition(item, loading, false));

                if (!currentVideo?.snippet || !videoCheck)
                  setVideoPlay(result.items[0]);
              });

              break;

            case 'search':
              const searchResult = reassembleList(result);

              if (searchResult.error) {
                setLoading((item) => loadingPosition(item, loading, false));

                const code = searchResult.error.code;

                goToError(code);

                return;
              }

              setLayer((list) =>
                list.map((item) => {
                  if (item.id === 'search') {
                    localStorage.setItem('view', item.id);

                    const searchList = {
                      ...item,
                      contents: {
                        videoList: searchResult,
                        nextPageToken: searchResult[0].nextPageToken,
                      },
                      view: 'on',
                    };

                    localStorage.setItem('search', JSON.stringify(searchList));

                    return searchList;
                  }

                  return { ...item, view: 'off' };
                })
              );

              setLoading((item) => loadingPosition(item, loading, false));
              break;

            case 'developAdd':
              cardRepo.readCardList('smpark', (card) => {
                result.items = result.items.map((item) => {
                  item.card = card[item.snippet.resourceId.videoId];

                  return item;
                });
                setLayer((list) =>
                  list.map((item) => {
                    if (item.id === 'smpark') {
                      const cloneItem = _.cloneDeep(item);

                      result.items.forEach((item) => {
                        cloneItem.contents.videoList.push(item);
                      });

                      cloneItem.contents.nextPageToken = result.nextPageToken;

                      return cloneItem;
                    }

                    return _.cloneDeep(item);
                  })
                );

                setLoading((item) => loadingPosition(item, loading, false));
              });

              break;

            case 'searchAdd':
              const searchAddResult = reassembleList(result);

              if (searchAddResult.error) {
                setLoading((item) => loadingPosition(item, loading, false));
                const code = searchAddResult.error.code;

                goToError(code);

                return;
              }

              setLayer((list) =>
                list.map((item) => {
                  if (item.id === 'search') {
                    const cloneItem = _.cloneDeep(item);

                    searchAddResult.forEach((newItem) => {
                      const newId = newItem.id;
                      let state = true;

                      cloneItem.contents.videoList.forEach((item) => {
                        if (newId === item.id) {
                          state = false;
                        }
                      });

                      if (state) {
                        cloneItem.contents.videoList.push(newItem);
                      }
                    });

                    cloneItem.contents.nextPageToken =
                      searchAddResult[0].nextPageToken;

                    localStorage.setItem('search', JSON.stringify(cloneItem));

                    return cloneItem;
                  }

                  return _.cloneDeep(item);
                })
              );

              setLoading((item) => loadingPosition(item, loading, false));
              break;
            default:
              setLoading((item) => loadingPosition(item, loading, false));
              new Error('unknown action');
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [cardRepo, goToError]
  );

  const onSearch = useCallback(
    (query) => {
      localStorage.setItem('query', query);

      onYoutubeLayerSet(youtube.search(query), 'search', 'sectionLoading');
    },
    [onYoutubeLayerSet, youtube]
  );

  const onVideoSave = useCallback(
    (video, videoId) => {
      video.date = Date.now();

      youtubeRepo.saveVideo(auth, video, videoId);

      alert('저장 되었습니다.');
    },
    [auth, youtubeRepo]
  );

  const onMenuClick = useCallback((title) => {
    setLayer((list) =>
      list.map((item) => {
        if (item.title === title) {
          localStorage.setItem('view', item.id);

          return { ...item, view: 'on' };
        }

        return { ...item, view: 'off' };
      })
    );
  }, []);

  const onHideDropBox = (e) => {
    const toggleState = e.target.closest('svg')?.dataset.etcId;

    if (toggleState) {
      if (etcToggleId === toggleState) {
        setEtcToggleId(null);
      } else {
        setEtcToggleId(toggleState);
      }
    } else {
      setEtcToggleId(null);
    }
  };

  const onVideoListClick = useCallback((video) => {
    setVideoPlay((item) => {
      return { ...item, video };
    });

    localStorage.setItem('video', JSON.stringify(video));
  }, []);

  // 메뉴를 눌렀을때도 스토리지에 저장하고
  // 다른 메뉴를 on으로 바꾸는 방식에 들어갈 때도 스토리지를 업데이트 해주어야 한다.

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) {
        history.push('/login');
      } else {
        youtubeRepo.readVideo(auth, (result) => {
          let obj = {};
          let arr = [];

          for (const key in result) {
            obj[result[key].date] = result[key];

            arr.push(result[key].date);
          }

          cardRepo.readCardList(auth, (result) => {
            const currentVideo = JSON.parse(localStorage.getItem('video'));
            let sortList = [];

            if (result) {
              sortList = arr.sort().map((item) => {
                obj[item].card =
                  result[obj[item]?.snippet?.resourceId?.videoId] ||
                  result[obj[item].id];

                if (currentVideo) {
                  const currVideoId =
                    currentVideo?.snippet?.resourceId?.videoId ||
                    currentVideo.id;

                  const videoId =
                    obj[item]?.snippet?.resourceId?.videoId || obj[item].id;

                  if (currVideoId === videoId) {
                    localStorage.setItem('video', JSON.stringify(obj[item]));
                  }
                }

                return obj[item];
              });
            }

            setLayer((list) =>
              list.map((item) => {
                if (item.id === 'mylist') {
                  return {
                    ...item,
                    contents: {
                      videoList: sortList,
                    },
                  };
                }

                return item;
              })
            );
          });
        });

        onYoutubeLayerSet(youtube.developList(), 'develop', 'sectionLoading');
      }
    });

    return () => {
      setLayer([{}]);
    };
  }, [
    auth,
    authService,
    cardRepo,
    history,
    onYoutubeLayerSet,
    youtube,
    youtubeRepo,
  ]);

  return (
    <>
      {auth && (
        <div className={styles.study} onClick={onHideDropBox}>
          {videoPlay && (
            <>
              <Navbar
                layer={layer}
                onMenuClick={onMenuClick}
                onSearch={onSearch}
                etcToggleId={etcToggleId}
                authService={authService}
              />
              <Sections
                layer={layer}
                onYoutubeLayerSet={onYoutubeLayerSet}
                videoPlay={videoPlay}
                onVideoListClick={onVideoListClick}
                onVideoSave={onVideoSave}
                youtube={youtube}
                etcToggleId={etcToggleId}
                loading={loading}
                cardRepo={cardRepo}
                youtubeRepo={youtubeRepo}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

function reassembleList(llst) {
  return llst.items.map((item) => ({
    ...item,
    id: item.id.videoId,
    nextPageToken: llst.nextPageToken,
  }));
}

function loadingPosition(item, loading, state) {
  if (loading === 'listLoading') {
    return { ...item, listLoading: state };
  }

  if (loading === 'sectionLoading') {
    return { ...item, sectionLoading: state };
  }
}

export default Study;
