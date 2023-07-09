import { UNIT_SIZE } from "../utils/constants";
import { Defender } from "../interfaces/Defender"
import { Position2D } from "./Position2D";
import { Dimension2D } from "./Dimension2D";
import { Timer } from "./Timer";

export class DefenderGun implements Defender {
  position: Position2D;
  dimension: Dimension2D;
  sprite: HTMLImageElement;

  disabled: boolean;
  health: number = 100;
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

    this.disabled = false;
    this.isAlive = true;
    this.health = 100;

    this.sprite = sprite;
    this.fireTimer = new Timer(0.2);
  };

  update() {
    if (this.health <= 0)
      this.disabled = true;
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

  notCollided(): void { };

  collided(object: any) {
    if (object.monster) {
      this.health -= 2;
    };
  };
}