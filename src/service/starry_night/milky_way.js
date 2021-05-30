import * as starFunc from "./star_function.js";

const BACK_GROUND_COLOR = "rgba(2, 2, 14, 0.3)";

export default class MilkyWayBuilder {
  starCount(count) {
    this.starCount = count;
    return this;
  }

  starSize(size) {
    this.starSize = size;
    return this;
  }

  build(canvas) {
    return new MilkyWay(canvas, this.starCount, this.starSize);
  }
}

class MilkyWay {
  constructor(canvas, starCount, starSize) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.starCount = starFunc.convertStarCount(this.canvas.width, starCount);
    this.starSize = starSize;

    this.milkyWay = [];

    this._init();
  }

  _init() {
    this._createStar();
    this._drawSpace();
  }

  _createStar() {
    for (let num = 0; num < this.starCount; num++) {
      const star = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: starFunc.randomStarSize(this.starSize),
        s: 0,
        e: Math.PI * 2,
        c: starFunc.randomStarColor(),
      };

      this.milkyWay.push(star);
    }
  }

  _drawSpace = () => {
    this.ctx.fillStyle = BACK_GROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.milkyWay.forEach((star) => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.r, star.s, star.e);
      this.ctx.fillStyle = `${star.c}${starFunc.randomStarOpacity()}`;
      this.ctx.fill();
    });

    requestAnimationFrame(this._drawSpace);
  };
}
