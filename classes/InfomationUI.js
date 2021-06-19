export class InfomationUI {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.resource = 0;
    this.sprite = new Image();
  }

  draw() {
    this.sprite.src = './assets/informationUI.PNG';

    ctx.drawImage(
      this.sprite,
      0, 0, (16 * 3), (16 * 2),
      this.x, this.y, this.width, this.height
    )

    ctx.fillStyle = '#2c2137';
    ctx.font = `bold ${6 * 4}px Goldman`;
    ctx.fillText(Math.floor(this.resource), this.x + (8 * 4), this.y + (12 * 4));
  }
}