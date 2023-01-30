import { Player, Projectile, invadersRow, Defence } from "./classes.js";

let score = 0;
let lives = 3;
let gameOver = false;

export var canvas = document.querySelector("canvas");
export var ctx = canvas.getContext("2d");
const player = new Player();
const projectiles = []
const enemyProjectiles = []
const defence1 = new Defence({ position: { x: 50, y: 100 } })
const defence2 = new Defence({ position: { x: 135, y: 100 } })
const defence3 = new Defence({ position: { x: 220, y: 100 } })
const defences = [defence1, defence2, defence3]
const fila1 = new invadersRow({ y: 10, invaderType: 3 });
const fila2 = new invadersRow({ y: 25, invaderType: 2 });
const fila3 = new invadersRow({ y: 40, invaderType: 1 });
const fila4 = new invadersRow({ y: 55, invaderType: 1 });
const filas = [fila1, fila2, fila3, fila4]
const elem = document.getElementById("Score");
let win = 0;

function animate() {
    filas.forEach(element => {
        win += element.invaders.length
    });
    if(gameOver || win === 0){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        var div = document.getElementById("gameOver");
        if(win === 0){
            div.innerHTML = `CONGRATS YOU WON<br>Score : ${score}<br><a href = "game.html" id = "PlayAgain">Play Again</a>`
        }else{
            div.innerHTML = `GAME OVER<br>Score : ${score}<br><a href = "game.html" id = "PlayAgain">Play Again</a>`
        }
        
        return;
    }else{
        win = 0;
    }
    requestAnimationFrame(animate)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (lives > 0) player.update()
    else {
        player.draw()
    }
    filas.forEach((fila) => {
        fila.update()
        fila.invaders.forEach((enemy, index) => {
            enemy.update(fila.velocity)
            projectiles.forEach((projectile, index1) => {
                if (projectile.position.y === enemy.position.y && projectile.position.x <= (enemy.position.x + enemy.width) && projectile.position.x >= enemy.position.x) {

                    const enemyCollision = new Image()
                    enemyCollision.src = "../Archivos/src/explosion_enemy.png";
                    enemyCollision.onload = () => {
                        fila.invaders[index].image = enemyCollision
                    }
                    setTimeout(()=>{fila.invaders.splice(index, 1)},500)
                    projectiles.splice(index1, 1)
                    fila.width = fila.invaders[fila.invaders.length - 1].position.x - fila.invaders[0].position.x + 10
                    fila.position.x = fila.invaders[0].position.x
                    score += fila.points;
                    drawScore()

                }
            })
        })
    })
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) {
            projectiles.splice(index, 1)
        } else {
            projectile.update()
        }
    })
    defences.forEach((defence, index) => {
        defence.update()
        projectiles.forEach((projectile, index1) => {
            if (projectile.position.y === defence.position.y && projectile.position.x <= (defence.position.x + defence.width) && projectile.position.x >= defence.position.x) {
                projectiles.splice(index1, 1)
                defence.lives--;
                switch (defence.lives) {
                    case 3:
                        const block1 = new Image()
                        block1.src = "../Archivos/src/bloc_collision_1.png";
                        block1.onload = () => {
                            defence.image = block1
                        }
                        break;
                    case 2:
                        const block2 = new Image()
                        block2.src = "../Archivos/src/bloc_collision_2.png";
                        block2.onload = () => {
                            defence.image = block2
                        }
                        break;
                    case 1:
                        const block3 = new Image()
                        block3.src = "../Archivos/src/bloc_collision_3.png";
                        block3.onload = () => {
                            defence.image = block3
                        }
                        break;
                    case 0:
                        defences.splice(index, 1)
                        break;
                }
            }
        })
        enemyProjectiles.forEach((projectile, index1) => {
            if (projectile.position.y === defence.position.y && projectile.position.x <= (defence.position.x + defence.width) && projectile.position.x >= defence.position.x) {
                enemyProjectiles.splice(index1, 1)
                defence.lives--
                switch (defence.lives) {
                    case 3:
                        const block1 = new Image()
                        block1.src = "../Archivos/src/bloc_collision_1.png";
                        block1.onload = () => {
                            defence.image = block1
                        }
                        break;
                    case 2:
                        const block2 = new Image()
                        block2.src = "../Archivos/src/bloc_collision_2.png";
                        block2.onload = () => {
                            defence.image = block2
                        }
                        break;
                    case 1:
                        const block3 = new Image()
                        block3.src = "../Archivos/src/bloc_collision_3.png";
                        block3.onload = () => {
                            defence.image = block3
                        }
                        break;
                    case 0:
                        defences.splice(index, 1)
                        break;
                }
            }
        })
    })
    enemyProjectiles.forEach((projectile, index) => {
        if (projectile.position.y >= canvas.width) {
            enemyProjectiles.splice(index, 1)
        } else {
            projectile.update()
        }
        if (projectile.position.y == player.position.y && projectile.position.x <= (player.position.x + player.width) && projectile.position.x >= player.position.x) {

            enemyProjectiles.splice(index, 1)
            lives--;
            const elem = document.getElementById("lives");
            if (lives === 2)
                elem.innerHTML = `<h2>LIVES</h2><br><img src = "../Archivos/src/player.png"><br><img src = "../Archivos/src/player.png"><br>`;
            else {
                if (lives === 1)
                    elem.innerHTML = `<h2>LIVES</h2><br><img src = "../Archivos/src/player.png">`;
                else {
                    elem.innerHTML = `<h2>LIVES</h2><br>`;
                    const deadPlayer = new Image()
                    deadPlayer.src = "../Archivos/src/player_collision.png";
                    deadPlayer.onload = () => {
                        player.image = deadPlayer
                    }
                    setTimeout(() => {
                        gameOver = true;
                    }, 1000);
                }
            }

        }
    })
    if (rightPressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 2
    } else if (leftPressed && player.position.x >= 0) {
        player.velocity.x = -2
    } else {
        player.velocity.x = 0
    }

}

function drawScore() {
    console.log("estoy")
    if (score < 100)
        elem.innerHTML = `Score:<br>00${score}`;
    else {
        if (score < 1000)
            elem.innerHTML = `Score:<br>0${score}`;
        else {
            elem.innerHTML = `Score:<br>${score}`;
        }
    }

}

function enemyProjectile() {

    const rowshoot = Math.floor(Math.random() * filas.length);
    const columnShoot = Math.floor(Math.random() * filas[rowshoot].invaders.length);
    enemyProjectiles.push(new Projectile({
        position: {
            x: (filas[rowshoot].invaders[columnShoot].position.x + (filas[rowshoot].invaders[columnShoot].width / 2)),
            y: filas[rowshoot].invaders[columnShoot].position.y
        },
        velocity: 1.5,
        color: "white"
    }))
}


var leftPressed = false;
var rightPressed = false;


animate()
setInterval(() => {
    if (lives > 0) enemyProjectile()
}, 1000);

addEventListener(`keydown`, (event) => {
    switch (event.key) {
        case `ArrowLeft`:
            leftPressed = true;
            break;
        case `ArrowRight`:
            rightPressed = true
            break;
        case ` `:
            break;
    }
})
let throttleTimer;

function playerShoot(time) {
    if (throttleTimer) return;
    throttleTimer = true;
    projectiles.push(new Projectile({ position: { x: (player.position.x + (player.width / 2)), y: player.position.y }, velocity: -1.5, color: "chartreuse" }))
    setTimeout(() => {
        throttleTimer = false;
    }, time);
}

addEventListener(`keyup`, (event) => {
    switch (event.key) {
        case `ArrowLeft`:
            leftPressed = false;
            break;
        case `ArrowRight`:
            rightPressed = false;
            break;
        case ` `:
            if (lives > 0) { playerShoot(1000) }
            break;
    }
})






