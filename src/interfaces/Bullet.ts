import {
  Collide,
  DealDamage,
  Draw,
  Entity,
  Move,
  Update,
} from "./Interfaces";
import { Rectangle } from "./Rectangle";

export interface Bullet extends
  Rectangle,
  Collide,
  Draw,
  Move,
  Update,
  Entity,
  DealDamage {
  bulletType: number
}