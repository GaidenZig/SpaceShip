class Enemie{
    constructor(image,ctx,canvas,posX, posY, width, height, frameX, frameY, scaleW, scaleH,speed){
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
        this.bullets=[];
    }
}