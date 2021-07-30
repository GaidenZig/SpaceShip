class Enemy{
    constructor(pantalla,player,radius, width, height, frame, scale,speed,velocity,angle){
        this.pantalla=pantalla;
        this.image = new Image();
        this.image.src = "./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Ships.png";
        this.player = player;

        this.position = {'x':this.pantalla.MinX(), 'y': 0};
        this.positionRotated = {'x':0,'y':0};
        this.width = width;
        this.height = height;
        this.frame = frame;
        this.scale = {
            w:scale.w*width,
            h:scale.h*height
        };
        this.center = {
            x:this.position.x + (this.scale.w / 2),
            y:this.position.y + (this.scale.h / 2)
        };
        this.pivot={'x':this.center.x,'y':this.position.y};
        this.radius = radius;

        this.speed = speed;
        this.bullets=[];
        this.shooted=false;

        this.destroyAnim={
            frames:60,
            width:8,
            height:8,
            scale:{
                w:5,
                h:5
            },
            src:'./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Miscellaneous.png',
            record:[{
                fx:72,
                fy:48,
                keyFrame:[15,15]
            },
            {
                fx:80,
                fy:48,
                keyFrame:[30,30]
            },
            {
                fx:88,
                fy:48,
                keyFrame:[45,45]
            },
            {
                fx:96,
                fy:48,
                keyFrame:[60,60]
            }]
        };

        // f(x) = 0.35(x)^2
        this.functionCenter = {'x':0,'y':0};
        this.angle = angle || undefined;
    }

    updateByMov(){
        //center
        this.center = {
            x:this.pantalla.XC(this.positionRotated.x) + (this.scale.w / 2),
            y:this.pantalla.YC(this.positionRotated.y) + (this.scale.h / 2)
        };

        //pivot
        this.pivot={'x':this.center.x,'y':this.position.y};
    }

    run(){
        // running the movement function.
        this.position.y = this.f(this.position.x);
        if(this.angle != undefined){
            let rot = this.rotate(
                this.functionCenter.x,
                this.functionCenter.y,
                this.position.x,
                this.position.y,
                this.angle
            )

            this.positionRotated.x = rot[0];
            this.positionRotated.y = rot[1];
        }
        this.position.x += this.pantalla.XSTEP*this.speed;

        // updating position and pivot
        this.updateByMov();

        // check remove condition
        if(this.outScreen()) return true;
        return this.collide();
    }

    collide(){
        for (let i = 0; i < this.player.bullets.length; i++) {
            const bullet = this.player.bullets[i];
            if(bullet !== undefined){
                const dist= Math.hypot(
                    bullet.centerX - this.center.x, 
                    bullet.centerY - this.center.y
                );

                if(dist - this.radius - bullet.radius < 1){
                    this.player.bullets.splice(i,1);
                    this.shooted=true;
                    return true;
                }
            }
        }

        return false;
    }

    /**
     *f(x) function to produce this.position.y 
     * @param {number} x x position of the enemy
     */
    f(x){
        let y = 0.35*Math.pow(x, 2)
        return y;
    }
    
    rotate(cx, cy, x, y, angle) {
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    outScreen(){
        if((this.position.x >= this.pantalla.MinX()) && (this.position.x <= this.pantalla.MaxX()))
        {
            this.draw();
            return false;
        }
        return true;
    }

    draw(){
        this.pantalla.ctx.drawImage(
            this.image,
            this.frame.x,this.frame.y,
            this.width,this.height,
            this.pantalla.XC(this.positionRotated.x),this.pantalla.YC(this.positionRotated.y),
            this.scale.w,this.scale.h
        );
    }

}