class Background2 {

    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.vy = BACKGROUND_SPEED;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/background3.png';
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    /*move() {
        this.y += this.vy;

        if(this.y > this.h) { 
            this.y = 0;
        }
    }
    */

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );

            /*this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y - this.h,
                this.w,
                this.h
            );
            */
           
        }
    }
}