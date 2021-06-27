class Bullet{
    constructor(trg,ctx,canvas,speed) {
        this.trigger = trg;
        this.ctx = ctx;
        this.canvas = canvas;
        this.speedX = trg.tipX - trg.centerX ;
        this.speedY = trg.tipY - trg.centerY ;
        this.posX = trg.tipX;
        this.posY = trg.tipY;
        this.width = 7;
        this.height = 8;
        this.frameX= 32;
        this.frameY= 8;
        this.scaleW = 50;
        this.scaleH = 50;
        this.delete = false;

        this.image = new Image();
        this.image.src='./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Projectiles.png';
    }

    draw(){
        this.ctx.drawImage(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH);
    }

    run(){
        if(this.posX > 0 && this.posX < this.canvas.width){
            this.posX = this.posX + this.speedX;
        }else{
            this.delete = true;
        }

        if(this.posY > 0 && this.posY < this.canvas.height){
            this.posY = this.posY + this.speedY;
        }else{
            this.delete = true;
        }

        if(!this.delete){
            console.log('¡Disparo!: ',this.posX,',',this.posY);
            this.draw();
        }
    }

}