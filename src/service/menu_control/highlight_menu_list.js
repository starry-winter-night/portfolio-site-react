class HighlightMenuList {
  on(sections, onObserveTarget) {
    const REQUEST_TRESHOLD = 0.26;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this._getThresholdMinimumNumber(sections, REQUEST_TRESHOLD),
    };
    const observer = new IntersectionObserver(
      this._callback(onObserveTarget),
      options
    );

    sections.forEach((dom) => observer.observe(dom));
  }

  _callback(onObserveTarget) {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          this._setElementByObserve(
            onObserveTarget,
            entry.target,
            entry.boundingClientRect.y
          );
        } else if (entry.isIntersecting && entry.intersectionRatio > 0) {
          this._setElementByObserve(onObserveTarget, entry.target);
        }
      });
    };
  }

  _setElementByObserve(onObserveTarget, target, y) {
    if (!y) return;
    
    if (y < 0) {
      onObserveTarget(target.nextElementSibling.id);
    } else if (y > 0) {
      onObserveTarget(target.previousElementSibling.id);
    } else {
      onObserveTarget(target.id);
    }
  }

  _getThresholdMinimumNumber(section, threshold) {
    /* 
        지정한 rect의 높이의 %가 채워지면 옵저버가 가동한다. 
        주의할 점은 threshold로 지정한 %만큼의 rect 높이가 root로 지정한 부모 rect(default: viewport)의 
        높이 보다 높다면 옵저버가 가동되지 않는다.
        즉, 옵저버거 rect를 놓치지 않게 최소 인식 가능한 threshold 비율을 구해보았다. 
      */
    const browserHeight = window.innerHeight;
    const highestSectionHeight = Array.from(section)
      .map((dom) => dom.getBoundingClientRect().height)
      .sort((a, b) => b - a)[0];
    const minimumThreshold = browserHeight / highestSectionHeight;
    return minimumThreshold < threshold
      ? minimumThreshold.toFixed(2) - 0.03
      : threshold;
  }
}

export default HighlightMenuList;
