console.log(`
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
3. Реализовано завершение игры при достижении игровой цели +10
4. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
5.Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +0
6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

total 60/60

`)





window.addEventListener('load', function () {
  const canvas = this.document.getElementById('canvas-main');
  const ctx = canvas.getContext('2d');
  const audio = new Audio('./assets/CrabRave.mp3');

  canvas.width = 960;
  canvas.height = 540;

  let enemies = [];
  let globalSpeed = 10;
  let enemyInterval = 500;
  let randomEnemyInterval = Math.random() * enemyInterval + 250;

  function changeEnemyInterval() {
    randomEnemyInterval = Math.random() * enemyInterval + 250;
  }

  let currentScore = 0;
  let bestScore = 0;
  let scoresArray = [];

  const scoreDiv = document.getElementById('score');
  scoreDiv.innerText = currentScore;
  const bestScoreDIV = document.getElementById('best-score');

  let gameOver = true;

  const startBtn = document.getElementById('start-btn');
  const reStartBtn = document.getElementById('restart-btn');
  const muteBtn = document.querySelector('.mute');

  function getLocalStorage() {
    if (localStorage.getItem('lang')) {
      bestScore = localStorage.getItem('bestScore');
      bestScoreDIV.innerText = bestScore;
    }
  }
  getLocalStorage();

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', (e) => {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 128;
      this.height = 128;
      this.x = 0;
      this.y = this.gameHeight - this.height - 108;
      this.playerHeight = this.y;
      this.image = document.getElementById('hero-image');
      this.frameX = 9;
      this.maxFrame = 16;
      this.frameY = 0;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 0;
      this.vy = 0;
      this.gravity = 1;
    }
    draw(context) {
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime, enemies) {
      //collision
      enemies.forEach((enemy) => {
        // collision modify
        if (this.x + 25 < enemy.x + 40 + enemy.width / 2.8 && this.x + 25 + this.width / 3 > enemy.x + 40 && this.y + 60 < enemy.y + 50 + enemy.height - 25 && this.y + this.height / 1.8 > enemy.y + 50) {
          gameOver = true;
          reStartBtn.style.display = 'block';
          if (currentScore > bestScore) {
            bestScore = currentScore;
            localStorage.setItem('bestScore', bestScore);
            bestScoreDIV.innerText = bestScore;
          }
          changeScoresArrayValues();
        }
      });
      //anim
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 9;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //controls
      if (input.keys.indexOf('ArrowUp') > -1 && this.groundCheck()) {
        this.vy = -20;
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf('ArrowRight') > -1) {
        this.speed = 5;
      } else {
        this.speed = 0;
      }

      //horizontal move
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;

      //vertical move
      this.y += this.vy;
      if (!this.groundCheck()) {
        this.vy += this.gravity;
        this.frameX = 18;
      } else {
        this.vy = 0;
        // this.frameX = 0;
      }

      if (this.y > this.gameHeight - this.height) this.y = this.playerHeight;
    }

    groundCheck() {
      return this.y >= this.playerHeight;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('bg-image');
      this.parallax1 = document.getElementById('bg-image-parralax-1');
      this.parallax1X = 0;
      this.parallax2 = document.getElementById('bg-image-parralax-2');
      this.parallax2X = 0;
      this.parallax3 = document.getElementById('bg-image-parralax-3');
      this.parallax3X = 0;
      this.x = 0;
      this.y = 0;
      this.width = 1920;
      this.height = 540;
      this.speed = globalSpeed;
    }
    draw(context) {
      context.drawImage(this.parallax3, this.parallax3X, this.y, this.width, this.height);
      context.drawImage(this.parallax3, this.parallax3X + this.width, this.y, this.width, this.height);

      context.drawImage(this.parallax2, this.parallax2X, this.y, this.width, this.height);
      context.drawImage(this.parallax2, this.parallax2X + this.width, this.y, this.width, this.height);

      context.drawImage(this.parallax1, this.parallax1X, this.y, this.width, this.height);
      context.drawImage(this.parallax1, this.parallax1X + this.width, this.y, this.width, this.height);

      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    update() {
      this.x -= globalSpeed;
      this.parallax1X -= globalSpeed / 4;
      this.parallax2X -= globalSpeed / 8;
      this.parallax3X -= globalSpeed / 16;

      if (this.x < 0 - this.width) this.x = 0;
      if (this.parallax1X < 0 - this.width) this.parallax1X = 0;
      if (this.parallax2X < 0 - this.width) this.parallax2X = 0;
      if (this.parallax3X < 0 - this.width) this.parallax3X = 0;
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 128;
      this.height = 128;
      this.image = document.getElementById('enemy-image');
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height - 108;
      this.frameX = 0;
      this.maxFrame = 7;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = globalSpeed;
      this.enemyDelete = false;
    }
    draw(context) {
      context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.enemyDelete = true;
        currentScore++;
        increaseDifficulty();
        scoreDiv.innerText = currentScore;
      }
    }
  }

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));

      enemyTimer = 0;
      changeEnemyInterval();
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
    enemies = enemies.filter((enemy) => !enemy.enemyDelete);
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime, enemies);
    handleEnemies(deltaTime);

    if (!gameOver) requestAnimationFrame(animate);
  }

  function clearCVS() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function increaseDifficulty() {
    if (enemyInterval > 100) {
      enemyInterval -= 20;
      globalSpeed = globalSpeed + 0.2;
    } else {
      globalSpeed = globalSpeed + 0.2;
    }
  }
  function changeScoresArrayValues() {
    if (scoresArray.length < 2) {
      scoresArray.push(currentScore);
      console.log(scoresArray);
    } else {
      scoresArray.pop();
      scoresArray.push(currentScore);
      console.log(scoresArray);
    }
  }

  startBtn.addEventListener('click', () => {
    clearCVS();
    if (gameOver) {
      gameOver = false;
      animate(0);
      startBtn.style.display = 'none';

      audio.play();
      window.setTimeout(function () {
        audio.volume = 0.1;
        audio.loop = true;
      }, 0);
    }
  });

  reStartBtn.addEventListener('click', () => {
    clearCVS();
    if (gameOver && enemies.length > 0) {
      gameOver = false;
      player.x = 0;
      enemies = [];

      animate(0);
      bestScoreDIV.innerText = bestScore;

      currentScore = 0;
      globalSpeed = 10;
      enemyInterval = 500;
      scoreDiv.innerText = 0;
      reStartBtn.style.display = 'none';
    }
  });

  muteBtn.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      muteBtn.innerText = 'mute';
    } else {
      audio.muted = true;
      muteBtn.innerText = 'unmute';
    }
  });
});
