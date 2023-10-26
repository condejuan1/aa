const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var bullet
var canvas, angle, tower, ground, cannon;

var bullets=[]

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }
//muda pro grau
angleMode(DEGREES)
angle=15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon= new Cannon(180,110,130,100,angle)
  
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  cannon.show()

for(var i=0; i < bullets.length; i++){
showBullets(bullets[i],i)
}
}
function keyReleased(){
 if (keyCode===32){
bullet.shoot()
  }

}
function keyPressed(){
if(keyCode===32){
  bullet=new CannonBall(cannon.x,cannon.y)
  bullets.push(bullet);
}

}
function showBullets(bullet,i){
  if(bullet){
    bullet.show()
  }
}