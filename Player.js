class Player{
    fireDelay = 0;
    constructor(image,ctx,canvas,posX, posY, width, height, frameX, frameY, scaleW, scaleH,speed, moving=false){
        this.ctx=ctx;
        this.canvas = canvas;
        this.image = image;

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.frameX= frameX;
        this.frameY= frameY;
        this.scaleW = scaleW*width;
        this.scaleH = scaleH*height;

        this.centerX = posX + (this.scaleW/2);
        this.centerY = posY + (this.scaleH/2);
        this.tipX = posX + (this.scaleW/2);
        this.tipY = posY;
        this.speed = speed;
        this.moving = moving;
        this.keys = {};
        this.bullets=[];
    }

    movePlayer(mouse){
        let tempX =this.posX; 
        if(this.keys['ArrowUp'] && this.posY > 1){
            this.posY -= this.speed;
            this.doDiagonals(this.keys['ArrowUp']);
        }
    
        if(this.keys['ArrowDown'] && this.posY < 575){
            this.posY += this.speed;
            this.doDiagonals(this.keys['ArrowDown']);
        }
    
        if(this.keys['ArrowLeft'] && this.posX > 1){
            tempX =this.posX; 
            this.posX -= this.speed;
        }
    
        if(this.keys['ArrowRight'] && this.posX < 675){
            tempX = this.posX; 
            this.posX += this.speed;
        }

        // this.drawRotation(mouse);
        this.setShipPoints();
        this.animateSideMov(tempX,this.posX);
    }

    action(){
        if(this.keys['KeyX'] && this.fireDelay == 0){
            this.fire();
        }

        this.fireDelay +=1;
        this.bullets.forEach((e,index) =>{
            if(!e.delete){
                e.run();
            }else{
                delete this.bullets[index];
            }
        })
        if(this.fireDelay == 5){
            this.fireDelay = 0;
        }
    }
    
    animateSideMov(prev,curr){
        if(prev < curr){
            this.frameX = 16;
        }else if(prev > curr){
            this.frameX = 0;
        }else{
            this.frameX = 8;
        }
    }

    drawRotation(mouse){
        this.ctx.save();
        this.ctx.rotate(Math.atan2(mouse.y - this.centerY, mouse.x - this.centerX));
        this.ctx.drawImage(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH)
        this.ctx.restore();
    }

    doDiagonals(param){
        if(param == 'ArrowLeft' && this.posX > 1){
            this.posX -= this.speed;
        }

        if(param == 'ArrowRight' && this.posX < 675){
            this.posX += this.speed;
        }
    }

    setShipPoints(){
        this.centerX = this.posX + (this.scaleW/2);
        this.centerY = this.posY + (this.scaleH/2);

        this.tipX = this.posX +(this.scaleW/2);
        this.tipY = this.posY;
    }

    fire(){
        let shoot = new Bullet(this, this.ctx,this.canvas, 5);
        this.bullets.push(shoot);
    }
}