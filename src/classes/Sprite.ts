import { SCALE } from "../utils/constants";

export class Sprite {
  spriteSheet: HTMLImageElement;
  tileSize: number;

  constructor(spriteSheet: HTMLImageElement, tileSize: number) {
    this.spriteSheet = spriteSheet;
    this.tileSize = tileSize;
  };

  draw(
    ctx: CanvasRenderingContext2D,
    index: number,
    posX: number,
    posY: number,
    width: number,
    height: number
  ) {
    const columns = this.spriteSheet.width / this.tileSize;

    const spriteXCoordinate = index % columns;
    const spriteYCoordinate = Math.floor(index / columns);

    ctx.drawImage(this.spriteSheet,

      // This is for size in sprite sheet
      spriteXCoordinate * this.tileSize,
      spriteYCoordinate * this.tileSize,
      width * this.tileSize,
      height * this.tileSize,

      // This is for size when draw
      posX, posY,
      width * SCALE * this.tileSize,
      height * SCALE * this.tileSize
    );
  };
};