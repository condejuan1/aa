const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var bullet
var canvas, angle, tower, ground, cannon;

var bullets = []
var boats = []
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
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle)

}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600)
  Engine.update(engine);
  showBoats()

  rect(ground.position.x, ground.position.y, width * 2, 1);


  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  cannon.show()

  for (var i = 0; i < bullets.length; i++) {
    showBullets(bullets[i], i)
    collisionWithBoat(i)

  }
}
function keyReleased() {
  if (keyCode === 32) {
    bullet.shoot()
  }

}
function keyPressed() {
  if (keyCode === 32) {
    bullet = new CannonBall(cannon.x, cannon.y)
    bullets.push(bullet);
  }

}
function showBullets(bullet, i) {
  if (bullet) {
    bullet.show()
  }
}
function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) { Matter.Body.setVelocity(boats[i].body, { x: -1, y: 0 }) }
      boats[i].show();
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60)
    boats.push(boat)

  }
}
function collisionWithBoat(index) {
  for (let i = 0; i < boats.length; i++) {
    if (bullets[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(bullets[index].body, boats[i].body)
      if (collision.collided) {
        boats[i].remove(i)
        World.remove(world, bullets[index].body)
        delete bullets[index]

      }
    }

  }
}