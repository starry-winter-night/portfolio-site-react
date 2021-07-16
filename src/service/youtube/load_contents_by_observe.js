class LoadContentsByObserve {
  constructor(youtube, onYoutubeLayerSet, token, id, query) {
    this.youtube = youtube;
    this.onYoutubeLayerSet = onYoutubeLayerSet;
    this.token = token || 'none';
    this.id = id;
    this.query = query;
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
            loadNextSmparkList(
              this.youtube,
              this.token,
              this.onYoutubeLayerSet
            );
          } else if (this.id === 'search') {
            loadNextSearchList(
              this.youtube,
              this.token,
              this.onYoutubeLayerSet,
              this.query
            );
          }

          observer.disconnect();
        }
      });
    };
  }
}

function loadNextSmparkList(youtube, nextPageToken, onYoutubeLayerSet) {
  onYoutubeLayerSet(
    youtube.smparkList(nextPageToken, 10),
    'smparkAdd',
    'listLoading'
  );
}

function loadNextSearchList(youtube, nextPageToken, onYoutubeLayerSet, query) {
  if (query) {
    onYoutubeLayerSet(
      youtube.search(query, nextPageToken, 25),
      'searchAdd',
      'listLoading'
    );
  }
}

export default LoadContentsByObserve;
