import { Position } from "./Position";
import { Dimension } from "./Dimension";

import { GameObject } from "./GameObject";
export class BulletObject implements GameObject {
  position: Position;
  dimension: Dimension;
  speed: number;
  damage: number;
  visible: boolean;

  constructor(position: Position, dimension: Dimension) {
    this.position = position;
    this.dimension = dimension;
    this.damage = 20;
    this.speed = 10;
    this.visible = true;
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    );
  }

  update() {
    this.position.x += this.speed;
  };

  collide(gameObject: GameObject): void {
    // console.log(gameObject);
  };

  isDisabled(): boolean {
    return true;
  }
}

export const isBulletObject = (object: GameObject): object is BulletObject => {
  return "position" in object
    && "dimension" in object
    && "damage" in object
};