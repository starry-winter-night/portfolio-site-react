export default class RocketGuide {
  constructor(element) {
    this.element = element;
    this.prevHeight = 0;
  }

  start() {
    document.addEventListener('scroll', this._render(this.element));
  }

  _render(element) {
    return (e) => {
      const rocket = element.childNodes[1];
      const currHeight = window.pageYOffset;

      const distance = getRocketMoveDistancePixel(element);

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

function getTravelLoadOnePercentPixel(element) {
  const rocektWidth = element.childNodes[0].getBoundingClientRect().width;
  const earthWidth = element.childNodes[1].getBoundingClientRect().width;
  const marsWidth = element.childNodes[2].getBoundingClientRect().width;

  const totalImgWidth = rocektWidth + earthWidth + marsWidth;

  const travelRoadWidth = element.clientWidth;

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
