
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const phoneImage = new Image();
phoneImage.src = 'h123.png';
const towerImage = new Image();
towerImage.src = 'h12.png';

towerImage.onload = () => drawTower();
phoneImage.onload = () => placeMen();


function drawTower() {
  const towerWidth = 600;
  const towerHeight = 650;
  const x = canvas.width / 8 - towerWidth / 2;
  const y = canvas.height / 2.3 - towerHeight / 4;
  ctx.drawImage(towerImage, x, y, towerWidth, towerHeight);
}


function getRandomPosition(radius) {
  const angle = Math.random() * Math.PI;
  const distance = Math.random() * radius;
  const x = canvas.width / 2 + Math.cos(angle) * distance;
  const y = canvas.height / 2 + Math.sin(angle) * distance;
  return { x, y };
}

function displayEValue(x, y, d) {

  const alpha = parseFloat(document.getElementById('alphaSelect').value);
  const beta = parseFloat(document.getElementById('betaSelect').value);


  const e = alpha * Math.pow(d, beta);

  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';

  
  ctx.fillText(`H = ${e.toFixed(2)}`, x, y - 10); 
}

function drawNode(x, y) {
  const aspectRatio = phoneImage.width / phoneImage.height;
  const height = 50;
  const width = height * aspectRatio;
  ctx.drawImage(phoneImage, x - width / 2, y - height, width, height);


  const towerX = canvas.width / 8;
  const towerY = canvas.height / 2.3;
  const d = Math.sqrt(Math.pow(x - towerX, 2) + Math.pow(y - towerY, 2));
  

  displayEValue(x, y, d);
}


function placeMen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTower();

  const numMen = parseInt(document.getElementById('numMen').value) || 0;
  const radius = parseInt(document.getElementById('radius').value) || 0;

  if (numMen <= 0 || radius <= 0) {
    alert("Please enter valid inputs.");
    return;
  }

  const maxNodes = 50;
  const nodes = [];
  const minDistance = 170;

  for (let i = 0; i < Math.min(numMen, maxNodes); i++) {
    let position;
    let tooClose = true;

    while (tooClose) {
      position = getRandomPosition(radius);
      tooClose = nodes.some(node => {
        const distance = Math.sqrt(
          Math.pow(position.x - node.x, 2) + Math.pow(position.y - node.y, 2)
        );
        return distance < minDistance;
      });
    }

    if (position.y > canvas.height / 2) {
      drawNode(position.x, position.y);
      nodes.push(position);
    } else {
      i--;
    }
  }
}

document.getElementById('deployBtn').addEventListener('click', placeMen);
drawTower();
