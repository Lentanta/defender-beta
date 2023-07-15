export const TILE_SIZE = 16;
export const PIXEL_SIZE = 1;
export const SCALE_RATIO = 3;

export const TILE_AFTER_SCALE = TILE_SIZE * SCALE_RATIO;
export const PIXEL_AFTER_SCALE = PIXEL_SIZE * SCALE_RATIO;

export const NUMBER_OF_HORIZONTAL_TILES = 15;
export const NUMBER_OF_VERTICAL_TILES = 10;

export const CANVAS_WIDTH = TILE_AFTER_SCALE * NUMBER_OF_HORIZONTAL_TILES;
export const CANVAS_HEIGHT = TILE_AFTER_SCALE * NUMBER_OF_VERTICAL_TILES;

export const TOP_MENU_UI_WIDTH = TILE_AFTER_SCALE * 3;
export const TOP_MENU_UI_HEIGHT = TILE_AFTER_SCALE * 2;

export const CARD_UI_UNIT_WIDTH = TILE_AFTER_SCALE * 2;
export const CARD_UI_UNIT_HEIGHT = TILE_AFTER_SCALE * 2;

export const CARD_UI_WIDTH = TILE_AFTER_SCALE * 2;
export const CARD_UI_HEIGHT = TILE_AFTER_SCALE * 2;

export const TYPE_0 = 0;
export const TYPE_1 = 1;
export const TYPE_2 = 2;
export const TYPE_3 = 3;

export enum DEFENDER_INDEX {
  TYPE_0 = 0,
  TYPE_1 = 1,
  TYPE_2 = 2,
  TYPE_3 = 3,
};

export enum MONSTER_INDEX {
  TYPE_0 = 4,
  TYPE_1 = 5,
  TYPE_2 = 6,
};

export const TILE_HIGHLIGHT_INDEX = 21;
export const SELECTOR_UI_INDEX = 7;
export const SELECTOR_HIGHLIGHT_INDEX = 9;
