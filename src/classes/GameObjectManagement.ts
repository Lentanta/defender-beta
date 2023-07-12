import { GameObject } from "../interfaces/GameObject";
import { isRectangleCollideRectangle } from "../utils/collision";

export class GameObjectManagement {
  gameObjects: GameObject[];

  constructor() {
    this.gameObjects = []
  };

  add(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  };

  remove(callback: (gameObject: GameObject) => boolean) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (callback(this.gameObjects[i])) {
        this.gameObjects.splice(i, 1);
        i -= 1;
      };
    };
  };

  collisionDetect() {
    for (let i = 0; i < this.gameObjects.length; i++) {
      const objectI = this.gameObjects[i];
      objectI.notCollided();

      // Collision detect
      for (let j = 0; j < this.gameObjects.length; j++) {
        const objectJ = this.gameObjects[j];
        if (objectI === objectJ) continue;

        if (isRectangleCollideRectangle(
          objectI.position.x, objectI.position.y,
          objectI.dimension.width,
          objectI.dimension.height,
          objectJ.position.x, objectJ.position.y,
          objectJ.dimension.width,
          objectJ.dimension.height
        )) {
          console.log("HELLO")
          objectI.collided(objectJ)
        };
      };
    };
  };
};