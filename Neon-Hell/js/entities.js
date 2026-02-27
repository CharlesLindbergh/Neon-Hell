let players = [];
let enemies = [];

function createPlayer(x,y,controls){
    players.push({
        x,y,
        speed:220,
        health:100,
        maxHealth:100,
        shootCooldown:0,
        controls,
        weapon:WeaponTypes.ASSAULT
    });
}

createPlayer(0,0,{
    up:"w",down:"s",left:"a",right:"d",shoot:" "
});

let coopEnabled=false;

function toggleCoop(){
    coopEnabled=!coopEnabled;
    if(coopEnabled && players.length<2){
        createPlayer(100,0,{
            up:"ArrowUp",down:"ArrowDown",
            left:"ArrowLeft",right:"ArrowRight",
            shoot:"Enter"
        });
    }
}

function updateEntities(dt){
    players.forEach(p=>{
        let dx=0, dy=0;

        if(keys[p.controls.up]) dy--;
        if(keys[p.controls.down]) dy++;
        if(keys[p.controls.left]) dx--;
        if(keys[p.controls.right]) dx++;

        let len=Math.hypot(dx,dy);
        if(len>0){dx/=len; dy/=len;}

        p.x+=dx*p.speed*dt;
        p.y+=dy*p.speed*dt;

        camera.x=p.x-canvas.width/2;
        camera.y=p.y-canvas.height/2;

        p.shootCooldown-=dt;
    });

    enemies.forEach(e=>{
        let target=players[0];
        let dx=target.x-e.x;
        let dy=target.y-e.y;
        let len=Math.hypot(dx,dy);
        dx/=len; dy/=len;
        e.x+=dx*e.speed*dt;
        e.y+=dy*e.speed*dt;
    });
}

function renderEntities(){
    players.forEach(p=>{
        ctx.fillStyle="#0ff";
        ctx.beginPath();
        ctx.arc(p.x,p.y,20,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle="red";
        ctx.fillRect(p.x-25,p.y-35,50,6);
        ctx.fillStyle="lime";
        ctx.fillRect(p.x-25,p.y-35,50*(p.health/p.maxHealth),6);
    });

    ctx.fillStyle="#f33";
    enemies.forEach(e=>{
        ctx.beginPath();
        ctx.arc(e.x,e.y,18,0,Math.PI*2);
        ctx.fill();
    });
}

function spawnWave(level){
    for(let i=0;i<level*5;i++){
        enemies.push({
            x:Math.random()*2000-1000,
            y:Math.random()*2000-1000,
            speed:80+level*5,
            health:30+level*6
        });
    }
}