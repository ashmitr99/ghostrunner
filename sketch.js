var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  spookySound.loop();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage('ghost', ghostImg);

}

function draw() {
  background(200);
  if(tower.y > 400){
      tower.y = 300
    }
  if (gameState === 'play') {
    if (keyDown('left_arrow')) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown('right_arrow')) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown('space')) {
      ghost.velocityY =  -10;
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY =0 ;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState= 'end';
    }
  ghost.velocityY = ghost.velocityY + 0.8;
  spawnDoors();
  drawSprites();
    }
  if (gameState === 'end') {
    stroke('yellow');
    fill('yellow');
    textSize(30);
    text('Game over', 230, 250);
  }
  }
  

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  
  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;
  door.addImage(doorImg);
  climber.addImage(climberImg);

  door.velocityY = 3;
  climber.velocityY = 3;
  invisibleBlock.velocityY = 3;

  ghost.depth = door.depth;
  ghost.depth += 1;

  door.lifetime = 800;
  invisibleBlock.lifetime = 800;
  climber.lifetime = 800;

  invisibleBlockGroup.add(invisibleBlock);
  climbersGroup.add(climber);
  doorsGroup.add(door);
  invisibleBlock.debug = true;
  }
  
}
