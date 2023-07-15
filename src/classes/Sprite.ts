import { Dimension } from "../interfaces/Interfaces";
import { Position2D } from "./Position2D";
import { TILE_SIZE } from "../utils/constants";

export class Sprite {
  spriteSheet: HTMLImageElement;

  constructor(
    spriteSheet: HTMLImageElement,
  ) {
    this.spriteSheet = spriteSheet;
  };

  draw(
    ctx: CanvasRenderingContext2D,
    index: number,
    spriteWidth: number,
    spriteHeight: number,
    position: Position2D,
    dimension: Dimension
  ) {
    const columns = this.spriteSheet.width / TILE_SIZE;

    const spriteXCoordinate = index % columns;
    const spriteYCoordinate = Math.floor(index / columns);

    ctx.drawImage(this.spriteSheet,

      // This is for size in sprite sheet
      spriteXCoordinate * TILE_SIZE,
      spriteYCoordinate * TILE_SIZE,
      spriteWidth * TILE_SIZE,
      spriteHeight * TILE_SIZE,

      // This is for size when draw
      position.x, position.y,
      dimension.width,
      dimension.height
    );
  };
};