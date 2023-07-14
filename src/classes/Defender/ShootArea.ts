import { CollisionArea } from "../../interfaces/CollisionArea";
import { Defender } from "../../interfaces/Defender";
import { GameObject, isMonster } from "../../interfaces/GameObject";
import { Dimension2D } from "../Dimension2D";
import { Position2D } from "../Position2D";

export class ShootArea implements CollisionArea {
  defender: Defender;
  position: Position2D;
  dimension: Dimension2D;

  type: string = "CollisionArea";
  isActive: boolean;

  constructor(
    defender: Defender,
    position: Position2D,
    dimension: Dimension2D
  ) {
    this.defender = defender;
    this.position = position;
    this.dimension = dimension;
    this.isActive = defender.isActive;
  };

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  };

  notCollided(): void {
    this.defender.isShooting = false;
  };

  collided(object: GameObject): void {
    if (isMonster(object)) {
      this.defender.isShooting = true;
    }
  }
}