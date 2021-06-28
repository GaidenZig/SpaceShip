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
        this.angleToPivot = null;
        this.pivot = {'x':this.centerX, 'y': this.centerY};
        this.speed = speed;
        this.moving = moving;
        this.keys = {};
        this.bullets=[];
    }

    start(mouse){
        let inRange = this.calcPivot(mouse);
        this.movePlayer();

        if(inRange){
            this.ctx.save();
            this.drawRotation();
            this.drawSprite(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH)
            this.ctx.restore();
        }else{
            this.drawSprite(this.image, this.frameX, this.frameY, this.width, this.height, this.posX, this.posY, this.scaleW, this.scaleH)
        }
        this.action();
    }

    calcPivot(mouse){
        let inRange = false;
        let xLine = false;
        let yLine = false;
        if(mouse.x <= this.canvas.width && mouse.x >= 0){
            this.pivot.x = mouse.x;
            xLine = true;
        }

        if(mouse.y <= this.canvas.height && mouse.y >= 0){
           this.pivot.y = mouse.y; 
           yLine = true;
        }
        
        if(xLine && yLine){
            inRange = true;
        }

        return inRange;
    }

    movePlayer(){
        if(this.keys['KeyW'] && this.posY > 1){
            this.posY -= this.speed;
        }
    
        if(this.keys['KeyS'] && this.posY < 575){
            this.posY += this.speed;
        }
    
        if(this.keys['KeyA'] && this.posX > 1){
            this.posX -= this.speed;
        }
    
        if(this.keys['KeyD'] && this.posX < 675){
            this.posX += this.speed;
        }

        this.updateCenter();
    }

    action(){
        if(this.keys[0] && this.fireDelay == 0){
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

        if(this.fireDelay == 7){
            this.fireDelay = 0;
        }
    }
    
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
        this.ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    drawRotation(){
        this.ctx.translate(this.centerX,this.centerY);
        this.angleToPivot = Math.atan2(this.pivot.y - this.centerY, this.pivot.x - this.centerX) + Math.PI/2;
        console.log(this.angleToPivot);
        this.ctx.rotate(this.angleToPivot);
        this.ctx.translate(-this.centerX, -this.centerY);
    }

    updateCenter(){
        this.centerX = this.posX + (this.scaleW/2);
        this.centerY = this.posY + (this.scaleH/2); 
    }

    fire(){
        const velocity ={
            x:Math.cos(this.angleToPivot - Math.PI/2) * 10,
            y:Math.sin(this.angleToPivot - Math.PI/2) * 10
        }
        // console.log(velocity);
        let shoot = new Bullet(this, this.ctx,this.canvas,velocity);
        this.bullets.push(shoot);
    }
}