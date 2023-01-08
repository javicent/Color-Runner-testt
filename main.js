title = "Color Runner";

description = `
[HOLD] Fly Up
Pick up color orbs to switch colors
Other colored obstacles will stop you
`;

/*
referenced code from 
https://abagames.github.io/crisp-game-lib-games/?liftup
https://github.com/JunoNgx/crisp-game-lib-tutorial#step-01-basic-drawing-and-update-stars
*/

characters = [
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
  `
];

const G = {
  WIDTH: 400,
  HEIGHT: 225,
  SPEED: 1,
  WIDTH_MIN: 5,
  WIDTH_MAX: 20,
  HEIGHT_MIN: 5,
  HEIGHT_MAX: 20,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  seed: 3,
  theme: "shapeDark"
};

/** @type {{pos: Vector, size: Vector, color: String}} */
let player;

/** @type {{pos: Vector, speed: Int}} */
let redCube;

/** @type {{pos: Vector, speed: Int}} */
let blueCube;

/** @type {{pos: Vector, size: Vector, speed}}*/
let platform;

/** @type {{pos: Vector, size: Vector}}*/
let obstacle;

let currentLevel = 1;

let colorChangeDistance = 4;

function update() {
  G.SPEED += 1/10000000;
  //startup function
  if (!ticks) {
    currentLevel = 1

    player = { pos: vec(10, G.HEIGHT - 10), vx: 0, ty: 90, color: "black"};

    redCube = { pos: vec(G.WIDTH, G.HEIGHT - 25), speed: G.SPEED};
    blueCube = { pos: vec(G.WIDTH, G.HEIGHT - 40), speed: G.SPEED};
    greenCube = { pos: vec(rnd(G.WIDTH, G.WIDTH + 200), G.HEIGHT - Math.floor(rnd(0,3))*50 - 40), speed: G.SPEED};
    yCube = { pos: vec(rnd(G.WIDTH, G.WIDTH + 200), G.HEIGHT - Math.floor(rnd(0,3))*50 - 40), speed: G.SPEED};
    
    
    rPlatform = { pos: vec(G.WIDTH + 100, G.HEIGHT - 60), size: vec(20, 5), speed: G.SPEED};
    bPlatform = { pos: vec(G.WIDTH + 300, G.HEIGHT - 60), size: vec(20, 5), speed: G.SPEED};
    gPlatform = { pos: vec(G.WIDTH + 200, G.HEIGHT - Math.floor(rnd(0,3))*50 - 60), size: vec(20, 5), speed: G.SPEED};
    yPlatform = { pos: vec(G.WIDTH + 200, G.HEIGHT - Math.floor(rnd(0,3))*50 - 60), size: vec(20, 5), speed: G.SPEED};

    rOb = { pos: vec(G.WIDTH + 10, G.HEIGHT - 35), size: vec(5, 25), speed: G.SPEED}
    bOb = { pos: vec(G.WIDTH + 40, G.HEIGHT - 85), size: vec(5, 25), speed: G.SPEED}
    gOb = { pos: vec(rnd(G.WIDTH + 100, G.WIDTH + 200), G.HEIGHT - Math.floor(rnd(0,4))*50 - 35), size: vec(5, 25), speed: G.SPEED}
    yOb = { pos: vec(rnd(G.WIDTH + 100, G.WIDTH + 200), G.HEIGHT - Math.floor(rnd(0,4))*50 - 35), size: vec(5, 25), speed: G.SPEED}
  }    
  

  //platforms
  color("light_black");
  rect(0, G.HEIGHT - 10, G.WIDTH, 10);

  color("light_black");
  rect(0, G.HEIGHT - 60, G.WIDTH, 5);

  color("light_black")
  rect(0, G.HEIGHT - 110, G.WIDTH, 5);

  color("light_black")
  rect(0, G.HEIGHT - 160, G.WIDTH, 5);

  color("light_black")
  rect(0, 0, G.WIDTH, G.HEIGHT - 210);

  color("red");
  rect(rPlatform.pos.x,rPlatform.pos.y,rPlatform.size.x,rPlatform.size.y)
  rPlatform.pos.x -= G.SPEED;
  if (rPlatform.pos.x < rPlatform.size.x*-1) {
    rPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    rPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color("blue");
  rect(bPlatform.pos.x,bPlatform.pos.y,bPlatform.size.x,bPlatform.size.y)
  bPlatform.pos.x -= G.SPEED;
  if (bPlatform.pos.x < bPlatform.size.x*-1) {
    bPlatform.pos.x = rnd(G.WIDTH + 90,G.WIDTH+300);
    bPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color('green');
  rect(gPlatform.pos.x,gPlatform.pos.y,gPlatform.size.x,gPlatform.size.y)
  gPlatform.pos.x -= G.SPEED;
  if (gPlatform.pos.x < gPlatform.size.x*-1) {
    gPlatform.pos.x = rnd(G.WIDTH + 69,G.WIDTH+150);
    gPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color('yellow');
  rect(yPlatform.pos.x,yPlatform.pos.y,yPlatform.size.x,yPlatform.size.y)
  yPlatform.pos.x -= G.SPEED;
  if (yPlatform.pos.x < yPlatform.size.x*-1) {
    yPlatform.pos.x = rnd(G.WIDTH + 20,G.WIDTH+160);
    yPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color("red");
  rect(rOb.pos.x,rOb.pos.y,rOb.size.x,rOb.size.y)
  rOb.pos.x -= G.SPEED;
  if (rOb.pos.x < rOb.size.x*-1) {
    rOb.pos.x = rnd(G.WIDTH,G.WIDTH+160);
    rOb.pos.y = G.HEIGHT - Math.floor(rnd(0,4))*50 - 35;
  }

  color("blue");
  rect(bOb.pos.x,bOb.pos.y,bOb.size.x,bOb.size.y)
  bOb.pos.x -= G.SPEED;
  if (bOb.pos.x < bOb.size.x*-1) {
    bOb.pos.x = rnd(G.WIDTH + 20,G.WIDTH+300);
    bOb.pos.y = G.HEIGHT - Math.floor(rnd(0,4))*50 - 35;
  }

  color("green");
  rect(gOb.pos.x,gOb.pos.y,gOb.size.x,gOb.size.y)
  gOb.pos.x -= G.SPEED;
  if (gOb.pos.x < gOb.size.x*-1) {
    gOb.pos.x = rnd(G.WIDTH + 70,G.WIDTH+340);
    gOb.pos.y = G.HEIGHT - Math.floor(rnd(0,4))*50 - 35;
  }

  color("yellow");
  rect(yOb.pos.x,yOb.pos.y,yOb.size.x,yOb.size.y)
  yOb.pos.x -= G.SPEED;
  if (gOb.pos.x < yOb.size.x*-1) {
    yOb.pos.x = rnd(G.WIDTH+50,G.WIDTH+220);
    yOb.pos.y = G.HEIGHT - Math.floor(rnd(0,4))*50 - 35;
  }

  //player
  addScore(0.1);
  color(player.color)
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;
  
  if(currentLevel == 1){
    if(canPass()){
      player.pos.y -= 10;
      currentLevel++;
    }else 
      if (input.isPressed && player.pos.y > G.HEIGHT - 53) {
        player.pos.y -= 1;
        if(player.pos.y < G.HEIGHT - 53){
          currentLevel++;
        }
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 13, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
    }

    if(currentLevel == 2){
      if(canPass() && player.pos.y > G.HEIGHT - 71){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y <= G.HEIGHT - 103){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 103) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 63, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 63, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }      
    }
    if(currentLevel == 3){
      if(canPass() && player.pos.y > G.HEIGHT - 114){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y < G.HEIGHT - 152){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 153) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 113, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 113, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }
    }
    if(currentLevel == 4){
      if(canPass() && player.pos.y > G.HEIGHT - 164){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y < G.HEIGHT - 202){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 207) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 163, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 163, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }
    }
  //red cube
  color("red");
  redCube.pos.x -= redCube.speed;
  if (redCube.pos.x < 0) {
    redCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    redCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 25;    
  }
  //red cube collision
  if (abs(redCube.pos.y - player.pos.y) < colorChangeDistance && abs(redCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "red";
    play("jump");
  }
  box(redCube.pos, 3);
  //blue cube
  color("blue");
  blueCube.pos.x -= blueCube.speed;
  if (blueCube.pos.x < 0) {
    blueCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    blueCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 40;      }
  //blue cube collision
  if (abs(blueCube.pos.y - player.pos.y) < colorChangeDistance && abs(blueCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "blue";
    play("jump");
  }
  box(blueCube.pos, 3);
  //green cube
  color("green");
  greenCube.pos.x -= greenCube.speed;
  if (greenCube.pos.x < 0) {
    greenCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    greenCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 40;      }
  //green cube collision
  if (abs(greenCube.pos.y - player.pos.y) < colorChangeDistance && abs(greenCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "green";
    play("jump");
  }
  box(greenCube.pos, 3);
  //yellow cube
  color("yellow");
  yCube.pos.x -= yCube.speed;
  if (yCube.pos.x < 0) {
    yCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    yCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 40;      }
  //yellow cube collision
  if (abs(yCube.pos.y - player.pos.y) < colorChangeDistance && abs(yCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "yellow";
    play("jump");
  }
  box(yCube.pos, 3);
}
function canPass(){
  //Red Collisions
  if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color == 'red'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color != 'red'){
    play("explosion");
    return end();
  }
  if(player.pos.isInRect(rOb.pos.x,rOb.pos.y,rOb.size.x,rOb.size.y) && player.color != 'red'){
    play("explosion");
    return end();
  }
  //Blue Collisions
  if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color == 'blue'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color != 'blue'){
    play("explosion");
    return end();
  }
  if(player.pos.isInRect(bOb.pos.x,bOb.pos.y,bOb.size.x,bOb.size.y) && player.color != 'blue'){
    play("explosion");
    return end();
  }
  // Green Collisions
  if(player.pos.isInRect(gPlatform.pos.x,gPlatform.pos.y-3,gPlatform.size.x,gPlatform.size.y*2+1) && player.color == 'green'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(gPlatform.pos.x,gPlatform.pos.y-3,gPlatform.size.x,gPlatform.size.y*2+1) && player.color != 'green'){
    play("explosion");
    return end();
  }
  if(player.pos.isInRect(gOb.pos.x,gOb.pos.y,gOb.size.x,gOb.size.y) && player.color != 'green'){
    play("explosion");
    return end();
  }
  // Yellow Collisions
  if(player.pos.isInRect(yPlatform.pos.x,yPlatform.pos.y-3,yPlatform.size.x,yPlatform.size.y*2+1) && player.color == 'yellow'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(yPlatform.pos.x,yPlatform.pos.y-3,yPlatform.size.x,yPlatform.size.y*2+1) && player.color != 'yellow'){
    play("explosion");
    return end();
  }
  if(player.pos.isInRect(yOb.pos.x,yOb.pos.y,yOb.size.x,yOb.size.y) && player.color != 'yellow'){
    play("explosion");
    return end();
  }
  else
  {
    return false;
  }
}

addEventListener("load", onLoad);