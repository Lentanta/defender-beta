import { GameObject } from "./GameObject";
import { Rectangle } from "./Rectangle";

export class Tile implements GameObject {
  rectangle: Rectangle;

  constructor(rect: Rectangle) {
    this.rectangle = rect;
  }
  isDisabled(): boolean { return false };
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  update(timeStamp: number): void {
    throw new Error("Method not implemented.");
  }
  collide(gameObject: GameObject): void {
    throw new Error("Method not implemented.");
  }
};