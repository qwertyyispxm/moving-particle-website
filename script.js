const canvas = document.getElementById("canvas");
const art = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const pointer = {
  x: undefined,
  y: undefined,
};

// Mouse events
canvas.addEventListener("click", function (event) {
  pointer.x = event.x;
  pointer.y = event.y;
  for (let i = 0; i < 30; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  pointer.x = event.x;
  pointer.y = event.y;
  for (let i = 0; i < 15; i++) {
    particleArray.push(new Particle());
  }
});

// Touch events for mobile
canvas.addEventListener("touchstart", function (event) {
  const touch = event.touches[0];
  pointer.x = touch.clientX;
  pointer.y = touch.clientY;
  for (let i = 0; i < 30; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("touchmove", function (event) {
  const touch = event.touches[0];
  pointer.x = touch.clientX;
  pointer.y = touch.clientY;
  for (let i = 0; i < 15; i++) {
    particleArray.push(new Particle());
  }
});

/*function drawCircle() {
  art.fillStyle = "red";
  art.beginPath();
  art.arc(pointer.x, pointer.y, 200, 0, Math.PI * 2);
  art.fill();
}*/

class Particle {
  constructor() {
    this.x = pointer.x;
    this.y = pointer.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ",100%,65%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.01) this.size -= 0.05;
  }
  draw() {
    art.fillStyle = this.color;
    art.beginPath();
    art.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    art.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  art.fillStyle = "rgb(0,0,0,0.1)";
  art.fillRect(0, 0, canvas.width, canvas.height);
  hue += 5;
  handleParticle();
  requestAnimationFrame(animate);
}
animate();
