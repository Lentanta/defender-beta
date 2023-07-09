import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { UNIT_SIZE } from "../utils/constants";

export class Monster {
  position: Position;
  dimension: Dimension;
  type: number;
  health: number;
  speed: number;
  sprite: HTMLImageElement;
  disabled: boolean;

  constructor(
    position: Position,
    dimension: Dimension,
    type: number,
    sprite: HTMLImageElement
  ) {
    this.position = position;
    this.dimension = dimension;
    this.type = type;
    this.sprite = sprite;
    this.health = 100;
    this.speed = 1;

    this.disabled = false;
  };

  reset(){
    this.speed = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.disabled) {
      ctx.drawImage(this.sprite,
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

  update(): void {
    if (this.health <= 0) this.disabled = true;
    if (this.position.x < 0) this.disabled = true;

    this.move();
  };

  collide(gameObject: any): void {
    if (gameObject.type && !gameObject.disabled) {
      this.speed = 0;
    };
  };
}