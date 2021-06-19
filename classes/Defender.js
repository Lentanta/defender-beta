import { Bullet } from "./Bullet.js";
import { HitBox } from './HitBox.js';

export class Defender {
  constructor(x, y, size, type, health, shootDelay) {
    this.x = x;
    this.y = y;

    this.width = size;
    this.height = size;
    this.type = type;
    this.health = health;

    this.isShotting = false;
    this.shootTime = shootDelay / 2;
    this.shootDelay = shootDelay;

    this.sprite = new Image();
    this.debug = false;

    this.canonShoot = false;
    this.hitBox = new HitBox(x + size, y, canvas.width, size);
  }

  update(bulletsArr) {
    if (this.isShotting) {
      this.shootTime++;
      if (this.shootTime === this.shootDelay) {
        switch (this.type) {
          case 0:
            bulletsArr.push(new Bullet(this.x + this.width - (1 * 8), this.y + (2 * 4),
              16, 8,
              20, 30));
            break;

          case 1: {
            if (this.canonShoot) {
              bulletsArr.push(new Bullet(this.x + this.width - (1 * 8), this.y + (2 * 4),
                4, 4,
                5, 20));
              this.canonShoot = !this.canonShoot;
              break;
            }
            if (!this.canonShoot) {
              bulletsArr.push(new Bullet(this.x + this.width - (1 * 8), this.y + (4 * 4),
                4, 4,
                5, 20));
              this.canonShoot = !this.canonShoot;
              break;
            }
            console.log(this.canonShoot)
          }
            break;

          default:
            break;
        }
        this.shootTime = 0;
      };
    }

  };

  draw() {
    if (this.debug) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.fillStyle = 'white';
      ctx.font = '8px Arial';
      ctx.fillText(Math.floor(this.health), this.x, this.y + 8);
    }
    this.sprite.src = './assets/defenders.png';

    // ctx.fillStyle = 'blue';
    // ctx.fillRect(this.x + this.width, this.y, canvas.width, this.height);
    ctx.drawImage(
      this.sprite,
      this.type * this.width / 2, 0, this.width / 2, this.height / 2,
      this.x, this.y, this.width, this.height
    )
  }
}