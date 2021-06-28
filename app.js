const canvas = document.getElementById('my_canvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 600;

const playerSprite = new Image();
playerSprite.src = "./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Ships.png";
const background = new Image();
background.src = "./Assets/background-black.png"

const player = new Player(playerSprite,ctx,canvas,350,300,8,7,8,0,3,3,4,false);
const mouse = {x:0, y:0};

window.addEventListener("keydown", (event) =>{
    // console.log(event.code);
    player.keys[event.code] = {'active':true,'uncontrollable':false};
});

window.addEventListener("keyup", (event) =>{
    if(!player.keys[event.code]['uncontrollable']){
        delete player.keys[event.code];
    }
});

document.addEventListener("mousemove",(e)=>{
    var bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left;
    mouse.y = e.pageY - bounds.top;
});

document.addEventListener("mousedown", (e)=>{
   player.keys[e.button] = {'active':true,'uncontrollable':false};
});

document.addEventListener("mouseup", (e) =>{
    if(!player.keys[e.button]['uncontrollable']){
        delete player.keys[e.button];
    }
});


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        player.start(mouse);
    }
}

startAnimating(60);