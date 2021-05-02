(function rocketGuide() {
  let prevScrollHeight = 0; // 스크롤시 0부터 시작.
  const rocketImg = document.querySelector(".navbar__rocket");
  const travelRoad = document.querySelector(".navbar__guide");
  const earthImg = document.querySelector(".navbar__earth");
  const marsImg = document.querySelector(".navbar__mars");
  document.addEventListener("scroll", optimization(initRocketGuide), false);

  function initRocketGuide() {
    const travelRoadWidth = travelRoad.clientWidth;
    const scrollHeight = window.pageYOffset;
    const pageTotalHeight = document.documentElement.scrollHeight;
    const currentViewHeight = window.innerHeight;

    render();
    updatePrevScrollHeight();

    function render() {
      const travelDistance = applyRocketMove();

      rocketImg.style.transform = `${travelDistance()} ${chageRocketRotate()}`;
    }

    function applyRocketMove() {
      let startDistance = 50;
      return () => {
        let travelDistance = null;

        if (!startDistance) {
          travelDistance = calcRocketTravelDistance() + earthImg.clientWidth;
        }

        if (startDistance) {
          travelDistance =
            calcRocketTravelDistance() + earthImg.clientWidth - startDistance;
          startDistance = null;
        }

        return `translateX(${travelDistance}px)`;
      };
    }
    function chageRocketRotate() {
      return scrollHeight > prevScrollHeight
        ? "rotate(0deg)"
        : "rotate(180deg)";
    }
    function calcScrollTopMaximum() {
      return pageTotalHeight - currentViewHeight;
    }
    function calcHeightValuePercent() {
      return Math.floor((scrollHeight / calcScrollTopMaximum()) * 100);
    }
    // 스크롤 마다 움직일 pixel
    function calcOnePercentWidthPixel() {
      return (
        (travelRoadWidth -
          (rocketImg.clientWidth +
            earthImg.clientWidth +
            marsImg.clientWidth)) /
        100
      );
    }
    function calcRocketTravelDistance() {
      return calcOnePercentWidthPixel() * calcHeightValuePercent();
    }
    function updatePrevScrollHeight() {
      prevScrollHeight = scrollHeight <= 0 ? 0 : scrollHeight;
    }
  }

  // 최적화
  function optimization(callback) {
    let ticking = null;
    return function () {
      if (ticking) {
        window.cancelAnimationFrame(ticking);
      }
      ticking = window.requestAnimationFrame(() => {
        callback();
      });
    };
  }
})();
