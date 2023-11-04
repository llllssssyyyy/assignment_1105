let system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 4, 300));
}

function draw() {
  background(20,0,50);
  system.addParticle();
  system.run();
}

// 간단한 파티클 클래스
let Particle = function(position) {
  this.acceleration = createVector(0.5, -0.3);
  this.velocity = createVector(random(0, 0), random(-1, 2));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// 위치 업데이트를 위한 메소드
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// 화면에 보이기 위한 메소드
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// 파티클이 여전히 쓸만한가요?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
