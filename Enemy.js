class Enemy{
    constructor(pantalla,player,radius, width, height, frame, scale,speed,velocity){
        this.pantalla=pantalla;
        this.image = new Image();
        this.image.src = "./Assets/SpaceShooterAssets/SpaceShooterAssetPack_Ships.png";
        this.player = player;

        this.position = {'x':this.pantalla.MinX(), 'y': 0};
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
        this.velocity=velocity,

        this.speed = speed;
        this.bullets=[];
        // this.cuadraFunc={a:null, b:null, c:null} // f(x)=a(x-c)^2 +b
        // this.quadraticFunc();
    }

    updateByMov(){
        //center
        this.center = {
            x:this.pantalla.XC(this.position.x) + (this.scale.w / 2),
            y:this.pantalla.YC(this.position.y) + (this.scale.h / 2)
        };

        //pivot
        this.pivot={'x':this.center.x,'y':this.position.y};
    }

    run(){
        // running the movement function.
        this.position.y = this.f(this.position.x);
        this.position.x += this.pantalla.XSTEP;

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
                    return true;
                }
            }
        }

        return false;
    }

    // quadraticFunc(){
    //     let inRange = false;
    //     let vertexRadius=20;
    //     let randomXMax= this.pantalla.center.x + vertexRadius;
    //     let randomXMin= this.pantalla.center.x - vertexRadius
    //     let randomYMax= this.pantalla.center.y + vertexRadius;
    //     let randomYMin= this.pantalla.center.y - vertexRadius
    //     let x = Math.random()*(randomXMax - randomXMin) + randomXMin;
    //     let y = Math.random()*(randomYMax - randomYMin) + randomYMin;

    //     do {
    //         const catA = x - this.pantalla.center.x;
    //         const catB = y - this.pantalla.center.y;
    //         const hypothenuse= Math.sqrt(catA*catA + catB*catB);
    //         if(hypothenuse <= this.radius){
    //             inRange = true;
    //         }
    //     } while (!inRange);
        
    //     this.cuadraFunc.b = y;
    //     this.cuadraFunc.c = x;
    //     this.cuadraFunc.a = 15;
    // }

    /**
     *f(x) function to produce this.position.y 
     * @param {number} x x position of the enemy
     */
    f(x){
        // this.position.y = this.cuadraFunc.a * (Math.pow((x - this.cuadraFunc.c),2)) + this.cuadraFunc.b;
        return Math.pow(x, 2);
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
            this.pantalla.XC(this.position.x),this.pantalla.YC(this.position.y),
            this.scale.w,this.scale.h
        );
    }

}