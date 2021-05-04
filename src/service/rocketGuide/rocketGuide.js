export default class RocketGuide {
  constructor(elements) {
    this.elements = elements;
    this.prevHeight = 0;
  }

  start() {
    document.addEventListener('scroll', this._render(this.elements));
  }

  _render(elements) {
    return () => {
      const rocket = elements.rocket;
      const currHeight = window.pageYOffset;

      const distance = getRocketMoveDistancePixel(elements);

      const rotate = getRocketRotate(this.prevHeight, currHeight);

      rocket.style.transform = `translateX(${distance}px) ${rotate}`;

      // 이전 높이 업데이트
      if (currHeight > 0) this.prevHeight = currHeight;
    };
  }
}

function getScrollHeightPercent() {
  const pageTotalHeight = document.documentElement.scrollHeight;
  const currentViewHeight = window.innerHeight;

  const remainTotalHeight = pageTotalHeight - currentViewHeight;

  // y축의 스크롤 된 만큼의 % 구하기.
  return Math.floor((window.pageYOffset / remainTotalHeight) * 100);
}

function getTravelLoadOnePercentPixel(elements) {
  const { rocket, guide, earth, mars } = elements;

  const rocektWidth = rocket.clientWidth;
  const earthWidth = earth.clientWidth;
  const marsWidth = mars.clientWidth;

  const totalImgWidth = rocektWidth + earthWidth + marsWidth;

  const travelRoadWidth = guide.clientWidth;

  // x축의 1%에 해당하는 pixel 구하기.
  return (travelRoadWidth - totalImgWidth) / 100;
}

function getRocketMoveDistancePixel(elements) {
  const srollYPercent = getScrollHeightPercent();
  const xOnePercentPixel = getTravelLoadOnePercentPixel(elements);

  return srollYPercent * xOnePercentPixel;
}

function getRocketRotate(prevScrollHeight, currScrollHeight) {
  // 현재 높이와 이전 높이를 비교하여 스크롤 상하 구분
  if (currScrollHeight > prevScrollHeight) {
    return 'rotate(0deg)';
  } else {
    return 'rotate(180deg)';
  }
}
