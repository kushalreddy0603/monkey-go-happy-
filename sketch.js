var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,ground,invisibleground,groundImage,gameOverImage,restartImage
var foodGroup, obstacleGroup
var score=0
var survivalscore=0
var survivaltime
var gameOver
var restart
var reset
function preload(){
  
     
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png")
}



function setup() {
  
createCanvas(600,550);
  
  ground=createSprite(400,350,900,10);
  ground.shapeColor="green"
  ground.VelocityX=-4
  ground.x = ground.width/2;
  
  monkey=createSprite(30,350,30,30);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.15
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,160);
  restart.addImage(restartImage);
  
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
  
  gameOver.visible= false;
  restart.visible = false;
  //create food group and banana group
  obstacleGroup=createGroup()
  foodGroup=createGroup()
  
}

function draw() {
  //monke.debug = true;
background("pink")
  if(gameState===PLAY){
 if (ground.x < 0){
    ground.x = ground.width/2;
 } 
//jump when the space key is pressed
   if(keyDown("space")&& monkey.y >= 200) {
      monkey.velocityY = -12;
   }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
   if(frameCount%10===0){
   survivaltime=survivaltime+1;
 }
  }
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+1;
  }
    spawnbanana();
    spawnObstacles()
    
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  
  }
  
  
   //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  drawSprites();

 text("Survival Time: "+ survivaltime, 60,50);
  textSize(19)
  fill("black")
  text("Score: "+ score, 300,50);
  textSize(19)
  fill("black")
}

function spawnbanana(){
  if(frameCount%80===0){
    banana = createSprite(600,250,10,10);
    banana.y = Math.round(random(70,150));
    banana.velocityX=-6;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    foodGroup.add(banana);
    
    
  }
  }
  function spawnObstacles(){
  if(frameCount%80===0){
    obstacle = createSprite(500,320,10,10);
    obstacle.velocityX=-6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
    
    
  }
  }
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
 score=0
}


































































































