class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.drawIntervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.background2= new Background2(this.ctx);
        this.score = 0;
        this.totalLifes = 3;
        this.player = new Player(this.ctx, 250, 600);
        this.enemies = [];
        this.sharks = [];
        this.foods = [];
        this.hearts = [];

        this.collisionImage = new Image();
        this.collisionImage.src = '/assets/img/crash.png';

        this.gameAudio = new Audio("/assets/audio/game.mp3");
        this.pointAudio = new Audio("/assets/audio/eatingfish.mp3");
        this.extraLifeAudio = new Audio("/assets/audio/extralife.mp3");
        this.quitLifeAudio = new Audio("/assets/audio/oof.mp3");
        this.gameOverAudio = new Audio("/assets/audio/gameover.mp3");
        this.audio.volume = 0.05;
        
    
        this.tick = 0;
        this.tick2 = 0;
        this.tick3 = 0;
        this.tick4 = 0;
    }

    onKeyDown(event) {
        this.player.onKeyDown(event);
    }

    onKeyUp(event) {
        this.player.onKeyUp(event);
    }

    start() {
        if(!this.drawIntervalId) {
            this.gameAudio.play();
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.addEnemy();
                this.addShark();
                this.addFood();
                this.addHeart();
                this.checkCollisions();
            }, 1000 / this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.gameAudio.pause();
        this.drawIntervalId = undefined;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getRandomEnemyTick() {
        return Math.round(Math.random() * 531) + 200;
    } 

    addEnemy() {
        this.tick++;

        if (this.tick > this.getRandomEnemyTick()) { 
            this.tick = 0;
            const x = Math.max(0, Math.floor(Math.random() * this.ctx.canvas.width - 90));
            const y = -200;
            this.enemies.push(new Enemy(this.ctx, x, y));
        }
    }
    
    addShark() {
        this.tick4++;

        if (this.tick4 > this.getRandomEnemyTick()) {
            this.tick4 = 0 ;
            const x = Math.max(0, Math.floor(Math.random() * this.ctx.canvas.width - 120));
            const y = -200;
            this.sharks.push(new Shark(this.ctx, x, y));
        }
    }

    addFood() {
        this.tick2++; 

        if (this.tick2 > 300) {
            this.tick2 = 0;
            const x = Math.max(0, Math.floor(Math.random() * this.ctx.canvas.width - 30));
            const y = -200;

            const imageSrc = this.getRandomImageSrc();
            this.foods.push(new Food(this.ctx, x, y, imageSrc));
        }
    }

    getRandomImageSrc(){
        const imageSrcs = [
            '/assets/img/pez.png',
            '/assets/img/pez-de-colores.png',
            '/assets/img/pez-payaso.png',
        ];
        const randomIndex = Math.floor(Math.random() * imageSrcs.length);
        return imageSrcs[randomIndex];
    }

    addHeart() {
        this.tick3++;
    
        if (this.tick3 > 350) {
            this.tick3 = 0;
            const x = Math.max(0, Math.floor(Math.random() * this.ctx.canvas.width - 30));
            const y = -200;
            this.hearts.push(new Heart(this.ctx, x, y));
        }
    }

    checkCollisions() {
        const enemy = this.enemyAttacked();
        const shark  = this.sharkAttacked(); 
        const food = this.foodEaten();
        const heart = this.heartObtained();

        if(enemy) {
            this.removeLife();
            this.quitLifeAudio.play();
            if(this.totalLifes <= 0) { 
                this.gameOver();
            };

            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            
        }
        if(shark) {
            this.removeLife();
            this.quitLifeAudio.play();
            if(this.totalLifes <= 0) { 
                this.gameOver();
            };

            this.applyCollisionEffect(this.player, shark);

            this.sharks.splice(this.sharks.indexOf(shark), 1);
            
        }
        if(food) {
            this.increaseScore();
            this.pointAudio.play();
            this.foods.splice(this.foods.indexOf(food), 1);
        }
        if(heart) {
            this.giveExtraLife();
            this.extraLifeAudio.play();
            this.hearts.splice(this.hearts.indexOf(heart), 1);
            this.ctx.fillText(
                "Extra Life!",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
        }
     }

    enemyAttacked() { 
        return this.enemies.find(enemy => this.player.colideWith(enemy));
     }
    sharkAttacked() { 
        return this.sharks.find(shark => this.player.colideWith(shark));
    }
    
    foodEaten() {
        return this.foods.find(food => this.player.colideWith(food));
     }

    heartObtained() {
        return this.hearts.find(heart => this.player.colideWith(heart));
     }

    applyCollisionEffect(player, shark) {
        const collisionX = (player.x + shark.x) / 2; 
        const collisionY = (player.y + shark.y) / 2; 

        const collisionImageX = collisionX - this.collisionImage.width / 2;
        const collisionImageY = collisionY - this.collisionImage.height / 2;
      
        this.ctx.drawImage(
          this.collisionImage,
          collisionImageX,
          collisionImageY,
          this.collisionImage.width,
          this.collisionImage.height
        );
    }

    gameOver() {
        this.stop();
        this.gameOverAudio.play();
  
        gameOverPanel.style.display = "block"; 
        canvas.style.display = "none"; 

        const scoreElement = document.getElementById("score");
        scoreElement.textContent = this.score;
        
     }

     resetGame() {
        this.score = 0;
        this.totalLifes = 3;
     }
    
    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((enemy) => enemy.move());
        this.sharks.forEach((shark) => shark.move());
        this.foods.forEach((food) => food.move());
        this.hearts.forEach((heart) => heart.move());
    }

    draw() {
        this.background.draw();
        this.background2.draw();
        this.ctx.font = 'bold 24px Arial'; 
        
        const fishImage = new Image();
        fishImage.src = '/assets/img/pez.png'; 
        this.ctx.drawImage(fishImage, fishX, fishY, fishWidth, fishHeight);
        this.ctx.fillStyle = 'orange';
        this.ctx.fillText('Score: ' + this.score, fishX + fishWidth + 10, fishY + fishHeight);

        const heartImage = new Image();
        heartImage.src = '/assets/img/heart.png'; 
        this.ctx.drawImage(heartImage, heartX, heartY, heartWidth, heartHeight);
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('Lives: ' + this.totalLifes, heartX + heartWidth + 8, heartHeight);
       
        this.player.draw();
        this.enemies.forEach((enemy) => enemy.draw());
        this.sharks.forEach((shark) => shark.draw());
        this.foods.forEach((food) => food.draw());
        this.hearts.forEach((heart) => heart.draw());
        
    }

    increaseScore() {
        this.score +=10;
    }

    giveExtraLife() {
        this.totalLifes +=1;
    }

    removeLife() {
        this.totalLifes -=1;
    }

}