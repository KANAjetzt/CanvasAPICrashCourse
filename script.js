const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = 200;
// canvas.height = 200;

// // fillRect()
// ctx.fillStyle = "orangered";
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillStyle = "#e3e3";
// ctx.fillRect(200, 20, 150, 100);

// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = "green";
// ctx.strokeRect(100, 200, 150, 100);

// // cleaRect()
// ctx.clearRect(25, 25, 140, 90);

// // fillText()
// ctx.font = "30px Arial";
// ctx.fillStyle = "purple";
// ctx.fillText("Hello World", 400, 50);

// // strokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = "orange";
// ctx.strokeText("Hello World", 400, 100);

// Paths

// // Triangle
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 50);
// // ctx.closePath();
// // ctx.stroke();
// ctx.fillStyle = "coral";
// ctx.fill();

// ctx.beginPath();
// ctx.moveTo(200, 50);
// ctx.lineTo(150, 200);
// ctx.lineTo(250, 200);
// ctx.closePath();
// ctx.stroke();

// // Rectangle
// ctx.beginPath();
// ctx.rect(300, 50, 150, 100);
// ctx.fillStyle = "teal";
// ctx.fill();

// // Arc (circles)
// ctx.beginPath();

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// // Draw head
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// // Move to mouth
// ctx.moveTo(centerX + 100, centerY);

// // Draw mouth
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

// // Move left eye
// ctx.moveTo(centerX - 60, centerY - 80);

// // Draw left eye
// ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);

// // Move to right eye
// ctx.moveTo(centerX + 100, centerY - 80);

// // Draw right eye
// ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

// ctx.stroke();

// Animation 1

// const circle = {
//   x: 200,
//   y: 200,
//   size: 30,
//   dx: 5,
//   dy: 4
// };

// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//   ctx.fillStyle = "purple";
//   ctx.fill();
// }

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawCircle();

//   // change position
//   circle.x += circle.dx;
//   circle.y += circle.dy;

//   // Detect side walls
//   if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
//     circle.dx *= -1; // circle.dx = circle.dx * -1
//   }

//   // Detect top and bottom walls
//   if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
//     circle.dy *= -1; // circle.dx = circle.dx * -1
//   }

//   requestAnimationFrame(update);
// }

// update();

// Animation 2 - Character

const image = document.getElementById("source");

const player = {
  w: 50,
  h: 70,
  x: 20,
  y: 200,
  speed: 10,
  dx: 0,
  dy: 0
};

const keyController = {
  keyCodes: {
    up: 38,
    right: 39,
    down: 40,
    left: 37,
    w: 87,
    a: 65,
    s: 83,
    d: 68
  },
  up: false,
  right: false,
  down: false,
  left: false,
  w: false,
  a: false,
  s: false,
  d: false
};

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  player.x += player.dx;
  player.y += player.dy;
  detectWalls();
}

function detectWalls() {
  // Left wall
  if (player.x < 0) {
    player.x = 0;
  }

  // Right wall
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  // Top wall
  if (player.y < 0) {
    player.y = 0;
  }

  // Bottom wall
  if (player.y + player.h > canvas.height) {
    player.y = canvas.width - player.h;
  }
}

function moveUp() {
  console.log(player);
  player.dy = -player.speed;
}
function moveDown() {
  console.log(player);
  player.dy = player.speed;
}
function moveRight() {
  console.log(player);
  player.dx = player.speed;
}
function moveLeft() {
  console.log(player);
  player.dx = -player.speed;
}

const keyDownHandler = e => {
  const keyCodes = Object.values(keyController.keyCodes);
  const keyEntries = Object.entries(keyController.keyCodes);

  if (keyCodes.includes(e.keyCode)) {
    const pressedEntrie = keyEntries.filter(entrie =>
      entrie.includes(e.keyCode)
    );
    keyController[pressedEntrie[0][0]] = true;
  }
};

function keyUp(e) {
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

function update() {
  clear();

  drawPlayer();

  newPos();

  requestAnimationFrame(update);
}

update();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUp);
