const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 180,
  y: 500,
  size: 30,
  color: "blue"
};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();
<script>
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
    x: 330,
    y: 230,
    width: 30,
    height: 30,
    speed: 5,
    health: 100
};

// Zombie
const zombie = {
    x: 100,
    y: 100,
    width: 30,
    height: 30,
    speed: 1.5
};

const keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key.toLowerCase()] = false;
});

function update(){

    // Player Movement
    if(keys["w"] || keys["arrowup"]) player.y -= player.speed;
    if(keys["s"] || keys["arrowdown"]) player.y += player.speed;
    if(keys["a"] || keys["arrowleft"]) player.x -= player.speed;
    if(keys["d"] || keys["arrowright"]) player.x += player.speed;

    // Boundaries
    player.x = Math.max(0, Math.min(canvas.width-player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height-player.height, player.y));

    // Zombie follows player
    let dx = player.x - zombie.x;
    let dy = player.y - zombie.y;

    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist > 1){
        zombie.x += dx/dist * zombie.speed;
        zombie.y += dy/dist * zombie.speed;
    }

    // Collision
    if(
        player.x < zombie.x + zombie.width &&
        player.x + player.width > zombie.x &&
        player.y < zombie.y + zombie.height &&
        player.y + player.height > zombie.y
    ){
        player.health -= 0.2;

        if(player.health < 0)
            player.health = 0;
    }
}

function draw(){

    // Ground
    ctx.fillStyle="green";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Health
    ctx.fillStyle="red";
    ctx.fillRect(20,20,200,20);

    ctx.fillStyle="lime";
    ctx.fillRect(20,20,player.health*2,20);

    ctx.strokeStyle="white";
    ctx.strokeRect(20,20,200,20);

    // Player
    ctx.fillStyle="blue";
    ctx.fillRect(player.x,player.y,player.width,player.height);

    // Zombie
    ctx.fillStyle="darkred";
    ctx.fillRect(zombie.x,zombie.y,zombie.width,zombie.height);
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
