export class Bullet {
    constructor(x, y, width, height, power, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.power = power;
        this.speed = speed;
    }

    update() {
        this.x += this.speed;
    };

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}