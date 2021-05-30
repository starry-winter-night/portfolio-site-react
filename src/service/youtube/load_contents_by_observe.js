import _ from 'lodash';
class LoadContentsByObserve {
  constructor(youtube, setLayer, token = 'none', id, query, history) {
    this.youtube = youtube;
    this.setLayer = setLayer;
    this.token = token;
    this.id = id;
    this.query = query;
    this.history = history;
  }

  on(element, setLoading) {
    const REQUEST_TRESHOLD = 0.9;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: REQUEST_TRESHOLD,
    };
    const observer = new IntersectionObserver(
      this._callback(setLoading),
      options
    );

    if (element) observer.observe(element);
  }

  _callback(setLoading) {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.id === 'smpark') {
            loadNextDevelopList(
              this.youtube,
              this.token,
              this.setLayer,
              this.history,
              setLoading
            );
          } else if (this.id === 'search') {
            loadNextSearchList(
              this.youtube,
              this.token,
              this.setLayer,
              this.query,
              this.history,
              setLoading
            );
          }

          observer.disconnect();
        }
      });
    };
  }
}

function loadNextDevelopList(
  youtube,
  nextPageToken,
  setLayer,
  history,
  setLoading
) {
  setLoading(true);

  youtube
    .developList(nextPageToken, 10) //
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

      setLoading(false);
    });
}

function loadNextSearchList(
  youtube,
  nextPageToken,
  setLayer,
  query,
  history,
  setLoading
) {
  if (query) {
    setLoading(true);
    youtube
      .search(query, nextPageToken, 25) //
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
              const cloneItem = _.cloneDeep(item);

              items.forEach((newItem) => {
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

              cloneItem.contents.nextPageToken = items[0].nextPageToken;

              return cloneItem;
            }

            return _.cloneDeep(item);
          })
        );

        setLoading(false);
      });
  }
}

export default LoadContentsByObserve;
