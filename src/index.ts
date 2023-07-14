import { DuckEngine } from "./DuckEngine";

import {
  GameObject,
  isBullet,
  isDefender,
  isMonster
} from "./interfaces/GameObject";
import { Rectangle } from "./interfaces/Rectangle";

import { Position2D } from "./classes/Position2D";
import { Dimension2D } from "./classes/Dimension2D";
import { DefenderGun } from "./classes/Defender/Defender";
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
  NUMBER_OF_HORIZONTAL_TILES,
  NUMBER_OF_VERTICAL_TILES,
  PIXEL_SIZE,
  TILE_SIZE,
  SCALE,
  TOP_MENU_UI_HEIGHT,
  TOP_MENU_UI_WIDTH,
  TYPE_1,
  UNIT_SIZE,
  DEFENDER,
  PIXEL_16
} from "./utils/constants";
import { NormalBullet } from "./classes/NormalBullet";
import { Timer } from "./classes/Timer";
import { GameObjectManagement } from "./classes/Managements/GameObjectManagement";
import { Sprite } from "./classes/Sprite";
import { DefenderSelector } from "./classes/DefenderSelector";

// ===== GLOBAL STATE ===== //
let grid: Rectangle[] = [];

const spriteSheet = await loadImage("assets/sprite-sheet.png");

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

const duckEngine = new DuckEngine(CANVAS_WIDTH, CANVAS_HEIGHT);
const gom = new GameObjectManagement()

let canvasPosition = duckEngine.canvas.getBoundingClientRect();
let mouse: Rectangle = {
  position: new Position2D(-10, -10),
  dimension: new Dimension2D(0.1, 0.1)
};

duckEngine.mouseMove((event) => {
  mouse.position.x = event.x - canvasPosition.left;
  mouse.position.y = event.y - canvasPosition.top;
});

duckEngine.mouseLeave(() => {
  mouse.position.x = -10;
  mouse.position.y = -10;
});

duckEngine.mouseClick(() => {
  for (let index = 0; index < grid.length; index++) {
    const tile = grid[index];

    const defenderPosition = new Position2D(tile.position.x, tile.position.y);
    const defenderDimension = new Dimension2D(TILE_SIZE, TILE_SIZE);

    if (collisionRect(mouse, tile)) {
      const defender = new DefenderGun(
        defenderPosition,
        defenderDimension,
        new Sprite(spriteSheet, UNIT_SIZE)
      );
      gom.add(defender);
      gom.add(defender.ShootArea);
    };
  } -0
});

duckEngine.initialize((ctx) => {
  setBackgroundColor(ctx);
  ctx.imageSmoothingEnabled = false;  // For pixel art
  grid = createGrid();
});

let monsterSpawnTimer = new Timer(1);

const defenderSelector = new DefenderSelector(
  DEFENDER.TYPE_0.INDEX,
  new Sprite(spriteSheet, UNIT_SIZE),
  new Position2D(0, 0),
  new Dimension2D(0, 0)
);

const defenderSelector1 = new DefenderSelector(
  DEFENDER.TYPE_1.INDEX,
  new Sprite(spriteSheet, UNIT_SIZE),
  new Position2D(PIXEL_16 * SCALE * 2, 0),
  new Dimension2D(0, 0)
);

const defenderSelector2 = new DefenderSelector(
  DEFENDER.TYPE_2.INDEX,
  new Sprite(spriteSheet, UNIT_SIZE),
  new Position2D(PIXEL_16 * SCALE * 4, 0),
  new Dimension2D(PIXEL_16, 0)
);

const defenderSelector3 = new DefenderSelector(
  DEFENDER.TYPE_3.INDEX,
  new Sprite(spriteSheet, UNIT_SIZE),
  new Position2D(PIXEL_16 * SCALE * 6, 0),
  new Dimension2D(PIXEL_16, 0)
);

const spawnMonster = () => {
  const positionY = (Math.floor(Math.random() * 8 + 0) * TILE_SIZE) + TOP_MENU_UI_HEIGHT;

  const monster = new NormalMonster(
    new Position2D(CANVAS_WIDTH, positionY),
    new Dimension2D(TILE_SIZE, TILE_SIZE),
    spriteSheet
  );
  gom.add(monster);
};

duckEngine.update((ctx, _, timeStamp) => {
  setBackgroundColor(ctx);

  defenderSelector.draw(ctx);
  defenderSelector1.draw(ctx);
  defenderSelector2.draw(ctx);
  defenderSelector3.draw(ctx);

  if (monsterSpawnTimer.isTime(timeStamp)) {
    spawnMonster()
  };

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

  gom.collisionDetect();

  gom.gameObjects.forEach((item) => {
    if (isDefender(item)) {
      item.shot(timeStamp, () => {
        const bulletPosX = item.position.x + item.dimension.width - (PIXEL_SIZE * 2);
        const bulletPosY = item.position.y + (PIXEL_SIZE * 4);

        const bullet = new NormalBullet(
          new Position2D(bulletPosX, bulletPosY),
          new Dimension2D(PIXEL_SIZE * 3, PIXEL_SIZE * 3)
        );
        gom.add(bullet)
      });
    };

    if (isMonster(item) || isDefender(item) || isBullet(item)) {
      item.update(timeStamp);
    };

    item.draw(ctx);
  });

  gom.remove((object) => !object.isActive);


});