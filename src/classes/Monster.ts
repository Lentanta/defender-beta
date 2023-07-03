import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { CANVAS_WIDTH, UNIT_SIZE } from "../utils/constants";
import { GameObject } from "./GameObject";
import { isBulletObject } from "./Bullet";

export class Monster implements GameObject {
  position: Position;
  dimension: Dimension;
  type: number;
  health: number;
  speed: number;

  disabled: boolean;

  constructor(
    position: Position,
    dimension: Dimension,
    type: number,
  ) {
    this.position = position;
    this.dimension = dimension;
    this.type = type;
    this.health = 100;
    this.speed = 0.4;

    this.disabled = false;
  };

  draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    if (!this.disabled) {
      ctx.drawImage(image,
        this.type * UNIT_SIZE, 0 * UNIT_SIZE,
        UNIT_SIZE, UNIT_SIZE,
        this.position.x, this.position.y,
        this.dimension.width, this.dimension.height
      )
    }
  };

  move() {
    this.position.x -= this.speed;
  };

  update(timeStamp: number): void {
    if (this.position.x < CANVAS_WIDTH / 2) {
      this.disabled = true;
    }
    this.move();
  };

  collide(gameObject: GameObject): void {
    if (this.disabled) return;

    if (isBulletObject(gameObject)) {
      this.disabled = true;
    };
  }

  isDisabled(): boolean {
    return this.disabled;
  }
}