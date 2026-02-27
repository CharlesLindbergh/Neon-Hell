let metaPoints=parseInt(localStorage.getItem("metaPoints")||0);

function updateUI(dt){
    players.forEach(p=>{
        if(p.health<=0){
            metaPoints+=waveLevel*5;
            localStorage.setItem("metaPoints",metaPoints);
            showUpgradeMenu();
        }
    });
}

function showUpgradeMenu(){
    let choice=prompt(
`Upgrade:
1 Assault +
2 Shotgun +
3 Rail +
4 Pulse Radius +`);

    if(choice=="1") addMeta("ASSAULT_damage",3);
    if(choice=="2") addMeta("SHOTGUN_damage",2);
    if(choice=="3") addMeta("RAIL_damage",10);
    if(choice=="4") addMeta("PULSE_radius",15);

    location.reload();
}

function addMeta(key,value){
    let current=parseInt(localStorage.getItem("meta_"+key)||0);
    localStorage.setItem("meta_"+key,current+value);
}

function renderUI(){
    ctx.fillStyle="white";
    ctx.fillText("Wave: "+waveLevel,20,30);
    ctx.fillText("Meta Points: "+metaPoints,20,50);
    ctx.fillText("Press C for Co-op",20,70);
    ctx.fillText("1-4 Switch Weapons",20,90);
}