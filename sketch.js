
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80,315,20,20); 
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(480,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
background(225);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival time:"+survivalTime,100,50);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
      monkey.velocityY = 0;
    
    obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
    
    obstacleGroup.setLifetimeEach(0);
    FoodGroup.setLifetimeEach(0);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
  }
  
  monkey.collide(ground);
  
  
  food();
  obstacle();
  drawSprites();
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(330,220,20,20);
    var rand =Math.round(random(200,120));
    banana.addImage("bananaImage",bananaImage);
    banana.velocityX=-6;
    
    banana.lifetime=400;
    banana.scale=0.1;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
  
}

function obstacle(){
 if(frameCount%300===0){
   var obstacle = createSprite(390,310,20,20);
   var rand = Math.round(random(120,200));
   obstacle.addImage("obstacleImage",obstacleImage);
   obstacle.velocityX=-7;
   
   obstacle.lifetime=200;
   obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
 } 
  
}



