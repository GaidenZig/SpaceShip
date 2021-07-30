class Animation{
    constructor(name, obj){
        this.name = name;
        this.pantalla = obj.pantalla;
        this.frames = obj.destroyAnim.frames;
        this.src = obj.destroyAnim.src;
        this.position = obj.positionRotated;
        this.frame = {};
        this.width = obj.destroyAnim.width;
        this.height = obj.destroyAnim.height;
        this.scale = {
            w:obj.destroyAnim.scale.w * this.width,
            h:obj.destroyAnim.scale.h * this.height
        };
        this.record = obj.destroyAnim.record;

        obj = undefined;
        this.count = 0;
        this.image = new Image();
        this.image.src = this.src;
        this.erase = false;
    }

    run(){
        if(this.name == 'destroy'){
            this.destroy(this.count);
        }

        this.draw();

        this.count++;

        if(this.count > this.frames){
            this.erase = true;
        }
    }

    destroy(i){
        for (let i = 0; i < this.record.length; i++) {
            const e1 = this.record[i];
            if(this.count >= e1.keyFrame[0] && this.count <= e1.keyFrame[1]){
                // this is for each sprite
                this.frame.x = e1.fx;
                this.frame.y = e1.fy;
            }
        }
    }

    draw(){
        this.pantalla.ctx.drawImage(
            this.image,
            this.frame.x,this.frame.y,
            this.width,this.height,
            this.pantalla.XC(this.position.x),this.pantalla.YC(this.position.y),
            this.scale.w,this.scale.h
        );
    }
}