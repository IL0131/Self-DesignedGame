var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieGroup , bulletGroup
var life=3
var gameState="play"
var explosionSound , loseSound



function preload(){
  
  shooterImg = loadImage("./assets/shooter_2.png")
  shooter_shooting = loadImage("./assets/shooter_3.png")
  shooterImg = loadImage("./assets/shooter_1.png")
  bgImg = loadImage("./assets/bg.jpeg")
  zombieImage = loadImage("./assets/zombie.png")
  heart_1Image = loadImage("./assets/heart_1.png")
  heart_2Image = loadImage("./assets/heart_2.png")
  heart_3Image = loadImage("./assets/heart_3.png")
  explosionSound = loadSound("./assets/explosion.mp3")
  loseSound = loadSound("./assets/lose.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3

   heart_1 = createSprite(displayWidth-150,40,20,20);
  // heart_1.addImage(heart_1Image)
   heart_1.scale = 0.25

   heart_2 = createSprite(displayWidth-100,40,20,20);
   
   heart_2.scale = 0.25
 
   heart_3 = createSprite(displayWidth-150,40,20,20);
   heart_3.addImage(heart_3Image)
   heart_3.scale = 0.25
 
bulletGroup = new Group()
zombieGroup = new Group()

}

function draw() {
  background(0); 
 
if(gameState === "play"){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }

  if(keyWentDown("space")){
 
    player.addImage(shooter_shooting)
   
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bulletGroup.add(bullet)
  
  player.depth = bullet.depth
  bullet.depth = bullet.depth+2
  explosionSound.play()
  
  
  }

  else if(keyDown("space")){
    shooterImg = ("shooter_1.png")
    
    }
    if(zombieGroup.isTouching(player)){
      for(var i=0; i<zombieGroup.length;i++){
    
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
           life=life-1
          
        }
      }
    }
    
    if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0; i<zombieGroup.length;i++){
    
        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
        }
      }
    }

    if(life===2){ 
      heart_3.destroy()
      heart_2.addImage(heart_2Image)
      }
      
      if(life===1){
        heart_2.destroy()
        heart_3.destroy()
        heart_1.addImage(heart_1Image)
      }
                                                              
      spawnZombies();
                         
      if(life === 0){
        gameState="lost"

      }
                                             
  }

else if(gameState === "lost"){

textSize(100)
fill("yellow")
text('GAME OVER',displayWidth-300,displayWidth-300)
loseSound.play()
zombieGroup.destroyEach()
player.destroy()




}



drawSprites();

}

function spawnZombies(){
  if(frameCount % 70 === 0){
    zombie = createSprite(1000,200,50,150);
    zombie.addImage(zombieImage)
    zombie.y = Math.round(random(10,600))
    zombie.scale = .15;
    zombie.velocityX = -3;

    zombie.lifetime = 280

zombieGroup.add(zombie);

  }
}
