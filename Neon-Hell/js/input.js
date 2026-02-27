let keys = {};

window.addEventListener("keydown",e=>{
    keys[e.key] = true;

    if(e.key==="c") toggleCoop();
    if(e.key==="1") players[0].weapon = WeaponTypes.ASSAULT;
    if(e.key==="2") players[0].weapon = WeaponTypes.SHOTGUN;
    if(e.key==="3") players[0].weapon = WeaponTypes.RAIL;
    if(e.key==="4") players[0].weapon = WeaponTypes.PULSE;
});

window.addEventListener("keyup",e=>{
    keys[e.key] = false;
});

function updateInput(){}