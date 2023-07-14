import { SCALE } from "../utils/constants";
import { Dimension2D } from "./Dimension2D";
import { Position2D } from "./Position2D";
import { Sprite } from "./Sprite";

export class DefenderSelector {
  position: Position2D;
  dimension: Dimension2D;

  defenderType: number;
  sprite: Sprite

  constructor(
    defenderType: number,
    sprite: Sprite,
    position: Position2D,
    dimension: Dimension2D,
  ) {
    this.defenderType = defenderType;
    this.sprite = sprite;

    this.position = position;
    this.dimension = dimension;
  };

  draw(ctx: CanvasRenderingContext2D) {
    this.sprite.draw(
      ctx, 7,
      this.position.x,
      this.position.y,
      2, 2
    )

    this.sprite.draw(
      ctx, this.defenderType,
      this.position.x + (SCALE * 8),
      this.position.y + (SCALE * 5),
      1, 1
    )
  }
}