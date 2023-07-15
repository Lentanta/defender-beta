import { PIXEL_AFTER_SCALE, TILE_AFTER_SCALE } from "../utils/constants";
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
      2, 2,
      this.position,
      this.dimension
    )

    this.sprite.draw(
      ctx, this.defenderType,
      1, 1,
      new Position2D(
        this.position.x + (PIXEL_AFTER_SCALE * 8),
        this.position.y + (PIXEL_AFTER_SCALE * 5)),
      new Dimension2D(
        TILE_AFTER_SCALE,
        TILE_AFTER_SCALE
      ))
  }
}