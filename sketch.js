var restartsprite;
var gameoversprite;
var Gameover;
var Restart;
var JOGO = 1;
var FIM = 0;
var estados = JOGO;
var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var nuvem;
var imagem;
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6;
var pontuacao = 0;
var grupoobstaculos;
var gruponuvems;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidiu = loadImage("trex_collided.png");
  Gameover = loadImage("gameOver.png");
  Restart = loadImage("restart.png");
  
  imagemdosolo = loadImage("ground2.png");
 
  imagem = loadImage("cloud2.png");
  
obstaculo1 = loadImage("obstacle1.png");
obstaculo2 = loadImage("obstacle2.png");
obstaculo3 = loadImage("obstacle3.png");
obstaculo4 = loadImage("obstacle4.png");
obstaculo5 = loadImage("obstacle5.png");
obstaculo6 = loadImage("obstacle6.png");  
  
}

function setup() {

  createCanvas(600,200)
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.scale = 0.5;
  trex.addAnimation("colidiu", trex_colidiu);
  
  //criar um sprite do solo
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  //creating invisible ground
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;

  grupoobstaculos = new Group();
  gruponuvems = new Group();

  restartsprite = createSprite(250,150);
  restartsprite.addImage(Restart);
  restartsprite.visible = false;
  restartsprite.scale = 0.5;
  
  gameoversprite = createSprite(250,100);
  gameoversprite.addImage(Gameover);
  gameoversprite.visible = false;
 
  
  
  
  trex.setCollider("circle",0,0,40);
  

}

function draw() {
  //definir cor de fundo
  background(240);
  text("Pontuação:"+ pontuacao,500,10);
  trex.collide(soloinvisivel);
  
  if(estados == JOGO) {
    
    if(grupoobstaculos.isTouching(trex)) {
      
      estados = FIM;
      
      
    }
    
    
    solo.velocityX = -4;
    obstaculos(); 
    pontuacao=pontuacao+ Math.round(frameCount/60)
    trex.velocityY = trex.velocityY + 0.8
    
    if(keyDown("space")&& trex.y > 160) {
    trex.velocityY = -15;
  
    
    }
  trex.velocityY = trex.velocityY + 0.8
   
    if (solo.x < 0){
    solo.x = solo.width/2;
  } 
  
    geradordenuvem();
    
  }
  else if(estados == FIM) {
   
   gameoversprite.visible = true;
   restartsprite.visible = true;
   trex.velocityY = 0;
   grupoobstaculos.setLifetimeEach(-1);
   gruponuvems.setLifetimeEach(-1);
   trex.changeAnimation("colidiu",trex_colidiu);
   solo.velocityX = 0; 
   grupoobstaculos.setVelocityXEach(0); 
   gruponuvems.setVelocityXEach(0); 
  }
    
  
  
  
  
  
  
  // pular quando a tecla espaço é acionada
  
  
  
  
  
  
  //impedir o trex de cair 
  

  
  
  drawSprites();
  
}
function geradordenuvem() {
  
 if(frameCount % 60 == 0){
  
 nuvem = createSprite(600,100,40,10); 

 nuvem.velocityX=-3; 
  
  nuvem.y=Math.round(random(10,100));
   
nuvem.addImage(imagem);

  nuvem.scale=0.6; 
  
  nuvem.depth=trex.depth;
 trex.depth=1+trex.depth+1;
 
nuvem.lifetime=200;
 
  gruponuvems.add(nuvem);  
 }

}
function obstaculos() {
  
  

  if(frameCount % 60 === 0) {
    
    var obstaculo=createSprite(600,165,10,40);
  obstaculo.velocityX=-6
    
    obstaculo.scale=0.5;
    
    obstaculo.lifetime=100;
    
    var sorteio=Math.round(random(1,6));
    
    grupoobstaculos.add(obstaculo);
    
    switch(sorteio){
          
     case 1:obstaculo.addImage(obstaculo1);   
     break;  
      case 2:obstaculo.addImage(obstaculo2);   
     break;    
     case 3:obstaculo.addImage(obstaculo3);   
     break;  
     case 4:obstaculo.addImage(obstaculo4);   
     break;  
     case 5:obstaculo.addImage(obstaculo5);   
     break;  
     case 6:obstaculo.addImage(obstaculo6);   
     break;  
   
    
    
   
   }
    
    
    
    }

}