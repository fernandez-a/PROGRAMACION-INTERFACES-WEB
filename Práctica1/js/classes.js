import { ctx, canvas } from "./scripts.js";

export class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 130,
        }

        this.velocity = {
            x: 0,
            y: 0
        };

        const playerImage = new Image()
        playerImage.src = "../Archivos/src/player.png";
        playerImage.onload = () => {
            this.image = playerImage
            this.width = 15;
            this.height = 15;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
        } else {
            console.log("error")
        }
    }

}

export class Invader10p {
    constructor({ position }) {
        this.position = position;

        this.velocity = {
            x: 0,
            y: 0
        };
        const enemy10pImage = new Image()
        enemy10pImage.src = "../Archivos/src/enemy10p.png";
        enemy10pImage.onload = () => {
            this.image = enemy10pImage
            this.width = 10;
            this.height = 10;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(velocity) {
        this.velocity = velocity
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        } else {
            console.log("error")
        }
    }

}

export class Invader20p {
    constructor({ position }) {
        this.position = position;

        this.velocity = {
            x: 0,
            y: 0
        };
        const enemy20pImage = new Image()
        enemy20pImage.src = "../Archivos/src/enemy20p.png";
        enemy20pImage.onload = () => {
            this.image = enemy20pImage
            this.width = 10;
            this.height = 10;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(velocity) {
        this.velocity = velocity
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        } else {
            console.log("error")
        }
    }

}

export class Invader30p {
    constructor({ position }) {
        this.position = position;

        this.velocity = {
            x: 0,
            y: 0
        };
        const enemy30pImage = new Image()
        enemy30pImage.src = "../Archivos/src/enemy30p.png";
        enemy30pImage.onload = () => {
            this.image = enemy30pImage
            this.width = 10;
            this.height = 10;
        }

    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(velocity) {
        this.velocity = velocity
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        } else {
            console.log("error")
        }
    }

}

export class invadersRow {
    constructor({ y, invaderType }) {
        this.position = {
            x: 0,
            y: y
        }
        this.velocity = {
            x: 0.5,
            y: 0,
        }
        this.columns = 11;
        this.invaders = []
        switch (invaderType) {
            case 1:
                for (let a = 0; a < 11; a++) {
                    this.invaders.push(new Invader10p({ position: { x: (this.position.x + (a * 15)), y: this.position.y } }))
                }
                this.points = 10;
                break;
            case 2:
                for (let a = 0; a < 11; a++) {
                    this.invaders.push(new Invader20p({ position: { x: (this.position.x + (a * 15)), y: this.position.y } }))
                }
                this.points = 20;
                break;
            case 3:
                for (let a = 0; a < 11; a++) {
                    this.invaders.push(new Invader30p({ position: { x: (this.position.x + (a * 15)), y: this.position.y } }))
                }
                this.points = 30;
                break;
        }

        this.width = this.invaders[this.invaders.length - 1].position.x - this.invaders[0].position.x + 10

        console.log(this.invaders)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0;
        if (this.position.x <= 0 || this.position.x + this.width >= canvas.width) {
            this.velocity.x = - this.velocity.x;
            this.velocity.y = 0;
        }
    }

}
export class Defence {
    constructor({ position }) {
        this.position = position;
        this.lives = 4;
        const blockImage = new Image()
        blockImage.src = "../Archivos/src/block.png";
        blockImage.onload = () => {
            this.image = blockImage
            this.width = 25;
            this.height = 15;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
        } else {
            console.log("error")
        }
    }

}

export class Projectile {
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, 1, 5);
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath();
    }

    update() {
        this.draw()
        this.position.y += this.velocity;

    }
}