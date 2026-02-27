const WeaponTypes = {

    ASSAULT: {
        name:"Assault Blaster",
        fireRate:0.25,
        damage:10 + getMeta("ASSAULT_damage"),
        speed:600,
        behavior(player){
            spawnBullet(player.x,player.y,1,0,this.speed,this.damage);
        }
    },

    SHOTGUN:{
        name:"Shotgun Nova",
        fireRate:0.8,
        damage:6 + getMeta("SHOTGUN_damage"),
        speed:500,
        pellets:6,
        spread:0.6,
        behavior(player){
            for(let i=0;i<this.pellets;i++){
                let angle = -this.spread/2 + Math.random()*this.spread;
                spawnBullet(player.x,player.y,
                    Math.cos(angle),Math.sin(angle),
                    this.speed,this.damage);
            }
        }
    },

    RAIL:{
        name:"Rail Lance",
        fireRate:1.2,
        damage:40 + getMeta("RAIL_damage"),
        speed:900,
        behavior(player){
            spawnBullet(player.x,player.y,1,0,this.speed,this.damage,true);
        }
    },

    PULSE:{
        name:"Pulse Cannon",
        fireRate:1.5,
        damage:25 + getMeta("PULSE_damage"),
        speed:400,
        aoe:60 + getMeta("PULSE_radius"),
        behavior(player){
            spawnBullet(player.x,player.y,1,0,
                this.speed,this.damage,false,this.aoe);
        }
    }

};

function getMeta(key){
    return parseInt(localStorage.getItem("meta_"+key)||0);
}