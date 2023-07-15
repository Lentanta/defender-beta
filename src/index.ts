import { DuckEngine } from "./DuckEngine";

import {
  isBullet,
  isDefender,
  isMonster
} from "./interfaces/GameObject";
import { Rectangle } from "./interfaces/Rectangle";

import { Position2D } from "./classes/Position2D";
import { Dimension2D } from "./classes/Dimension2D";
import { DefenderGun } from "./classes/Defender/Defender";
import { NormalMonster } from "./classes/NormalMonster";

import { collisionRect } from "./utils/collision";
import { loadImage } from "./utils/loadImage";
import { iterate2D } from "./utils/iterate2D";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFENDER_INDEX,
  NUMBER_OF_HORIZONTAL_TILES,
  NUMBER_OF_VERTICAL_TILES,
  PIXEL_AFTER_SCALE,
  SELECTOR_HIGHLIGHT_INDEX,
  TILE_AFTER_SCALE,
  TOP_MENU_UI_HEIGHT,
} from "./utils/constants";
import { NormalBullet } from "./classes/NormalBullet";
import { Timer } from "./classes/Timer";
import { GameObjectManagement } from "./classes/Managements/GameObjectManagement";
import { Sprite } from "./classes/Sprite";
import { DefenderSelector } from "./classes/DefenderSelector";
import { randomBetween } from "./utils/randomBetween";
import { setBackgroundColor } from "./utils/setBackgroundColor";

// ===== GLOBAL STATE ===== //
let tiles: (Rectangle & { isEmpty: boolean })[] = [];
let selectedDefenderType = DEFENDER_INDEX.TYPE_0;

const spriteSheet = await loadImage("assets/sprite-sheet.png");
const sprite = new Sprite(spriteSheet);

const createTiles = () => {
  let tiles: any = [];
  iterate2D(NUMBER_OF_VERTICAL_TILES, NUMBER_OF_HORIZONTAL_TILES, (y, x) => {
    const posX = x * TILE_AFTER_SCALE;
    const posY = TOP_MENU_UI_HEIGHT + (y * TILE_AFTER_SCALE);

    const tile: Rectangle & { isEmpty: boolean } = {
      isEmpty: true,
      position: new Position2D(posX, posY),
      dimension: new Dimension2D(TILE_AFTER_SCALE, TILE_AFTER_SCALE)
    };

    tiles.push(tile)
  })
  return tiles;
};

const duckEngine = new DuckEngine(CANVAS_WIDTH, CANVAS_HEIGHT);
const gom = new GameObjectManagement()

let canvasPosition = duckEngine.canvas.getBoundingClientRect();
let mouse: Rectangle = {
  position: new Position2D(-10, -10),
  dimension: new Dimension2D(0.1, 0.1)
};

const defenderSelector = new DefenderSelector(
  DEFENDER_INDEX.TYPE_0,
  sprite,
  new Position2D(0, 0),
  new Dimension2D(
    TILE_AFTER_SCALE * 2,
    TILE_AFTER_SCALE * 2
  )
);

const defenderSelector1 = new DefenderSelector(
  DEFENDER_INDEX.TYPE_1,
  sprite,
  new Position2D(TILE_AFTER_SCALE * 2, 0),
  new Dimension2D(
    TILE_AFTER_SCALE * 2,
    TILE_AFTER_SCALE * 2
  )
);

const defenderSelector2 = new DefenderSelector(
  DEFENDER_INDEX.TYPE_2,
  sprite,
  new Position2D(TILE_AFTER_SCALE * 4, 0),
  new Dimension2D(
    TILE_AFTER_SCALE * 2,
    TILE_AFTER_SCALE * 2
  )
);

const defenderSelector3 = new DefenderSelector(
  DEFENDER_INDEX.TYPE_3,
  sprite,
  new Position2D(TILE_AFTER_SCALE * 6, 0),
  new Dimension2D(
    TILE_AFTER_SCALE * 2,
    TILE_AFTER_SCALE * 2
  )
);

let defenderSelectors = [
  defenderSelector,
  defenderSelector1,
  defenderSelector2,
  defenderSelector3,
];

duckEngine.mouseMove((event) => {
  mouse.position.x = event.x - canvasPosition.left;
  mouse.position.y = event.y - canvasPosition.top;
});

duckEngine.mouseLeave(() => {
  mouse.position.x = -10;
  mouse.position.y = -10;
});

duckEngine.mouseClick(() => {
  for (let index = 0; index < tiles.length; index++) {
    const tile = tiles[index];

    const defenderPosition = new Position2D(tile.position.x, tile.position.y);
    const defenderDimension = new Dimension2D(TILE_AFTER_SCALE, TILE_AFTER_SCALE);

    if (collisionRect(mouse, tile)) {
      if (tile.isEmpty) {
        const defender = new DefenderGun(
          selectedDefenderType,
          defenderPosition,
          defenderDimension,
          sprite
        );
        gom.add(defender);
        gom.add(defender.ShootArea);
      }
    };

    defenderSelectors.forEach((selector) => {
      if (collisionRect(mouse, selector)) {
        selectedDefenderType = selector.defenderType;
      }
    })
  }
});

let monsterSpawnTimer = new Timer(1);
const spawnMonster = () => {
  const positionY = randomBetween(0, 8) * TILE_AFTER_SCALE + TOP_MENU_UI_HEIGHT;
  const monster = new NormalMonster(
    new Position2D(
      CANVAS_WIDTH,
      positionY),
    new Dimension2D(
      TILE_AFTER_SCALE,
      TILE_AFTER_SCALE),
    spriteSheet
  );
  gom.add(monster);
};

// ----- INITIALIZE ----- //
duckEngine.initialize((ctx) => {
  setBackgroundColor(ctx);
  ctx.imageSmoothingEnabled = false;  // For pixel art
  tiles = createTiles();
});

// ----- UPDATE ----- //
duckEngine.update((ctx, _, timeStamp) => {
  setBackgroundColor(ctx);

  defenderSelectors.forEach((selector) => {
    selector.draw(ctx);
    if (collisionRect(mouse, selector)) {
      sprite.draw(
        ctx, SELECTOR_HIGHLIGHT_INDEX,
        2, 2,
        selector.position,
        selector.dimension
      )
    }
  });

  if (monsterSpawnTimer.isTime(timeStamp)) {
    spawnMonster()
  };

  const tileHighlight = new Sprite(spriteSheet);

  tiles.forEach((tile: any) => {
    if (collisionRect(tile, mouse)) {
      tileHighlight.draw(
        ctx, 21,
        1, 1,
        tile.position,
        tile.dimension
      );
    };
  });

  gom.collisionDetect();

  gom.gameObjects.forEach((item) => {
    if (isDefender(item)) {
      item.shot(timeStamp, () => {
        const bulletPosX = item.position.x + item.dimension.width - (PIXEL_AFTER_SCALE * 2);
        const bulletPosY = item.position.y + (PIXEL_AFTER_SCALE * 4);

        const bullet = new NormalBullet(
          new Position2D(bulletPosX, bulletPosY),
          new Dimension2D(PIXEL_AFTER_SCALE * 3, PIXEL_AFTER_SCALE * 3)
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