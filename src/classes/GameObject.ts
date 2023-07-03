export interface GameObject {
  isDisabled(): boolean;
  draw(ctx: CanvasRenderingContext2D, image?: HTMLImageElement): void;
  update(timeStamp: number): void;
  collide(gameObject: GameObject): void;
};

export interface Moveable {
  speed: number;
  move(): void;
};