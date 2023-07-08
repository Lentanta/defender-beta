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
  damage: number;
}

export class NormalBullet implements Bullet {
  position: Position;
  dimension: Dimension;

  type: string;
  disabled: boolean;
  speed: number;
  damage: number;

  constructor(
    dimension: Dimension,
    position: Position,
  ) {
    this.type = "bullet";

    this.position = position;
    this.dimension = dimension;

    this.damage = 50;
    this.speed = 5;

    this.disabled = false;
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

  collide<CollisionObject>(object: CollisionObject) {
    console.log("BULLET: ", object);
  };
};

export const isBullet = (object: Bullet): object is Bullet => {
  return "isDisabled" in object
};
