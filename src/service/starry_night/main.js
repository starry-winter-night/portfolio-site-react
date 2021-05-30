import MilkyWayBuilder from './milky_way.js';
import ShootingStarBuilder from './shooting_star.js';

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
