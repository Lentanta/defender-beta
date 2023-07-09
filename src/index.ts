import DuckEngine from "./duckEngine";

import {
  GameObject,
  isBullet,
  isDefender,
  isMonster
} from "./interfaces/GameObject";
import { Rectangle } from "./interfaces/Rectangle";

import { Position2D } from "./classes/Position2D";
import { Dimension2D } from "./classes/Dimension2D";
import { DefenderGun } from "./classes/Defender";
import { NormalMonster } from "./classes/NormalMonster";

import {
  collisionRect,
  isRectangleCollideRectangle
} from "./utils/collision";
import { loadImage } from "./utils/loadImage";
import { iterate2D } from "./utils/iterate2D";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CARD_UI_HEIGHT,
  CARD_UI_UNIT_HEIGHT,
  CARD_UI_UNIT_WIDTH,
  CARD_UI_WIDTH,
  NUMBER_OF_HORIZONTAL_TILES,
  NUMBER_OF_VERTICAL_TILES, PIXEL_SIZE, SCALE, TILE_SIZE,
  TOP_MENU_UI_HEIGHT,
  TOP_MENU_UI_WIDTH,
  TYPE_1,
  UNIT_SIZE
} from "./utils/constants";
import { NormalBullet } from "./classes/NormalBullet";
import { Timer } from "./classes/Timer";
import { ShootArea } from "./classes/ShootArea";

// ===== GLOBAL STATE ===== //
let grid: Rectangle[] = [];
let gameObjects: Array<GameObject> = [];

const informationUI = await loadImage("/assets/informationUI.png");
const cardUI = await loadImage("/assets/cardUI.png");
const defendersSprite = await loadImage("assets/machines.png");
const monstersImg = await loadImage("/assets/monsters.png");

const createGrid = () => {
  let grid: any = [];
  iterate2D(NUMBER_OF_VERTICAL_TILES, NUMBER_OF_HORIZONTAL_TILES, (y, x) => {
    const posX = x * TILE_SIZE;
    const posY = TOP_MENU_UI_HEIGHT + (y * TILE_SIZE);

    const tile: Rectangle = {
      position: new Position2D(posX, posY),
      dimension: new Dimension2D(TILE_SIZE, TILE_SIZE)
    }

    grid.push(tile)
  })
  return grid;
};

const setBackgroundColor = (ctx: CanvasRenderingContext2D) => {
  const background = {
    position: new Position2D(0, 0),
    dimension: new Dimension2D(CANVAS_WIDTH, CANVAS_HEIGHT)
  };

  ctx.fillStyle = "#EDB4A1";
  ctx.fillRect(
    background.position.x,
    background.position.y,
    background.dimension.width,
    background.dimension.height);
};

const initialize = (ctx: CanvasRenderingContext2D) => {
  setBackgroundColor(ctx);
  ctx.imageSmoothingEnabled = false;  // For pixel art
  grid = createGrid();
};

DuckEngine(CANVAS_WIDTH, CANVAS_HEIGHT, async (ctx, canvas) => {
  initialize(ctx);

  let canvasPosition = canvas.getBoundingClientRect();
  let mouse: Rectangle = {
    position: new Position2D(-10, -10),
    dimension: new Dimension2D(0.1, 0.1)
  };

  canvas.addEventListener('mousemove', (event) => {
    mouse.position.x = event.x - canvasPosition.left;
    mouse.position.y = event.y - canvasPosition.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.position.x = -10;
    mouse.position.y = -10;
  });

  canvas.addEventListener('click', () => {
    for (let index = 0; index < grid.length; index++) {
      const tile = grid[index];

      const defenderPosition = new Position2D(
        tile.position.x, tile.position.y
      );
      const defenderDimension = new Dimension2D(
        TILE_SIZE, TILE_SIZE
      );
      const fireAreaPosition = new Position2D(
        defenderPosition.x + defenderDimension.width,
        defenderPosition.y
      );
      const fireAreaDimension = new Dimension2D(
        CANVAS_WIDTH - (defenderPosition.x + TILE_SIZE),
        TILE_SIZE
      );

      if (collisionRect(mouse, tile)) {
        const defender = new DefenderGun(
          defenderPosition,
          defenderDimension,
          defendersSprite
        );
        const fireArea = new ShootArea(
          defender,
          fireAreaPosition,
          fireAreaDimension
        )
        gameObjects.push(defender);
        gameObjects.push(fireArea);
      }
    }
  });

  let monsterSpawnTimer = new Timer(1);

  const spawnMonster = () => {
    const positionY = (Math.floor(
      Math.random() * 8 + 0) * TILE_SIZE) + TOP_MENU_UI_HEIGHT;
    const monster = new NormalMonster(
      new Position2D(CANVAS_WIDTH, positionY),
      new Dimension2D(TILE_SIZE, TILE_SIZE),
      monstersImg
    );
    gameObjects.push(monster);
  };

  // ===== GAME LOOP ===== /
  const gameLoop = (timeStamp: number = 0) => {
    if (monsterSpawnTimer.isTime(timeStamp)) {
      spawnMonster()
    };
    setBackgroundColor(ctx);

    // Mouse hover tile
    grid.forEach((tile: any) => {
      if (collisionRect(tile, mouse)) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(
          tile.position.x,
          tile.position.y,
          tile.dimension.width,
          tile.dimension.height
        );
      };
    });

    ctx.drawImage(informationUI,
      0, 0, (UNIT_SIZE * 3), (UNIT_SIZE * 2),
      0, 0,
      TOP_MENU_UI_WIDTH, TOP_MENU_UI_HEIGHT
    );

    for (let i = 0; i < gameObjects.length; i++) {
      const objectI = gameObjects[i];
      objectI.notCollided();

      // Collision detect
      for (let j = 0; j < gameObjects.length; j++) {
        const objectJ = gameObjects[j];
        if (objectI === objectJ) continue;

        if (isRectangleCollideRectangle(
          objectI.position.x, objectI.position.y,
          objectI.dimension.width,
          objectI.dimension.height,
          objectJ.position.x, objectJ.position.y,
          objectJ.dimension.width,
          objectJ.dimension.height
        )) {
          objectI.collided(objectJ)
        };
      };
    };

    for (let i = 0; i < gameObjects.length; i++) {
      const gameObject = gameObjects[i];

      if (!gameObject.isActive) {
        gameObjects.splice(i, 1);
        i -= 1;
      };

      if (isDefender(gameObject)) {
        gameObject.shot(timeStamp, () => {
          const bullet = new NormalBullet(
            new Position2D(
              gameObject.position.x + gameObject.dimension.width - (PIXEL_SIZE * 2),
              gameObject.position.y + (PIXEL_SIZE * 4)),
            new Dimension2D(PIXEL_SIZE * 3, PIXEL_SIZE * 3)
          );
          gameObjects.push(bullet)
        });
      };

      if (isDefender(gameObject)
        || isMonster(gameObject)
        || isBullet(gameObject)) {
        gameObject.update(timeStamp);
      };

      gameObject.draw(ctx);
    };

    // ==== Render Card UI ==== //
    // ctx.drawImage(cardUI,
    //   UNIT_SIZE * 0, 0,
    //   CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
    //   TILE_SIZE * 3, 0,
    //   CARD_UI_WIDTH, CARD_UI_HEIGHT
    // );
    // ctx.drawImage(cardUI,
    //   UNIT_SIZE * 2, 0,
    //   CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
    //   TILE_SIZE * 5, 0,
    //   CARD_UI_WIDTH, CARD_UI_HEIGHT
    // );
    // ctx.drawImage(cardUI,
    //   UNIT_SIZE * 6, 0,
    //   CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
    //   TILE_SIZE * 7, 0,
    //   CARD_UI_WIDTH, CARD_UI_HEIGHT
    // );

    requestAnimationFrame(gameLoop)
  };
  gameLoop();
});