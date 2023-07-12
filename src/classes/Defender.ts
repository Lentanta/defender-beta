import { CANVAS_WIDTH, UNIT_SIZE } from "../utils/constants";
import { Defender } from "../interfaces/Defender"
import { GameObject, isMonster } from "../interfaces/GameObject";

import { Position2D } from "./Position2D";
import { Dimension2D } from "./Dimension2D";
import { Timer } from "./Timer";
import { ShootArea } from "./ShootArea";

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

  ShootArea: ShootArea;
  isShooting: boolean = false;
  shootTimer: Timer;

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
    this.shootTimer = new Timer(1);

    this.ShootArea = new ShootArea(this,
      new Position2D(
        position.x + dimension.width,
        position.y
      ),
      new Dimension2D(
        CANVAS_WIDTH - (position.x + dimension.width),
        dimension.height
      )
    );
  };

  update() {
    if (this.health <= 0) {
      this.isActive = false;
      this.ShootArea.isActive = false;
    }
  };

  shot(timeStamp: number, callback: () => void) {
    if (this.isShooting && this.shootTimer.isTime(timeStamp)) {
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