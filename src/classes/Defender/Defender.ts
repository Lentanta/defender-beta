import {
  CANVAS_WIDTH, DEFENDER_INDEX
} from "../../utils/constants";
import { Defender } from "../../interfaces/Defender"
import { GameObject, isMonster } from "../../interfaces/GameObject";

import { Position2D } from "../Position2D";
import { Dimension2D } from "../Dimension2D";
import { Timer } from "../Timer";
import { ShootArea } from "./ShootArea";
import { Sprite } from "../Sprite";

export class DefenderGun implements Defender {
  position: Position2D;
  dimension: Dimension2D;
  sprite: Sprite;

  health: number = 10;
  maxHealth: number = 100;
  isAlive: boolean;
  reloadTime: number = 1;
  isActive: boolean = true;

  type: string = "Defender";
  defenderType: number = DEFENDER_INDEX.TYPE_1;

  ShootArea: ShootArea;
  isShooting: boolean = false;
  shootTimer: Timer;

  constructor(
    defenderType: DEFENDER_INDEX,
    position: Position2D,
    dimension: Dimension2D,
    sprite: Sprite
  ) {
    this.defenderType = defenderType;
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
    this.sprite.draw(
      ctx,
      this.defenderType,
      1, 1,
      this.position,
      this.dimension
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