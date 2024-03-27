class Bullet{
    constructor(trg, pantalla, velocity, range) {
        /** @type {Player | undefined} */
        this.trigger = trg;
        this.pantalla=pantalla;
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
        this.radius = this.width/2;
        this.range = range || 20;
        this.countx=0;
        this.county=0;

        this.frameX= 32;
        this.frameY= 8;
        this.scaleW = 20;
        this.scaleH = 20;
        this.delete = false;

        this.image = new Image();
        this.image.src='./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Projectiles.png';
    }

    updateByPosition(){
        // center
        this.centerX = this.posX - this.width/2;
        this.centerY = this.posY - this.height/2;
    }

    draw(){
        if(this.trigger.calcPivot(this.trigger.pivot)){
            this.pantalla.ctx.save();
            this.pantalla.ctx.translate(this.posX, this.posY);
            this.pantalla.ctx.rotate(this.angle);
            this.pantalla.ctx.translate(-this.posX, -this.posY);
            this.pantalla.ctx.drawImage(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH);
            this.pantalla.ctx.restore();
        }
    }

    run(){
        if((this.posX > -20) && (this.posX < this.pantalla.canvas.width + 20) && (this.countx < this.range)){
            this.posX = this.posX + this.velocity.x;
        }else{
            this.delete = true;
        }

        if((this.posY > -20) && (this.posY < this.pantalla.canvas.height + 20 ) && (this.county < this.range)){
            this.posY = this.posY + this.velocity.y;
        }else{
            this.delete = true;
        }

        if(!this.delete){
            //console.log('¡Disparo!: ',this.posX,',',this.posY);
            this.countx++;
            this.county++;
            this.updateByPosition();
            this.draw();
        }
    }

}