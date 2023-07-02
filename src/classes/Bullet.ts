import { Position } from "./Position";
import { Dimension } from "./Dimension";

export class Bullet {
  position: Position;
  dimension: Dimension;
  speed: number;
  damage: number;

  constructor(position: Position, dimension: Dimension) {
    this.position = position;
    this.dimension = dimension;
    this.damage = 20;
    this.speed = 10;
  };

  update(){
    this.position.x += this.speed;
  };

  draw(ctx: CanvasRenderingContext2D){
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    );
  }
}