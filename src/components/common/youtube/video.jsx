import React, { memo } from 'react';

const Video = memo(({ videoId, height }) => (
  <iframe
    type="text/html"
    title="youtube video player"
    width="100%"
    height={`${height}px`}
    src={`https://www.youtube.com/embed/${videoId}`}
    frameBorder="0"
    allowFullScreen
  ></iframe>
));

export default Video;
