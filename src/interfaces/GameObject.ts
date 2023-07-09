import { Bullet } from "./Bullet";
import { Defender } from "./Defender";
import { Monster } from "./Monster";
import { CollisionArea } from "./CollisionArea";

export type GameObject = Bullet | Defender | Monster | CollisionArea;

export function isDefender(object: GameObject): object is Defender {
  return object.type === "Defender"
};

export function isMonster(object: GameObject): object is Monster {
  return object.type === "Monster"
};

export function isBullet(object: GameObject): object is Bullet {
  return object.type === "Bullet"
};

export function CollisionArea(object: GameObject): object is CollisionArea {
  return object.type === "CollisionArea"
};