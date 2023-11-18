title = "bebus game";

description = `
`;

characters = [
  `
  llllll
  ll l l
  llllll
  ll  ll
  `,
  `
   llll
   l  l
   l  l
   l  l
  ll  ll
  ll  ll
  `
];

options = {
  theme: "dark",
  viewSize: {x: 100, y: 120},
  isPlayingBgm: true,
  isReplayEnabled: true,
};

let player; 
let enemies;

function update() {
  if (!ticks) {
    // player 
    player = {pos: vec(50, 110)};

    // enemies
    enemies = [
      {posX: rndi(15, 85), posY: 0, radius: rndi(5, 15), isGrowing: rndi(0, 1) == 0, color: "black"}, 
      {posX: rndi(15, 85), posY: -20, radius: rndi(5, 15), isGrowing: rndi(0, 1) == 0, color: "black"},
      {posX: rndi(15, 85), posY: -40, radius: rndi(5, 15), isGrowing: rndi(0, 1) == 0, color: "black"}
    ];
  }

  color("black");
  char("a", player.pos);
  drawEnemies(); 
  updateEnemies(); 

  if (ticks % 2) {
    enemies.forEach(enemy=> enemy.posY+= 0.5); 
    dilate(); 
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    color(enemy.color);
    arc(enemy.posX, enemy.posY, enemy.radius); 
  }
}

function resetEnemy(enemy) {
  enemy.posX = rndi(15, 85); 
  enemy.posY = 0; 
  enemy.radius = rndi(5, 15);
  enemy.isGrowing = rndi(0, 1);
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (enemy.posY >= 120) {
      resetEnemy(enemy); 
    }
  }
}

function dilate() {
  for (const enemy of enemies){
    enemy.color = (enemy.radius <= 7)? "purple": "black"; 

    if (enemy.isGrowing) {
      enemy.radius++; 
      if (enemy.radius >= 15) {
        enemy.isGrowing = false; 
      }
    }
    else{
      enemy.radius--; 
      if (enemy.radius <= 5) {
        enemy.isGrowing = true; 
      }
    }
  }
}
