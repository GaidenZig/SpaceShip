class Bullet{
    constructor(trg,ctx,canvas,velocity) {
        this.trigger = trg;
        this.ctx = ctx;
        this.canvas = canvas;
        this.angle=this.trigger.angleToPivot;
        this.velocity = velocity;
        this.speedX = trg.tipX - trg.centerX;
        this.speedY = trg.tipY - trg.centerY;
        this.posX = trg.centerX - trg.width;
        this.posY = trg.centerY - trg.height;
        this.width = 8;
        this.height = 8;
        this.centerX = this.posX - this.width/2;
        this.centerY = this.posY - this.height/2;

        this.frameX= 32;
        this.frameY= 8;
        this.scaleW = 20;
        this.scaleH = 20;
        this.delete = false;

        this.image = new Image();
        this.image.src='./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Projectiles.png';
    }

    draw(){
        if(this.trigger.calcPivot(this.trigger.pivot)){
            this.ctx.save();
            this.ctx.translate(this.posX, this.posY);
            this.ctx.rotate(this.angle);
            this.ctx.translate(-this.posX, -this.posY);
            this.ctx.drawImage(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH);
            this.ctx.restore();
        }
    }

    run(){
        if(this.posX > -20 && this.posX < this.canvas.width + 20){
            this.posX = this.posX + this.velocity.x;
        }else{
            this.delete = true;
        }

        if(this.posY > -20 && this.posY < this.canvas.height + 20){
            this.posY = this.posY + this.velocity.y;
        }else{
            this.delete = true;
        }

        if(!this.delete){
            console.log('¡Disparo!: ',this.posX,',',this.posY);
            this.draw();
        }
    }

}