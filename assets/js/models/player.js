class Player {

    constructor (ctx, x, y) { 
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 140;
        this.h = 120;

        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/fish.png";
        this.sprite.verticalFrames = 3;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(
                this.sprite.width / this.sprite.horizontalFrames
            );
            this.sprite.frameHeight = Math.floor(
                this.sprite.height / this.sprite.verticalFrames
            );
        };

        this.animationTick = 0;

    }

    onKeyDown(event){
        switch (event.keyCode) {
            case KEY_LEFT:
                this.vx = -PLAYER_SPEED;
                break;
            case KEY_RIGHT:
                this.vx = PLAYER_SPEED;
                break;
        }
    }

    onKeyUp(event){
        switch (event.keyCode) {
            case KEY_LEFT:
            case KEY_RIGHT:
                this.vx = 0;
                break;
        }
    }

    move() {
        this.x += this.vx;

        if(this.x + this.w > this.ctx.canvas.width) {
            this.x = this. ctx.canvas.width - this.w;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            );

            this.animate();
        }
         
    }

    animate() {
        this.animationTick++;
        if (this.animationTick > PLAYER_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex++;

            if(this.sprite.verticalFrameIndex > this.sprite.verticalFrames -1) {
                this.sprite.verticalFrameIndex = 0;
            }
        }
    }

    colideWith(element) {
        return (
            this.x + this.w > element.x && 
            this.x < element.x + element.w &&
            this.y + this.h > element.y &&
            this.y < element.y + element.h
        )
    }
}