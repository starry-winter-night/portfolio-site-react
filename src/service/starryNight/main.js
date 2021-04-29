import MilkyWayBuilder from './milkyWay.js';
import ShootingStarBuilder from './shootingStar.js';

export default class StarryNight {
  draw(canvas) {
    new MilkyWayBuilder() //
      .starCount(5)
      .starSize(5)
      .build(canvas);

    new ShootingStarBuilder() //
      .starSize(8)
      .build(canvas);
  }
}
