import { Position2D } from "./Position2D";
import { Dimension2D } from "./Dimension2D";
import { UNIT_SIZE } from "../utils/constants";
import { Monster } from "../interfaces/Monster";
import { GameObject, isBullet, isDefender } from "../interfaces/GameObject";

export class NormalMonster implements Monster {
  position: Position2D;
  dimension: Dimension2D;

  type: string = "Monster";
  monsterType: number = 0;

  health: number = 100;
  maxHealth: number = 100;
  damage: number = 10;

  speed: number = 1;
  sprite: HTMLImageElement;
  isActive: boolean = true;

  constructor(
    position: Position2D,
    dimension: Dimension2D,
    sprite: HTMLImageElement
  ) {
    this.position = position;
    this.dimension = dimension;
    this.sprite = sprite;
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite,
      this.monsterType * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };

  move() {
    this.position.x -= this.speed;
  };

  update(): void {
    if (this.health <= 0) this.isActive = false;
    if (this.position.x < 0) this.isActive = false;

    this.move();
  };

  notCollided(): void {
    this.speed = 1;
  };

  collided(gameObject: GameObject): void {
    if (isDefender(gameObject)) {
      this.speed = 0;
    };

    if (isBullet(gameObject)) {
      this.health -= gameObject.damage;
    };
  };
}