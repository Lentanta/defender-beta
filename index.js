import { intitGame } from './utils/DuckEngine.js';
import { collisionRect } from './utils/collision.js';
import { randomBetween } from './utils/functions.js';

import { Cell } from './classes/Cell.js';
import { Mouse } from './classes/Mouse.js';
import { Defender } from './classes/Defender.js';
import { Mosnter } from './classes/Monster.js';
import { SelectCard } from './classes/SelectCard.js';
import { InfomationUI } from './classes/InfomationUI.js';
import { NumberParticle } from './classes/NumberParticle.js';

intitGame(960, 640);

const cellSize = 64;
const selectCards = [];

let gameGrid = [];
let defenders = [];
let bullets = [];
let numberParticles = [];

let monsters = [];
let monsterPosition = [];

let spawnMonsterTime = 0;
let selectType = -1;

let resources = 1000000;
let gameOver = false;

const topMenu = {
	height: cellSize * 2,
	width: canvas.width,
};

const global = {
	width: canvas.width,
	height: canvas.height,
};

let canvasPositon = canvas.getBoundingClientRect();
const mouse = new Mouse();

canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.x - canvasPositon.left;
	mouse.y = e.y - canvasPositon.top;
});

canvas.addEventListener('mouseleave', () => {
	mouse.x = undefined;
	mouse.y = undefined;
});

canvas.addEventListener('click', () => {
	const gridPosX = mouse.x - (mouse.x % cellSize);
	const gridPosY = mouse.y - (mouse.y % cellSize);

	if (gridPosY < topMenu.height) {
		for (let i = 0; i < selectCards.length; i++) {
			if (collisionRect(selectCards[i], mouse)) {
				selectType = selectCards[i].type;
			}
		};
	} else {

		// Not place same defender
		for (let i = 0; i < defenders.length; i++) {
			if (
				defenders[i].x === gridPosX &&
				defenders[i].y === gridPosY
			) return;
		};

		const cost = 100;
		if (selectType >= 0 && resources >= cost) {
			switch (selectType) {
				case 0:
					defenders.push(new Defender(gridPosX, gridPosY, cellSize, selectType, 100, 50));
					break;
				case 1:
					defenders.push(new Defender(gridPosX, gridPosY, cellSize, selectType, 100, 10));
					break;
				default:
					break;
			}

			resources -= cost;
			selectType = -1;
		}

	}
});

window.addEventListener('resize', () => {
	canvasPositon = canvas.getBoundingClientRect();
})

// --- MENU --- //
const infomationUI = new InfomationUI(
	1 * cellSize, 0,
	cellSize * 3, cellSize * 2
);
const handleInformationUI = () => {
	infomationUI.draw();
	infomationUI.resource = resources;
}
const createSelectCards = () => {
	for (let i = 0; i < 2; i++) {
		selectCards.push(new SelectCard(
			(cellSize * 6) + cellSize * i * 2, 0,
			cellSize, i))
	}
}
const handleSelectCards = () => {
	for (let i = 0; i < selectCards.length; i++) {
		selectCards[i].draw();
	}
}

// --- GRID --- //
const createGrid = () => {
	for (let y = topMenu.height; y < global.height; y += cellSize) {
		for (let x = 0; x < global.width; x += cellSize) {
			gameGrid.push(new Cell(x, y, cellSize, cellSize));
		};
	};
};


const drawGrid = () => {
	for (let i = 0; i < gameGrid.length; i++) {
		if (collisionRect(mouse, gameGrid[i])) {
			gameGrid[i].drawCell();
		}
	}
}

// --- DEFENDER --- //
const handleDefenders = () => {
	for (let i = 0; i < defenders.length; i++) {
		defenders[i].draw();
		defenders[i].update(bullets);

		if (defenders[i] && defenders[i].health <= 0) {
			defenders.splice(i, 1);
			i--;
		};

		for (let j = 0; j < monsters.length; j++) {
			// Touch monster
			if (defenders[i] && collisionRect(monsters[j], defenders[i])) {
				monsters[j].movement = 0;
				defenders[i].health -= 0.2;;
			};
			// Check shotting
			if (collisionRect(defenders[i].hitBox, monsters[j])) {
				defenders[i].isShotting = true;
				break;
			} else {
				defenders[i].isShotting = false;
			}
		};
	}
}

// --- MONSTER --- //
const handleMonsters = () => {
	for (let i = 0; i < monsters.length; i++) {
		monsters[i].update();
		monsters[i].draw();
		if (monsters[i].x < 0) {
			gameOver = true;
		}

		if (monsters[i].health <= 0) {
			monsters.splice(i, 1);
			i--;
		}
	};

	// Spawn monster
	if (spawnMonsterTime === 200) {
		const yPos = (Math.floor(Math.random() * 8 + 0) * cellSize) + topMenu.height;
		monsters.push(new Mosnter(yPos, cellSize));
		monsterPosition.push(yPos);
		spawnMonsterTime = 0;
	}
}

// --- BULLETs --- //
const handleBullets = () => {
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].draw();

		if (bullets[i].x > global.width) {
			bullets.splice(i, 1);
			i--;
		}

		for (let m = 0; m < monsters.length; m++) {
			if (monsters[m] && bullets[i] && collisionRect(bullets[i], monsters[m])) {

				const particleX = randomBetween(monsters[m].x, monsters[m].width / 2);
				const fadeNum = (Math.random() * 0.09) + 0.01;
				numberParticles.push(new NumberParticle(
					particleX, monsters[m].y,
					`-${bullets[i].power}`, fadeNum
				))

				monsters[m].health -= bullets[i].power;
				bullets.splice(i, 1);
				i--;
			}
		}
	}
}

// --- Particles --- //
const handleParticles = () => {
	for (let i = 0; i < numberParticles.length; i++) {
		numberParticles[i].update();
		numberParticles[i].draw();

		if (numberParticles[i].alpha <= 0) {
			numberParticles.splice(i, 1);
			i--;
		};
	}
}

const initialize = () => {
	// For pixel art
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;

	createGrid();
	createSelectCards();
}

const gameLoop = () => {
	spawnMonsterTime++;
	ctx.clearRect(0, 0, global.width, global.height);
	drawGrid();
	handleInformationUI();
	handleSelectCards();
	handleDefenders();
	handleMonsters();
	handleBullets();
	handleParticles();
	requestAnimationFrame(gameLoop);
};

initialize();
gameLoop();