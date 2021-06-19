export class NumberParticle {
  constructor(x, y, content, fadeOutNum, size) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.speed = 1;
    this.fadeOutNum = fadeOutNum;
    this.content = content;
    this.size = size;
  }

  update() {
    this.y -= this.speed;
    this.alpha -= this.fadeOutNum;
  }

  draw() {
    ctx.fillStyle = `rgba(118, 68, 98,${this.alpha})`;
    ctx.font = `bold ${this.size}px Goldman`;
    ctx.fillText(this.content, this.x, this.y + 10);
  }
}