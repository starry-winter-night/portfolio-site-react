import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
import styles from './study.module.css';
import _ from 'lodash';

const Study = ({ authService, cardRepo, youtube, youtubeRepo }) => {
  const [etcToggleId, setEtcToggleId] = useState(null);
  const [videoPlay, setVideoPlay] = useState(null);
  const [query, setQuery] = useState('');
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

              cardRepo.readCardList('smpark', (card) => {
                result.items = result.items.map((item) => {
                  item.card = card[item.snippet.resourceId.videoId];

                  if (currentVideo?.snippet) {
                    if (
                      currentVideo.snippet.resourceId.videoId ===
                      item.snippet.resourceId.videoId
                    ) {
                      setVideoPlay(item);

                      localStorage.setItem('video', JSON.stringify(item));
                    }
                  }

                  return item;
                });
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

                setLoading((item) => loadingPosition(item, loading, false));

                if (!currentVideo?.snippet) setVideoPlay(result.items[0]);
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
                    return {
                      ...item,
                      contents: {
                        videoList: searchResult,
                        nextPageToken: searchResult[0].nextPageToken,
                      },
                      view: 'on',
                    };
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
      setQuery(query);

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

    //문제는 레이어에는 저장이 되지만
    //최초에 로컬스토리지에 저장된 값을 컨텐츠에서 불러오니까
    //로컬스토리지에 저장된 후에 수정된 영상 데이터가 업데이트가 되지 않는게 문제인거다.

    //수정을 하면 로컬스토리지 영상을 업데이트를 하던지..
    //기존처럼 컨텐츠에 들어갈때마다 데이터를 받아오던지...
    //로컬스토리지가 비었으면 0번째를 올리고
    // 있으면 해당 데이터만 새로 업데이트 하는걸로 하자.
    localStorage.setItem('video', JSON.stringify(video));
  }, []);

  // smpark의 요약카드를 가져오는것인데
  // 현재는 컨텐츠를 누르면 본인의 id와 요약카드만 가져온다.
  // 하지만 smpark's 의 요약카드는 smpark의 정보를 가져오게 해야 한다.

  // 일단 북마크는 다 가져와야 하고
  // smpark's만 smpark의 북마크를 가져와야 한다.
  // 북마크 정보를 해당 동영상 정보에 넣어야 한다.

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
            let sortList = [];
            if (result) {
              sortList = arr.sort().map((item) => {
                obj[item].card = result[obj[item].snippet.resourceId.videoId];

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
                query={query}
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
