export interface CollisionObject {
  collide<T>(object: T): void;
};

export interface GameObject {
  disabled: boolean
  update(timeStamp?: number): void;
};

export interface Entity {
  health: number;
  isAlive: boolean;
};

export interface MovingObject {
  speed: number;
  move(): void;
};

export interface VisibleObject {
  sprite?: HTMLImageElement;
  draw(ctx: CanvasRenderingContext2D): void;
};