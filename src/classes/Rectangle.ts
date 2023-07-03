import { Dimension } from "./Dimension";
import { Position } from "./Position";

export class Rectangle {
  position: Position;
  dimension: Dimension;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.position = new Position(x, y);
    this.dimension = new Dimension(width, height);
  }
};