const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastTime = 0;
let camera = { x:0, y:0, shake:0 };
let waveTimer = 0;
let waveLevel = 1;

function gameLoop(timestamp){
    const dt = (timestamp - lastTime)/1000;
    lastTime = timestamp;

    update(dt);
    render();

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function update(dt){
    updateInput();
    updateEntities(dt);
    updateCombat(dt);
    updateUI(dt);

    waveTimer += dt;
    if(waveTimer > 8){
        waveLevel++;
        spawnWave(waveLevel);
        waveTimer = 0;
    }
}

function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let shakeX = (Math.random()-0.5)*camera.shake;
    let shakeY = (Math.random()-0.5)*camera.shake;

    ctx.save();
    ctx.translate(-camera.x + shakeX, -camera.y + shakeY);

    renderEntities();
    renderCombat();

    ctx.restore();

    renderUI();

    camera.shake *= 0.9;
}