title = "bebus game";

description = `
[click] when 
   purple
`;

characters = [
  `
   ll
   l  
   l  
   l  
  ll  
  ll  
  `
];

options = {
  theme: "shapeDark",
  viewSize: {x: 100, y: 120},
  isPlayingBgm: true,
  isReplayEnabled: true,
};

let player; 
let enemies;
let square; 

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

    // square = {posX: rndi(10, 90), posY: -60, width: 10, isGrowing: rndi(0, 1) == 0}; 
  }

  color("black");
  char("a", player.pos);
  drawEnemies(); 
  updateEnemies(); 

  if (ticks % 2) {
    enemies.forEach(enemy=> enemy.posY += 0.5); 
    // square.posY += 0.7;
    dilate(); 
  }

  playerShoot(); 
}

function drawEnemies() {
  for (const enemy of enemies) {
    color(enemy.color);
    arc(enemy.posX, enemy.posY, enemy.radius); 
  }

  // color("blue"); 
  // rect(square.posX, square.posY, square.width, square.width); 
}

function resetEnemy(enemy) {
  enemy.posX = rndi(15, 85); 
  enemy.posY = 0; 
  enemy.radius = rndi(5, 15);
  enemy.isGrowing = rndi(0, 1);
}

function resetSquare() {
  square.posX = rndi(10, 90); 
  square.posY = -60; 
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (enemy.posY >= 110) {
      play("hit"); 
      end(); 
    }
    // if (square.posY >= 110) {
    //   play("hit"); 
    //   end(); 
    // }
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

  // if (square.isGrowing) {
  //   square.width++; 
  //   if (square.width >= 15) {
  //     square.isGrowing = false; 
  //   }
  // }
  // else{
  //   square.width--; 
  //   if (square.width <= 5) {
  //     square.isGrowing = true; 
  //   }
  // }
}

function playerShoot() {
  if(input.isJustReleased){
    //sort enemies - closest enemy to player is first
    const sortedEnemies = enemies.sort(enemy=> enemy.posY);

    for (const enemy of sortedEnemies) {
      if (enemy.color == "purple" && enemy.posY <=  110){ 
        // respawn enemy
        resetEnemy(enemy);
  
        // increase score
        addScore(1);
        play("coin");

        color("purple"); 
        particle (
          enemy.posX,
          enemy.posY,
          10,
          1,
        )
        break
      }
    }
  }
}
