import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { UNIT_SIZE } from "../utils/constants";

export class Monster {
  position: Position;
  dimension: Dimension;
  type: number;
  health: number;
  speed: number;

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
  };

  draw(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) {

    ctx.drawImage(image,
      this.type * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };

  move() {
    this.position.x -= this.speed;
  };
}