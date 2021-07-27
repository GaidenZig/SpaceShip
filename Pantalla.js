class Pantalla{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.canvas.width = 700; this.canvas.height=600;
        this.ctx = ctx;
        this.center = {'x':canvas.width/2, 'y':canvas.height/2};
        this.XSTEP = (this.MaxX() - this.MinX()) / this.canvas.width;
    }

    // Returns the right boundary of the logical viewport:
    MaxX() {
        return 10;
    }

    // Returns the left boundary of the logical viewport:
    MinX() {
        return -10;
    }

    // Returns the top boundary of the logical viewport:
    MaxY() {
        return this.MaxX() * this.canvas.height / this.canvas.width;
    }

    // Returns the bottom boundary of the logical viewport:
    MinY() {
        return this.MinX() * this.canvas.height / this.canvas.width;
    }

    // Returns the physical x-coordinate of a logical x-coordinate:
    XC(x) {
        return (x - this.MinX()) / (this.MaxX() - this.MinX()) * this.canvas.width;
    }

    // Returns the physical y-coordinate of a logical y-coordinate:
    YC(y) {
        return this.canvas.height - (y - this.MinY()) / (this.MaxY() - this.MinY()) * this.canvas.height;
    }

    // Returns the logical x-coordinate of a physical x-coordinate
    XL(x){
    	return x/this.canvas.width * (this.MaxX() - this.MinX()) + this.MinX();
    }
    
    // Returns the logical y-coordinate of a physical y-coordinate
    YL(y){
    	return y/this.canvas.height * (this.MaxY() - this.MinY()) + this.MinY();
    }
    
}