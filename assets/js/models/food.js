class Food {
    
    constructor(ctx, x, y, imageSrc) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.vy = FOOD_SPEED;
        this.toBeDeleted = false;

        this.sprite = new Image ();
        this.sprite.src = imageSrc;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            )
        }
    }

    move() {
        this.y += this.vy;
        if(this.y > this.ctx.canvas.height) {
            this.toBeDeleted = true;
        }
    }
}

