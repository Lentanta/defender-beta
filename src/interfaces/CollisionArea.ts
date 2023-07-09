import { Collide, Draw, Entity } from "./Interfaces";
import { Rectangle } from "./Rectangle";

export interface CollisionArea extends
  Collide,
  Rectangle,
  Entity,
  Draw {

}