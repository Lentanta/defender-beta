export class SelectCard {
  constructor(x, y, cellSize, type) {
    this.x = x;
    this.y = y;
    this.width = cellSize * 2;
    this.height = cellSize * 2;

    this.spriteSize = 32;

    this.type = type;
    this.sprite = new Image();
  }

  draw() {
    this.sprite.src = './assets/defenders-card.PNG';

    ctx.drawImage(
      this.sprite,
      this.type * 32, 0, this.spriteSize, this.spriteSize,
      this.x, this.y, this.width, this.height
    )
  }
}