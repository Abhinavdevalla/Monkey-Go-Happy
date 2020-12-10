var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground, invisibleGround;
var survivalTime = 0;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  

  
}



function setup() {
  createCanvas(600, 600);


  foodGroup = createGroup();
  obstacleGroup = createGroup();

  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  

  invisibleGround = createSprite(250, 407, 1000, 10);
  invisibleGround.x = ground.width / 2;

}


function draw() {
  background("white");

  if (gameState === PLAY) {

    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }
    invisibleGround.velocityX = -5;

    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -20;
    }
    
    score = Math.round(frameCount / 3);
     ground.velocityX = -(5 + 2 * score / 100);
    
    if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
  }
   
   food();
   Obstacle();


    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }

} 
  else if (gameState === END) {
    ground.velocityX = 0;
    invisibleGround.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
   
    
    

  }


  //gravity
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(invisibleGround);

  stroke("black");
  textSize(20);
  fill("black");
  text("score:" + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("survival Time:" + survivalTime, 100, 50);





  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function Obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200)
  }

}