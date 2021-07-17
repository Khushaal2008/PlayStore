//variables
var bg1, bg1Img,bg2 ,bg2Img, start, startImg;
var End = 0
var back = 1
var con = 2
var Play = 3
var serve = 4
var gameState = serve;
var Protiens = 0
var life = 3
var corona,coronaImg,coronaGroup,mask,maskGroup,maskImg,sanitizer,sanitizerGroup,sanitizerImg,floor,floorGroup,floorImage,vaccine,vaccineGroup,vaccineImg,protien,protienGroup,protienImg
var invisibleGround;
var infected,infectedImg;
var continueB,continueImg
var reset,resetImg
var InvPro,Invmask
var shield,shieldImg;
var timer = 20
var timerMask = 15
var timerText = 0
var sMario,sMario_running
var sMario_mask,S_MmaskImg
var score = 0


// preload function
function preload(){
bg2Img = loadImage("background.jpg");
bg1Img = loadImage("Go Carona Go.png")
startImg = loadImage("button.png")
coronaImg = loadImage("Carona.png")
sanitizerImg = loadImage("Sanitizer.png")
maskImg = loadImage("Mask.png")
floorImage = loadImage("floor.png")
shieldImg = loadImage("Shield.png")
vaccineImg = loadImage("vaccine.png")
protienImg = loadImage("ProtienFood.png")
sMario_running = loadAnimation("marioWalking1.png","marioWalking2.png","marioWalking3.png")
sMario_Collided = loadAnimation("marioWalking3.png")
S_MmaskImg = loadImage("mario3.png")
resetImg = loadImage("button_reset.png")
infectedImg = loadImage("Infected.jpg")
continueImg = loadImage("button_continue.png")

}

//setup function
function setup(){
createCanvas(windowWidth,windowHeight);

coronaGroup = new Group();
maskGroup = new Group();
floorGroup = new Group()
sanitizerGroup = new Group();
vaccineGroup = new Group();
protienGroup = new Group();

invisibleGround = createSprite(width/2,height-10,width,125)
invisibleGround.visible = false


bg2 = createSprite(width/2,height/2,width,10)
bg2.addImage(bg2Img)
bg2.scale = 3.2


sMario = createSprite(205,700)
sMario.addAnimation("running",sMario_running)
sMario.addAnimation("collide",sMario_Collided)
sMario.scale = 0.1
//sMario.debug = true
sMario.setCollider("rectangle",0,0,800,2000)

sMario_mask = createSprite(50,height-70,20,50)
sMario_mask.addImage(S_MmaskImg)
sMario_mask.scale = 0.3
sMario_mask.visible = false

bg1 = createSprite(width/2,height/2,width,100)
bg1.addImage(bg1Img)
bg1.scale = 1.5



start = createSprite(width/2,height/2,width,2)
start.addImage(startImg)
start.scale = 1.5


infected = createSprite(width/2,height/2- 50)
infected.addImage(infectedImg)
infected.scale = 4.9
//infected.visible = false

continueB = createSprite(width/2, height/2)
continueB.addImage(continueImg)

reset = createSprite(width/2,height/2)
reset.addImage(resetImg)
reset.scale = 1;
reset.visible = false

InvPro = createSprite(-100000,450,10,100000000)
InvPro.visible = false

Invmask = createSprite(-100000,450,10,100000000)
Invmask.visible = false

shield = createSprite(100000,700)
shield.addImage(shieldImg)
shield.scale = 0.5

}

//draw function
function draw(){
sMario.collide(invisibleGround);



  drawSprites()
  sMario.velocityX = 0
  if(gameState === serve){
    infected.visible = false
    continueB.visible = false
    textSize(22)
    fill("yellow")
    text("If you play this game for 2-3 min then you will get some mask, sanitizer, vaccine, some protien food etc",width/3.5,height/1.5)
  //start.onMousePressed =function(){ start.visible= false; bgScreen2.velocityX = -6}
  if(mousePressedOver(start) || touches.length){
    start.remove()
      gameState = Play
      bg2.velocityX = -5
      bg1.remove()
  }
  }
if(gameState === Play){
  textSize(25)
  fill("yellow")
  text("Score: "+ score, 800,50);
  score = score + Math.round(getFrameRate()/60);
infected.visible = false
//continueB.visible = false
sMario.velocityX = 0

  text("You Infected")
      textSize(30)
    fill("lightgreen")
  text("Protiens = " + Protiens,50,50)
  fill("red")
  text("Life = " + life,width/2,50)

  bg2.velocityX = -5
  if(bg2.x < 90){
    bg2.x = bg2.width/1
  }


  if(life > 3){
    life -= 1
  }


if(sMario.isTouching(coronaGroup)){
  life -= 1
  coronaGroup.destroyEach();
 gameState = con



}
if(life < 1){
  gameState = End
}

if(InvPro.isTouching(coronaGroup)){
  coronaGroup.destroyEach()
}

if(Invmask.isTouching(coronaGroup)){
  coronaGroup.destroyEach()
}

if(sMario.isTouching(maskGroup)){
  maskGroup.destroyEach()
  life += 1
  sMario.x = 4002
  sMario_mask.visible = true
  Invmask.x = 402
  
}


if(timerMask < 1){
  //shield.hide()
  Invmask.x = 3000
  sMario.x = 203
  sMario_mask.visible = false
  timerMask = 20
}


if(Invmask.x === 402){
  timerMask -= 0.03
  textSize(30)
  fill("#ff35dc")
  text("This mask will protect you only for 20 second",250,150)
timerText -= 0.05
}

if(sMario.isTouching(vaccineGroup)){
  InvPro.x = 402
shield.x = 402
    vaccineGroup.destroyEach()
    timerText = 5

  }

  if(timer < 1){
    shield.x = 100000
    InvPro.x = 3000
    timer = 20
  }



  if(InvPro.x === 402){
    timer -= 0.03
    textSize(30)
    fill("#ff35dc")
    text("This Shield will protect you only for 20 second",250,150)
  timerText -= 0.05
  maskGroup.setVelocityXEach(5)
  }
  

    
  if(timerText > 0){
    fill(random(0,255),random(50,255),random(100,255))
    text("Wow!! You just caught the vaccine",250,height/2)
    }
   

if(sMario.isTouching(protienGroup)){
  protienGroup.destroyEach()
  Protiens +=1
}

if(sMario.isTouching(sanitizerGroup)){
  sanitizerGroup.destroyEach();
  life += 1
}




if(keyDown("space") && sMario.y >= 500){
  sMario.velocityY = -72
  
}

if(touches.length && sMario.y >= 550){
  sMario.velocityY = -72
  
}
sMario.velocityY = sMario.velocityY + 4

if(life < 1){
  gameState = End
}

  Objects()

//sMario.collide(floorGroup)

if(sMario.x < 195){
  gameState = back
}



}

if(gameState === con){
  bg2.velocityX = 0
  infected.visible = true
  continueB.visible = true
  if(mousePressedOver(continueB) || touches.length){
    gameState = Play
    continueB.visible = false
   // sMario.x = 200
  }
}

if(gameState === back){
  
 // bg2.velocityX = 0
 continueB.visible = true
  sMario.changeAnimation("collide",sMario_Collided)
  textSize(20)
  fill("yellow")
  text("Please don't do that again otherwise you will lose your life",300,300)
  bg2.velocityX = 0
  sMario.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  //floorGroup.setVelocityXEach(0)
  
 /* coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()*/
  if(mousePressedOver(continueB) || touches.length){
    gameState = Play
    sMario.changeAnimation("running",sMario_running)
sMario.x = 200
sMario.y = 500
coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
//floorGroup.setVelocityXEach(-7)
  }
}


if(gameState===End){
  reset.visible = true


  sMario.changeAnimation("collide",sMario_Collided)
  infected.visible = false
  continueB.visible = false
  bg2.velocityX = 0
  sMario.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  //floorGroup.setVelocityXEach(0)
  
  coronaGroup.setLifetimeEach(-1)
maskGroup.setLifetimeEach(-1)
sanitizerGroup.setLifetimeEach(-1)
vaccineGroup.setLifetimeEach(-1)
protienGroup.setLifetimeEach(-1)
//floorGroup.setLifetimeEach(-1)

if(mousePressedOver(reset)|| touches.length){
  Reset()
}

}


}

// function for creating objects like carona, mask etc.
function Objects(){

// To display carona at random places
if(frameCount % 60 === 0){
corona = createSprite(1010,random(427,850))
corona.addImage(coronaImg)
// corona.debug = true
corona.scale = 0.2
corona.setCollider("rectangle",0,0,200,200)
corona.velocityX = -8
coronaGroup.add(corona)
}


/*if(frameCount % 500 ===0){
floor = createSprite(1000,50,100,30)
  floor.addImage(floorImage)
  floor.scale = 0.2
    floor.velocityX = -7
    floor.lifetime = 800; 
   // floor.debug = true
    floor.setCollider("rectangle",0,0,1500,270)
    floor.y = Math.round(random(756,800))
  floorGroup.add(floor)  
 
}*/

// To display mask at random places
if(frameCount % 659===0){                  
  mask = createSprite(1000,random(427,850))
 mask.addImage(maskImg)
 mask.scale = 0.1
   mask.velocityX = -7
   //mask.x = floor.x
   mask.lifetime = 800;
   maskGroup.add(mask)
 }

// To display sanitizers at random places
if(frameCount % 533===0){
  sanitizer = createSprite(1000,(427,850))
  sanitizer.addImage(sanitizerImg)
  sanitizer.scale = 0.3
  sanitizer.velocityX = -7
  sanitizer.lifetime = 800
  sanitizerGroup.add(sanitizer)
}

// To display vaccine at random places
if(frameCount % 1159=== 0){
  vaccine = createSprite(1000,(835,851))
  vaccine.addImage(vaccineImg)
  vaccine.scale = 0.1
  vaccine.velocityX = -7
  vaccineGroup.add(vaccine)
}


if(frameCount % 555 === 0){
  protien = createSprite(1000,random(835,851))
  protien.addImage(protienImg)
  protien.scale = 0.4
  protien.velocityX = -7
  protienGroup.add(protien)
}


}

function Reset(){
  gameState = Play
  reset.visible = false
  coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()
bg2.velocityX = -6
life = 3
Protiens = 0
score = 0
sMario.changeAnimation("running",sMario_running)
  coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
floorGroup.setVelocityXEach(-7)
}

