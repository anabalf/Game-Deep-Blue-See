class Heart {
    
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.vy = HEART_SPEED;

        this.sprite = new Image ();
        this.sprite.src = '/assets/img/heart.png';
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
    }
}