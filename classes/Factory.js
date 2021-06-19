import { IMG_PATH } from '../utils/constants.js';
import { NumberParticle } from './NumberParticle.js';

export class Factory {
  constructor(x, y, size, generate, delayTime) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;

    this.generate = generate;
    this.delayTime = 300;
    this.generateTime = delayTime / 2;

    this.sprite = new Image();
  };

  update(increaseResourcesCallback, particles) {
    this.generateTime++;
    if (this.generateTime >= this.delayTime) {
      increaseResourcesCallback(this.generate);
      particles.push(new NumberParticle(
        this.x + (this.width / 2) - 20, this.y,
        '+10', 0.02, 20
      ));
      this.generateTime = 0;
    }
  };

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