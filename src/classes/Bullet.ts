import {
  VisibleObject,
  CollisionObject,
  GameObject,
  MovingObject
} from "../Interfaces";
import { Position } from "./Position";
import { Dimension } from "./Dimension";

export interface Bullet extends
  CollisionObject,
  VisibleObject,
  MovingObject,
  GameObject {
  position: Position;
  dimension: Dimension;
  damage: number;
}

export class NormalBullet implements Bullet {
  position: Position;
  dimension: Dimension;

  disabled: boolean;
  speed: number;
  damage: number;
  bullet: true = true;

  constructor(
    position: Position,
    dimension: Dimension
  ) {
    this.position = position;
    this.dimension = dimension;

    this.damage = 5;
    this.speed = 5;

    this.disabled = false;
  }

  reset() {

  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("DRAW")
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    );
  };

  update() {
    this.move();
  };

  move(): void {
    this.position.x += this.speed;
  };

  collide(object: any) {
    if(object.monster){
      this.disabled = true;
    }
  };
};

export const isBullet = (object: Bullet): object is Bullet => {
  return "isDisabled" in object
};
