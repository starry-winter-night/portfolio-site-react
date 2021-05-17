import _ from 'lodash';
class InfiniteScroll {
  constructor(youtube, setLayer, token = 'none', id, query) {
    this.youtube = youtube;
    this.setLayer = setLayer;
    this.token = token;
    this.id = id;
    this.query = query;

    console.log('in');
  }

  on(element) {
    const REQUEST_TRESHOLD = 0.9;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: REQUEST_TRESHOLD,
    };
    const observer = new IntersectionObserver(this._callback(), options);

    if (element) observer.observe(element);
  }

  _callback() {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.id === 'smpark') {
            loadNextDevelopList(this.youtube, this.token, this.setLayer);
          } else if (this.id === 'search') {
            loadNextSearchList(
              this.youtube,
              this.token,
              this.setLayer,
              this.query
            );
          }

          observer.disconnect();
        }
      });
    };
  }
}

function loadNextDevelopList(youtube, nextPageToken, setLayer) {
  console.log(`리스트 실행!!`);
  youtube
    .developList(nextPageToken, 10) //
    .then((result) => {
      if (!result) return;
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
    });
}

function loadNextSearchList(youtube, nextPageToken, setLayer, query) {
  if (query) {
    console.log(`${query} 실행!!`);
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
        if (!items) return;

        setLayer((list) =>
          list.map((item) => {
            if (item.id === 'search') {
              const cloneItem = _.cloneDeep(item);

              items.forEach((item) => {
                cloneItem.contents.videoList.push(item);
              });
              cloneItem.contents.nextPageToken = items[0].nextPageToken;

              const result = cloneItem.contents.videoList.filter(
                (item, index) => {
                  return cloneItem.contents.videoList.indexOf(item) === index;
                }
              );

              return result;
            }

            return _.cloneDeep(item);
          })
        );
      });
  }
}

export default InfiniteScroll;
