import { UNIT_SIZE } from "../utils/constants";
import {
  VisibleObject,
  Entity,
  GameObject
} from "../Interfaces"
import { Position } from "./Position";
import { Dimension } from "./Dimension";

export interface Defender extends
  GameObject,
  VisibleObject,
  Entity {
  type: number;
  position: Position;
  dimension: Dimension;
  isFire: boolean;
  delayTime: number;
  startFireTime: number | null;
  reset: () => void;
};

export class DefenderGun implements Defender {
  position: Position;
  dimension: Dimension;

  disabled: boolean;
  health: number;
  isAlive: boolean;

  type: number;

  isFire: boolean;
  delayTime: number;
  startFireTime: number | null;
  sprite: HTMLImageElement;

  constructor(
    type: number,
    position: Position,
    dimension: Dimension,
    sprite: HTMLImageElement
  ) {
    this.type = type;
    this.position = position;
    this.dimension = dimension;

    this.disabled = false;
    this.isAlive = true;
    this.health = 100;

    this.sprite = sprite;
    this.isFire = true;

    this.delayTime = 0;
    this.startFireTime = null;
  };

  reset(){

  }

  update(timeStamp: number) {
    if (this.health <= 0) this.disabled = true;

    if (!this.startFireTime) { this.startFireTime = timeStamp };
    let elapsed = (timeStamp - this.startFireTime) / 1000;

    if (this.isFire) {
      if (elapsed - this.delayTime > 2) {
        this.delayTime = elapsed;
      }
    };
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite,
      this.type * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };

  collide(object: any) {
    // if (!this.disabled) {
    //   object.speed = 0;
    //   this.health -= 2;
    // };

    // if (this.disabled) {
      this.health -= 2;
    // };
  };
}