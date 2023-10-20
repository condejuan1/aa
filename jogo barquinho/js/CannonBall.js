class CannonBall {
    constructor(x, y) {
        var options = {
            isStatic: true
        };
        this.r = 30;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("./assets/cannonball.png");
        World.add(world, this.body);
    }
    shoot() {
        var novoAngulo = cannon.angle - 28
        var velocity = p5.Vector.fromAngle(radians(novoAngulo)); 
        velocity.mult(10); 
        Matter.Body.setStatic(this.body, false);
         Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
    }

    show() {
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();
    }
}