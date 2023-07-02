import { Position } from "./Position";
import { Dimension } from "./Dimension";

export class Defender {
  position: Position;
  dimension: Dimension;
  type: number;

  constructor(
    position: Position,
    dimension: Dimension,
    type: number
  ) {
    this.position = position;
    this.dimension = dimension;
    this.type = type;
  };

  draw(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) {
    const UNIT_SIZE = 16;
    ctx.drawImage(image,
      this.type * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };
}