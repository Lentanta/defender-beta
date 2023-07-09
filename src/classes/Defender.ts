import { UNIT_SIZE } from "../utils/constants";
import {
  VisibleObject,
  Entity,
  GameObject
} from "../Interfaces"
import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { Timer } from "./Timer";

export interface Defender extends
  GameObject,
  VisibleObject,
  Entity {
  type: number;
  position: Position;
  dimension: Dimension;
  isFire: boolean;
  fireTimer: Timer;
  reset: () => void;
};

export class DefenderGun implements Defender {
  position: Position;
  dimension: Dimension;

  disabled: boolean;
  health: number;
  isAlive: boolean;

  type: number;
  sprite: HTMLImageElement;

  isFire: boolean;
  fireTimer: Timer;

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

    this.isFire = false;
    this.fireTimer = new Timer(0.2);
  };

  reset() {
    // this.isFire = false;
  }

  update(timeStamp: number) {
    if (this.health <= 0) this.disabled = true;
  };

  fire(timeStamp: number, callback: () => void) {
    if (this.isFire && this.fireTimer.isTime(timeStamp)) {
      callback()
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
    if (object.monster) {
      this.health -= 2;
    };
  };
}