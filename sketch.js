let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  
  // Definindo as raquetes
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  
  // Definindo a bola
  ball = new Ball();
}

function draw() {
  background(0);
  
  // Desenhando as raquetes
  leftPaddle.show();
  rightPaddle.show();
  
  // Movendo as raquetes
  leftPaddle.update();
  rightPaddle.update();
  
  // Desenhando e movendo a bola
  ball.show();
  ball.update();
  
  // Verificando colisões da bola com as raquetes e os lados esquerdo e direito
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);
  ball.checkWallCollision();
  
  // Atualizando os pontos se a bola ultrapassar os limites esquerdo e direito
  if (ball.isOutOfBounds()) {
    if (ball.x < 0) {
      rightScore++;
      ball.reset();
    } else if (ball.x > width) {
      leftScore++;
      ball.reset();
    }
  }
  
  // Mostrando os pontos
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 60;
    this.y = height / 2 - this.h / 2;
    this.speed = 5;
    if (isLeft) {
      this.x = 20;
      this.upKey = 87; // W
      this.downKey = 83; // S
    } else {
      this.x = width - 30;
      this.upKey = UP_ARROW;
      this.downKey = DOWN_ARROW;
    }
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  
  update() {
    // Movendo as raquetes com as teclas designadas
    if (keyIsDown(this.upKey) && this.y > 0) {
      this.y -= this.speed;
    }
    if (keyIsDown(this.downKey) && this.y < height - this.h) {
      this.y += this.speed;
    }
  }
}

class Ball {
  constructor() {
    this.reset();
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  checkPaddleCollision(paddle) {
    if (this.x - this.radius < paddle.x + paddle.w && 
        this.x + this.radius > paddle.x && 
        this.y - this.radius < paddle.y + paddle.h && 
        this.y + this.radius > paddle.y) {
      this.xSpeed *= -1;
    }
  }
  
  checkWallCollision() {
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.ySpeed *= -1;
    }
  }
  
  isOutOfBounds() {
    return (this.x - this.radius < 0 || this.x + this.radius > width);
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random([-5, 5]);
    this.radius = 10;
  }
}
