import DuckEngine from "./duckEngine";
import { loadImage } from "./utils/loadImage";
import { iterate2D } from "./utils/iterate2D";
import { Position } from "./classes/Position";
import { collisionRect } from "./utils/collision";

import { Dimension } from "./classes/Dimension";
import { Entity } from "./classes/Entity";
import { Defender } from "./classes/Defender";
import { Monster } from "./classes/Monster";
import { Rectangle } from "./classes/Rectangle";

import { GameObject } from "./classes/GameObject";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CARD_UI_HEIGHT,
  CARD_UI_UNIT_HEIGHT,
  CARD_UI_UNIT_WIDTH,
  CARD_UI_WIDTH,
  NUMBER_OF_HORIZONTAL_TILES,
  NUMBER_OF_VERTICAL_TILES, TILE_SIZE,
  TOP_MENU_UI_HEIGHT,
  TOP_MENU_UI_WIDTH,
  TYPE_1,
  UNIT_SIZE
} from "./utils/constants";
import { NormalBullet } from "./classes/Bullet";
import { Timer } from "./classes/Timer";

// ===== GLOBAL STATE ===== //
let grid: Entity[] = [];
let monsters: Monster[] = [];
let defenders: Defender[] = [];

let gameObjects: any[] = [];

const informationUI = await loadImage("/assets/informationUI.png");
const cardUI = await loadImage("/assets/cardUI.png");
const defendersImg = await loadImage("assets/machines.png");
const monstersImg = await loadImage("/assets/monsters.png");

const createGrid = () => {
  let grid: any = [];
  iterate2D(NUMBER_OF_VERTICAL_TILES, NUMBER_OF_HORIZONTAL_TILES, (y, x) => {
    const posX = x * TILE_SIZE;
    const posY = TOP_MENU_UI_HEIGHT + (y * TILE_SIZE);

    const tile = new Entity(
      new Position(posX, posY),
      new Dimension(TILE_SIZE, TILE_SIZE)
    );
    grid.push(tile)
  })
  return grid;
};

const setBackgroundColor = (ctx: CanvasRenderingContext2D) => {
  const background = new Rectangle(0, 0,
    CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "#EDB4A1";
  ctx.fillRect(
    background.position.x, background.position.y,
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
  let mouse = new Entity(
    new Position(-10, -10),
    new Dimension(0.1, 0.1)
  );

  canvas.addEventListener('mousemove', (event) => {
    mouse.position.setPosition(
      event.x - canvasPosition.left,
      event.y - canvasPosition.top
    );
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.position.setPosition(-10, -10);
  });

  canvas.addEventListener('click', () => {
    for (let index = 0; index < grid.length; index++) {
      const tile = grid[index];
      if (collisionRect(mouse, tile)) {
        const defender = new Defender(
          TYPE_1,
          new Position(tile.position.x, tile.position.y),
          new Dimension(TILE_SIZE, TILE_SIZE),
          new Entity(
            new Position(tile.position.x, tile.position.y),
            new Dimension(CANVAS_WIDTH, TILE_SIZE)),
        );
        console.log(defender)
        defenders.push(defender);
      }
    }
  });

  let monsterSpawnTimer = new Timer(1);

  const spawnMonster = () => {
    const positionY = (Math.floor(
      Math.random() * 8 + 0) * TILE_SIZE) + TOP_MENU_UI_HEIGHT;
    const monster = new Monster(
      new Position(CANVAS_WIDTH, positionY),
      new Dimension(TILE_SIZE, TILE_SIZE), 0,
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

    // ==== Render Card UI ==== //
    ctx.drawImage(cardUI,
      UNIT_SIZE * 0, 0,
      CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
      TILE_SIZE * 3, 0,
      CARD_UI_WIDTH, CARD_UI_HEIGHT
    );
    ctx.drawImage(cardUI,
      UNIT_SIZE * 2, 0,
      CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
      TILE_SIZE * 5, 0,
      CARD_UI_WIDTH, CARD_UI_HEIGHT
    );
    ctx.drawImage(cardUI,
      UNIT_SIZE * 6, 0,
      CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
      TILE_SIZE * 7, 0,
      CARD_UI_WIDTH, CARD_UI_HEIGHT
    );

    // ==== UPDATE OBJECTS ==== //
    for (let indexA = 0; indexA < gameObjects.length; indexA++) {
      const gameObjectA = gameObjects[indexA];
      gameObjectA.update(timeStamp);
      gameObjectA.draw(ctx, monstersImg);

      // Remove object from array
      if (gameObjectA.disabled) {
        gameObjects.splice(indexA, 1);
      };

      for (let indexB = 0; indexB < gameObjects.length; indexB++) {
        const gameObjectB = gameObjects[indexB];
        if (gameObjectA === gameObjectB) continue;

        if (collisionRect(gameObjectA, gameObjectB)) {
          gameObjectA.collide(gameObjectB);
        };
      };
    };

    // ==== UPDATE DEFENDERS ==== //
    for (let index = 0; index < defenders.length; index++) {
      const defender = defenders[index];

      defender.draw(ctx, defendersImg);
      defender.update(timeStamp, () => {
        gameObjects.push(new NormalBullet(
          new Position(defender.)
          defender.position.y,
          30, 30
        ))
      })

      for (let index2 = 0; index2 < monsters.length; index2++) {
        const monster = monsters[index2];
        if (collisionRect(defender.shootArea, monster)) {
          defender.isFire = true;
          break;
        } else {
          defender.isFire = false;
        }
      }
    };

    requestAnimationFrame(gameLoop)
  };
  gameLoop();
});