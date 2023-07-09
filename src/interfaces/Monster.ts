import {
  Collide,
  DealDamage,
  Draw,
  Entity,
  Move,
  Update,
  Health
} from "./Interfaces";
import { Rectangle } from "./Rectangle";

export interface Monster extends
  Rectangle,
  Collide,
  Draw,
  Move,
  Update,
  Entity,
  Health,
  DealDamage {
  monsterType: number
}