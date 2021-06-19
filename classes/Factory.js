import { IMG_PATH } from '../utils/constants.js';

export class Factory {
  constructor(x, y, size, generate, delayTime) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;

    this.generate = generate;
    this.delayTime = 300;
    this.generateTime = delayTime / 2;
  };

  update(particles) {

  }

  draw() {
    this.sprite.src = `${IMG_PATH}/machines.png`;
    ctx.drawImage(
      this.sprite,
      0, 0,
      16, 16,
      this.x, this.y,
      this.width, this.height
    )
  }
}