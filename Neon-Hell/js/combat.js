let bullets=[];
let damageTexts=[];

function spawnBullet(x,y,dx,dy,speed,damage,pierce=false,aoe=0){
    bullets.push({
        x,y,
        vx:dx*speed,
        vy:dy*speed,
        damage,
        pierce,
        aoe
    });
}

function updateCombat(dt){

    players.forEach(p=>{
        if(keys[p.controls.shoot] && p.shootCooldown<=0){
            p.weapon.behavior(p);
            p.shootCooldown=p.weapon.fireRate;
            camera.shake=6;
        }
    });

    bullets.forEach(b=>{
        b.x+=b.vx*dt;
        b.y+=b.vy*dt;
    });

    bullets.forEach(b=>{
        enemies.forEach(e=>{
            if(Math.hypot(b.x-e.x,b.y-e.y)<25){

                e.health-=b.damage;

                if(b.aoe){
                    enemies.forEach(other=>{
                        if(Math.hypot(b.x-other.x,b.y-other.y)<b.aoe){
                            other.health-=b.damage*0.6;
                        }
                    });
                }

                if(!b.pierce) b.dead=true;

                damageTexts.push({x:e.x,y:e.y,val:b.damage,life:1});
                camera.shake=8;
            }
        });
    });

    bullets=bullets.filter(b=>!b.dead);
    enemies=enemies.filter(e=>e.health>0);

    damageTexts.forEach(d=>{
        d.y-=30*dt;
        d.life-=dt;
    });
    damageTexts=damageTexts.filter(d=>d.life>0);
}

function renderCombat(){
    bullets.forEach(b=>{
        if(b.pierce) ctx.fillStyle="#f0f";
        else if(b.aoe) ctx.fillStyle="#ff0";
        else ctx.fillStyle="#0ff";

        ctx.beginPath();
        ctx.arc(b.x,b.y,6,0,Math.PI*2);
        ctx.fill();
    });

    ctx.fillStyle="#fff";
    damageTexts.forEach(d=>{
        ctx.fillText(d.val,d.x,d.y);
    });
}