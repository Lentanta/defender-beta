import { Bullet } from "./Bullet.js";
import { HitBox } from './HitBox.js';
import { IMG_PATH } from '../utils/constants.js';

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

    this.canonShoot = false;
    this.hitBox = new HitBox(x + size, y, canvas.width, size);
  }

  update(bulletsArr) {
    if (this.isShotting) {
      this.shootTime++;
      if (this.shootTime === this.shootDelay) {
        switch (this.type) {
          case 1:
            bulletsArr.push(new Bullet(this.x + this.width - (1 * 8), this.y + (2 * 4),
              16, 8,
              20, 30));
            break;

          case 2: {
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
          }

          default:
            break;
        }
        this.shootTime = 0;
      };
    }

  };

  draw() {
    if (false) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.fillStyle = 'white';
      ctx.font = '8px Arial';
      ctx.fillText(Math.floor(this.health), this.x, this.y + 8);
    };

    this.sprite.src = `${IMG_PATH}/machines.png`;
    ctx.drawImage(
      this.sprite,
      this.type * 16, 0,
      16, 16,
      this.x, this.y,
      this.width, this.height
    )
  }
}