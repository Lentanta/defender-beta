import { CollisionObject, GameObject, VisibleObject } from "../Interfaces";
import { Defender } from "./Defender";
import { Dimension } from "./Dimension";
import { Position } from "./Position";

export class FireArea implements CollisionObject, GameObject, VisibleObject {
  defender: Defender;
  position: Position;
  dimension: Dimension;

  disabled: boolean;

  constructor(
    defender: Defender,
    position: Position,
    dimension: Dimension
  ) {
    this.defender = defender;
    this.position = position;
    this.dimension = dimension;
    this.disabled = false;
  }

  reset() {
    this.defender.isFire = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  }

  update(): void {
    if (this.defender.disabled) {
      this.disabled = true;
    }
  }

  collide(object: any): void {
    if(object.monster){
      this.defender.isFire = true
    }
    // this.defender.position.x += 1;
  }
}