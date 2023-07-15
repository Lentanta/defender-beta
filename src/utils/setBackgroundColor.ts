import { Dimension2D } from "../classes/Dimension2D";
import { Position2D } from "../classes/Position2D";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

export const setBackgroundColor = (ctx: CanvasRenderingContext2D) => {
  const background = {
    position: new Position2D(0, 0),
    dimension: new Dimension2D(
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    )
  };

  ctx.fillStyle = "#EDB4A1";
  ctx.fillRect(
    background.position.x,
    background.position.y,
    background.dimension.width,
    background.dimension.height);
};