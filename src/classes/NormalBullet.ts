import { Bullet } from "../interfaces/Bullet";
import { Position2D } from "./Position2D";
import { Dimension2D } from "./Dimension2D";
import { CANVAS_WIDTH } from "../utils/constants";
import { GameObject, isMonster } from "../interfaces/GameObject";

export class NormalBullet implements Bullet {
  position: Position2D;
  dimension: Dimension2D;

  speed: number = 5;
  damage: number = 20;
  isActive: boolean = true;
  type: string = "Bullet";
  bulletType: number = 1;

  constructor(
    position: Position2D,
    dimension: Dimension2D
  ) {
    this.position = position;
    this.dimension = dimension;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    );
  };

  update() {
    if (this.position.x > CANVAS_WIDTH)
      this.isActive = false;

    this.move();
  };

  notCollided(): void {

  };

  collided(object: GameObject) {
    if (isMonster(object)) {
      this.isActive = false;
      object.position.x += 10;
    };
  };

  move(): void {
    this.position.x += this.speed;
  };
};