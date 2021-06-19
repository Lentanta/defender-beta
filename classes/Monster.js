export class Mosnter {
    constructor(y, size) {
        this.x = canvas.width;
        this.y = y;
        this.width = size;
        this.height = size;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.type = 0;
        this.sprite = new Image();
    };
    update() {
        this.x -= this.movement;
    };

    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        // ctx.fillStyle = 'white';
        // ctx.font = '8px Arial';
        // ctx.fillText(Math.floor(this.health), this.x, this.y + 8);

        this.sprite.src = './assets/monsters.png';


        ctx.drawImage(
            this.sprite,
            this.type * 8, 0, 16, 16,
            this.x, this.y, this.width, this.height
        )
    }
}