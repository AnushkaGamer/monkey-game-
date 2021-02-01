
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, groundImage;
var obstacle, obstaclesImage;
var Banana, bananaImage;
var BananasGroup,obstaclesGroup;
var survivaltime=0;

function preload(){
  monkey_running =   
    loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstaclesImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addImage("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,400,1400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*survivaltime/100);
 
  survivaltime = 0;
}

function draw() {
  //trex.debug = true;
  background("white");
  text("survivaltime: "+ survivaltime, 500,50);
  
  if (gameState===PLAY){
    survivaltime = survivaltime + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*survivaltime/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    spawnBananas();
    spawnObstacles();
  }
  BananasGroup=createGroup();
  obstaclesGroup=createGroup();
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    BananasGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,385,10,40);
    obstacle.addImage("ob",obstaclesImage);
    obstacle.scale=0.0;
    obstacle.velocityX = -(6 + 3*survivaltime /100);
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}