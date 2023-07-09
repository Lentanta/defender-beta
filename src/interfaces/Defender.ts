import {
  Collide,
  Draw,
  Entity,
  Health,
  Shoot,
  Update,
} from "./Interfaces";
import { Rectangle } from "./Rectangle";

export interface Defender extends
  Rectangle,
  Collide,
  Draw,
  Update,
  Health,
  Shoot,
  Entity {
  defenderType: number
}