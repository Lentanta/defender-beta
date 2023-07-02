import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { Entity } from "./Entity";
import { UNIT_SIZE } from "../utils/constants";

export class Defender {
  position: Position;
  dimension: Dimension;
  type: number;
  shootArea: Entity
  isFire: boolean;

  delayTime: number;
  startFireTime: number | null;

  constructor(
    type: number,
    position: Position,
    dimension: Dimension,
    shootArea: Entity
  ) {
    this.type = type;
    this.position = position;
    this.dimension = dimension;

    this.shootArea = shootArea;
    this.isFire = false;

    this.delayTime = 0;
    this.startFireTime = null;
  };

  update(timeStamp: number, fireCallback: any) {
    if (!this.startFireTime) { this.startFireTime = timeStamp };
    let elapsed = (timeStamp - this.startFireTime) / 1000;

    if (this.isFire) {
      if (elapsed - this.delayTime > 2) {
        fireCallback();
        this.delayTime = elapsed;
      }
    };
  };

  draw(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) {

    // ctx.fillStyle = 'cyan';
    // ctx.fillRect(
    //   this.shootArea.position.x, this.shootArea.position.y,
    //   this.shootArea.dimension.width, this.dimension.height
    // );

    ctx.drawImage(image,
      this.type * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };
}