import DuckEngine from "./duckEngine";
import { loadImage } from "./utils/loadImage";
import { iterate2D } from "./utils/iterate2D";
import { Position } from "./classes/Position";
import { collisionRect } from "./utils/collision";
import { Dimension } from "./classes/Dimension";
import { Entity } from "./classes/Entity";
import { Defender } from "./classes/Defender";
import { Monster } from "./classes/Monster";

// ===== CONSTANTS ===== //
const UNIT_SIZE = 16;
const SCALE = 4;

const NUMBER_OF_HORIZONTAL_TILES = 15;
const NUMBER_OF_VERTICAL_TILES = 10;

const TILE_SIZE = UNIT_SIZE * SCALE;
const CANVAS_WIDTH = TILE_SIZE * NUMBER_OF_HORIZONTAL_TILES;
const CANVAS_HEIGHT = TILE_SIZE * NUMBER_OF_VERTICAL_TILES;

const TOP_MENU_UI_WIDTH = TILE_SIZE * 3;
const TOP_MENU_UI_HEIGHT = TILE_SIZE * 2;

const CARD_UI_UNIT_WIDTH = UNIT_SIZE * 2;
const CARD_UI_UNIT_HEIGHT = UNIT_SIZE * 2;

const CARD_UI_WIDTH = TILE_SIZE * 2;
const CARD_UI_HEIGHT = TILE_SIZE * 2;

// ===== GLOBAL STATE ===== //
let grid: Entity[] = [];
let monsters: Monster[] = [];

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


const initialize = (ctx: CanvasRenderingContext2D) => {
  // Set background color
  if (ctx.fillStyle) {
    const pos = { x: 0, y: 0 };
    ctx.fillStyle = "#edb4a1";
    ctx.fillRect(pos.x, pos.y, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  // For pixel art
  ctx.imageSmoothingEnabled = false;

  // create grid
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

  const image = await loadImage("assets/machines.png");
  const informationUI = await loadImage("/assets/informationUI.png");
  const cardUI = await loadImage("/assets/cardUI.png");
  const monstersImg = await loadImage("/assets/monsters.png");

  const defender = new Defender(
    new Position(TILE_SIZE * 0, TILE_SIZE * 5),
    new Dimension(TILE_SIZE, TILE_SIZE),
    0
  );

  let spawnMonsterTime = 0;

  let start: number | null = null;
  // ===== GAME LOOP ===== /
  const gameLoop = (timeStamp: number = 0) => {
    if (!start) { start = timeStamp };

    let elapsed = (timeStamp - start) / 1000;


    if (elapsed - spawnMonsterTime >= 3) {
      console.log("SPAWN")
      const positionY = (Math.floor(Math.random() * 8 + 0) * TILE_SIZE) + TOP_MENU_UI_HEIGHT;
      const monster = new Monster(
        new Position(CANVAS_WIDTH, positionY),
        new Dimension(TILE_SIZE, TILE_SIZE), 0,
      );
      monsters.push(monster);
      spawnMonsterTime = elapsed;
    };

    const rectangle = new Entity(
      new Position(0, 0),
      new Dimension(CANVAS_WIDTH, CANVAS_HEIGHT)
    );


    ctx.fillStyle = "#EDB4A1";
    ctx.fillRect(
      rectangle.position.x || 0,
      rectangle.position.y || 0,
      rectangle.dimension.width,
      rectangle.dimension.height
    );

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
      TILE_SIZE, 0,
      TOP_MENU_UI_WIDTH, TOP_MENU_UI_HEIGHT
    );

    // ==== Render Card UI ==== //
    ctx.drawImage(cardUI,
      UNIT_SIZE * 0, 0,
      CARD_UI_UNIT_WIDTH, CARD_UI_UNIT_HEIGHT,
      TILE_SIZE * 4, 0,
      CARD_UI_WIDTH, CARD_UI_HEIGHT
    );

    defender.draw(ctx, image);

    // ==== UPDATE MONSTERS ==== //
    for (let index = 0; index < monsters.length; index++) {
      const monster = monsters[index];
      monster.move();
      monster.draw(ctx, monstersImg);
      if (collisionRect(mouse, monster)) {
        monsters.splice(index, 1);
        index -= 1;
      }
    };

    requestAnimationFrame(gameLoop)
  };
  gameLoop();
});