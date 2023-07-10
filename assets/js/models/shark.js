class Shark {
    
    constructor(ctx, x, y) { 
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 160;
        this.h = 170;
        this.vy = SHARK_SPEED;

        this.sprite = new Image ();
        this.sprite.src = '/assets/img/shark.png';
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

