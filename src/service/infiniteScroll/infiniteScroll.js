class InfiniteScroll {
  constructor(youtube, videoList, setVideoList, menuId, query) {
    this.youtube = youtube;
    this.videoList = videoList;
    this.setVideoList = setVideoList;
    this.menuId = menuId;
    this.query = query;
  }

  on(element) {
    console.log(this.menuId);
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
          this.videoList.forEach((item) => {
            if (this.menuId === item.id) {
              const nextPageToken = !item.nextPageToken
                ? 'none'
                : item.nextPageToken;

              if (this.menuId === 'smpark') {
                loadNextDevelopList(
                  this.youtube,
                  nextPageToken,
                  this.setVideoList
                );
              } else if (this.menuId === 'search') {
                loadNextSearchList(
                  this.youtube,
                  nextPageToken,
                  this.setVideoList,
                  this.query
                );
              }

              observer.disconnect();
            }
          });

          return;
        }
      });
    };
  }
}

function loadNextDevelopList(youtube, nextPageToken, setVideoList) {
  console.log(`리스트 실행!!`);
  youtube
    .developList(nextPageToken, 10) //
    .then((result) => {
      if (!result) return;

      setVideoList((list) =>
        list.map((item) => {
          if (item.id === 'smpark') {
            return {
              ...item,
              content: [...item.content, ...result.items],
              nextPageToken: result.nextPageToken,
            };
          }

          return item;
        })
      );
    });
}

function loadNextSearchList(youtube, nextPageToken, setVideoList, query) {
  if (query) {
    console.log(`${query} 실행!!`);
    // youtube
    //   .search(query, nextPageToken, 25) //
    //   .then((result) => {
    //     if (!result) return;
    //     return result.items.map((item) => ({
    //       ...item,
    //       id: item.id.videoId,
    //       nextPageToken: result.nextPageToken,
    //     }));
    //   })
    //   .then((items) => {
    //     if (!items) return;

    //     setVideoList((list) =>
    //       list.map((item) => {
    //         if (item.id === 'search') {
    //           return {
    //             ...item,
    //             content: [...item.content, ...items],
    //             nextPageToken: items[0].nextPageToken,
    //           };
    //         }
    //         return item;
    //       })
    //     );
    //   });
  }
}

export default InfiniteScroll;
