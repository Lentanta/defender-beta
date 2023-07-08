import { Position } from "./Position";
import { Dimension } from "./Dimension";

export class Rectangle {
  position: Position;
  dimension: Dimension;

  constructor(
    position: Position,
    dimension: Dimension
  ) {
    this.position = position;
    this.dimension = dimension;
  };
};