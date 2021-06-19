import { IMG_PATH } from '../utils/constants.js';

export class SelectCard {
  constructor(x, y, cellSize, pos) {
    this.x = x;
    this.y = y;
    this.width = cellSize * 2;
    this.height = cellSize * 2;

    this.pos = pos;
    this.sprite = new Image();
  }

  draw() {
    this.sprite.src = `${IMG_PATH}/cardUI.png`;
    ctx.drawImage(
      this.sprite,
      this.pos * (16 * 2), 0,
      16 * 2, 16 * 2,
      this.x, this.y,
      this.width, this.height
    )
  }
}