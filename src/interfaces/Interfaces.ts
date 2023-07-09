import { GameObject } from "./GameObject";

export interface Dimension {
  width: number;
  height: number;
};

export interface Position {
  x: number,
  y: number
};

export interface Update {
  update(timeStamp?: number): void;
};

export interface Move {
  speed: number;
  move(): void;
};

export interface Draw {
  sprite?: HTMLImageElement;
  draw(ctx: CanvasRenderingContext2D): void;
};

export interface Collide {
  collided(object: GameObject): void;
  notCollided(): void;
};

export interface Health {
  health: number,
  maxHealth: number
}

export interface Entity {
  type: string;
  isActive: boolean;
};

export interface Shoot {
  isShooting: boolean;
  reloadTime: number;
  shot(
    timeStamp: number,
    callback: () => void
  ): void
};

export interface DealDamage {
  damage: number;
}



