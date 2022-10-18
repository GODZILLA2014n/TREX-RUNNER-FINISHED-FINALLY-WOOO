
var trex ,trex_running;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;
var gameOverimg;
var restart;
var restartimg;
var score=0;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collided=loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
gameOverimg=loadImage("gameOver.png");
restartimg=loadImage("restart.png");
jumpSound=loadSound("jump.mp3");
checkpointSound=loadSound("checkpoint.mp3");
dieSound=loadSound("die.mp3");




}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(100,150);
 trex.addAnimation("trex",trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale=0.7;

ground=createSprite(100,180,999,20)
ground.addImage("ground",groundImage);

ground2=createSprite(100,199,999,20)
ground2.visible=false;
obstaclesGroup=new Group ();
cloudGroup=new Group ();

gameOver=createSprite(300,100);
gameOver.addImage(gameOverimg);
gameOver.visible=false;

restart=createSprite(300,90);
restart.addImage(restartimg);
restart.visible=false;

restart.scale=0.5
}

function draw(){
  background("white")
console.log(trex.y);

text ("score "+score,350,50)


if(gameState===PLAY){
  ground.velocityX=-(7+score/100)

score=score+Math.round(frameRate()/60)

if(score>0 && score%100===0){
  checkpointSound.play();
}

  if(keyDown("space") && trex.y>=156){
    trex.velocityY=-12;
  jumpSound.play();
  }

  trex.velocityY+=0.5;

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  createCloud();
  createObstacle();

if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  dieSound.play();
  //trex.velocityY=-10;
  //jumpSound.play();
}




}

else if(gameState===END){
  ground.velocityX=0;
  trex.velocityY=0;
obstaclesGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
cloudGroup.setLifetimeEach(-1);
obstaclesGroup.setLifetimeEach(-1);
trex.changeAnimation("collided",trex_collided);
gameOver.visible=true;
restart.visible=true;

if(mousePressedOver(restart)){
  reset();

}


}










trex.collide(ground2);











  drawSprites();

}

function reset(){
  gameState=PLAY;
obstaclesGroup.destroyEach();
cloudGroup.destroyEach();
gameOver.visible=false;
restart.visible=false;
score=0;
trex.changeAnimation("trex",trex_running);
}
function createCloud(){
if(frameCount %50===0){
cloud=createSprite(600,100);
cloud.velocityX=-5
cloud.addImage(cloudImage);
cloud.y=Math.round(random(10,100));
cloud.depth=trex.depth;
trex.depth+=1;
cloud.lifetime=115;

cloudGroup.add(cloud);


}
}
function createObstacle(){
  if(frameCount %100===0){
    obstacle=createSprite(600,150,10,50)
    obstacle.velocityX=-(5+score/100)
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
break;
case 2:obstacle.addImage(obstacle2);
break;
case 3:obstacle.addImage(obstacle3);
break;
case 4:obstacle.addImage(obstacle4);
break;
case 5:obstacle.addImage(obstacle5);
break;
case 6:obstacle.addImage(obstacle6);
break;
default:break;
    }
    obstacle.scale=0.7
    obstacle.lifetime=115

obstaclesGroup.add(obstacle);



  }
}




