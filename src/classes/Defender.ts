import { UNIT_SIZE } from "../utils/constants";
import { Defender } from "../interfaces/Defender"
import { Position2D } from "./Position2D";
import { Dimension2D } from "./Dimension2D";
import { Timer } from "./Timer";
import { GameObject, isMonster } from "../interfaces/GameObject";

export class DefenderGun implements Defender {
  position: Position2D;
  dimension: Dimension2D;
  sprite: HTMLImageElement;

  health: number = 10;
  maxHealth: number = 100;
  isAlive: boolean;
  reloadTime: number = 1;
  isActive: boolean = true;

  type: string = "Defender";
  defenderType: number = 1;
  isShooting: boolean = false;

  fireTimer: Timer;

  constructor(
    position: Position2D,
    dimension: Dimension2D,
    sprite: HTMLImageElement
  ) {
    this.position = position;
    this.dimension = dimension;

    this.isAlive = true;
    this.health = 100;

    this.sprite = sprite;
    this.fireTimer = new Timer(1);
  };

  update() {
    if (this.health <= 0)
      this.isActive = false;
  };

  shot(timeStamp: number, callback: () => void) {
    if (this.isShooting && this.fireTimer.isTime(timeStamp)) {
      callback()
    };
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite,
      this.defenderType * UNIT_SIZE, 0 * UNIT_SIZE,
      UNIT_SIZE, UNIT_SIZE,
      this.position.x, this.position.y,
      this.dimension.width, this.dimension.height
    )
  };

  notCollided(): void { 

  };

  collided(object: GameObject) {
    if (isMonster(object)) {
      this.health -= 2;
    };
  };
}