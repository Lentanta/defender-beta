export class NumberParticle {
  constructor(x, y, number, fadeOutNum) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.speed = 1;
    this.fadeOutNum = fadeOutNum;
    this.number = number;
  }

  update() {
    this.y -= this.speed;
    this.alpha -= this.fadeOutNum;
  }

  draw() {
    ctx.fillStyle = `rgba(118, 68, 98,${this.alpha})`;
    ctx.font = `bold ${this.number}px Goldman`;
    ctx.fillText(this.number, this.x, this.y + 10);
  }
}