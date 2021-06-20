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
            case 'smpark':
              cardRepo.readCardList('smpark', (card) => {
                result.items = result.items.map((item) => {
                  item.card = card[item.snippet.resourceId.videoId];

                  return item;
                });

                const currVideo =
                  JSON.parse(localStorage.getItem('video')) || null;

                if (!currVideo) {
                  const video = result.items[0];

                  setVideoPlay(video);
                }

                const currentView = localStorage.getItem('view');

                setLayer((list) =>
                  list.map((item) => {
                    if (item.id === 'smpark') {
                      const smparkLayer = {
                        ...item,
                        contents: {
                          videoList: result.items,
                          nextPageToken: result.nextPageToken,
                        },
                      };

                      if (!currentView) smparkLayer.view = 'on';

                      return smparkLayer;
                    }

                    if (!currentView) return { ...item, view: 'off' };

                    return item;
                  })
                );

                setLoading((item) => loadingPosition(item, loading, false));
              });

              break;

            case 'search':
              const searchResult = reassembleList(result);

              localStorage.setItem('search', JSON.stringify(searchResult));

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

                    return searchList;
                  }

                  return { ...item, view: 'off' };
                })
              );

              setLoading((item) => loadingPosition(item, loading, false));
              break;

            case 'smparkAdd':
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
    setVideoPlay(video);

    localStorage.setItem('video', JSON.stringify(video));
  }, []);

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) {
        history.push('/login');
      } else {
        const currentView = localStorage.getItem('view') || null;
        const currVideo = JSON.parse(localStorage.getItem('video')) || null;
        const currSearch = JSON.parse(localStorage.getItem('search')) || null;

        if (currentView) {
          setLayer((list) => {
            return list.map((item) => {
              if (item.id === currentView) {
                return { ...item, view: 'on' };
              }
              return { ...item, view: 'off' };
            });
          });
        }

        if (currVideo) {
          setVideoPlay(currVideo);
        }

        if (currSearch) {
          setLayer((list) =>
            list.map((item) => {
              if (item.id === 'search') {
                return {
                  ...item,
                  contents: {
                    videoList: currSearch,
                    nextPageToken: currSearch[0].nextPageToken,
                  },
                };
              }

              return item;
            })
          );
        }

        youtubeRepo.readVideo(auth, (result) => {
          let obj = {};
          let arr = [];

          for (const key in result) {
            obj[result[key].date] = result[key];

            arr.push(result[key].date);
          }

          cardRepo.readCardList(auth, (result) => {
            let sortList = [];

            if (result) {
              sortList = arr.sort().map((item) => {
                obj[item].card =
                  result[obj[item]?.snippet?.resourceId?.videoId] ||
                  result[obj[item].id];

                return obj[item];
              });
            }

            if (currVideo) {
              sortList.forEach((item) => {
                if (item.date === currVideo.date) {
                  setVideoPlay(item);
                }
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

        onYoutubeLayerSet(youtube.smparkList(), 'smpark', 'sectionLoading');
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
