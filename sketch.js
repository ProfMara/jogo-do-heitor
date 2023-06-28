var gameState = 'start';
var botaoImg, botao;
var espaço
var noggers
var jorge
var nome
var espaçoImg
function preload(){
  nomeImg = loadImage("filmandolutashd.png")
  botaoImg = loadImage("start.png");
  espaçoImg = loadImage("espaço.png");
  soloImg = loadImage("solo.png");

  //carregar as animações do noggers atacando
  noggersParado = loadAnimation("noggers.png");
  //carregar as animações do noggers atacando
  noggersAtacando = loadAnimation("noggers2.png");
  jorgeParado = loadAnimation("jorge.png");
  //carregar as animações do jorge atacando
  jorgeAtacando = loadAnimation("jorge2.png", "jorge3.png");
}

function setup() {
  createCanvas(800,500);  
  espaço = createSprite(398,255,255,255)
  espaço.addImage(espaçoImg)
  espaço.scale = 1.1
  espaço.visible = false

  noggers = createSprite(559,100,255,255)
  noggers.addAnimation("parado",noggersParado)
  //add a animação do noggers atacando
  noggers.addAnimation("atacando",noggersAtacando)
  noggers.scale = 0.2
  noggers.visible = false

  
  jorge = createSprite(150,100,255,255)
  jorge.addAnimation("parado",jorgeParado)
   //add a animação do jorge atacando
  jorge.addAnimation("atacando",jorgeAtacando)
  jorge.scale = 0.07
  jorge.visible = false
  
  nome = createSprite(400, 200, 100, 700);
  nome.addImage(nomeImg);
  nome.scale = 3.0

  botao = createSprite(400, 400, 50, 50);
  botao.addImage(botaoImg);
  botao.scale = 0.3

  solo = createSprite(400, 350, 550, 50);
  solo.addImage(soloImg);
  solo.scale = 0.5
  solo.visible = false;

}

var player = ''

function draw(){
  background("white")
  if(gameState=='start'){
    if(mousePressedOver(botao) ){
      gameState = 'escolha'
    }
  }
  if(gameState =="escolha"){
    botao.visible = false;
    espaço.visible = true;
    jorge.visible = true;
    noggers.visible = true;

    if(mousePressedOver(noggers) ){
      //mude o valor de player para noggers
      player ='noggers'
      gameState = 'battle'
    }
    if(mousePressedOver(jorge) ){
      //mude o valor de player para jorge
      player ='jorge'
      gameState = 'battle'
    }
  }  
  if(gameState == "battle"){
    nome.visible = false;
    solo.visible = true;

    noggers.setCollider("circle", 0,0,200)
    jorge.setCollider("circle", 0,0,900)

    //mude a animação deles para parado
    jorge.changeAnimation("parado");
    noggers.changeAnimation("parado");
    //dê gravidade
    noggers.velocityY += 0.8;
    jorge.velocityY += 0.8;
    //mande colidir com o solo
    noggers.collide(solo);
    jorge.collide(solo);
    
    if(player == "noggers"){
      if(keyDown("a") ){
        noggers.x -= 3
      }
      if(keyDown("d") ){
        noggers.x += 3
      }
      if(keyDown("w") ){
        noggers.velocityY = -10
      }
      if(keyDown("s") ){
        noggers.y += 3
      }
      if(keyDown("left") ){
        jorge.x -= 3
      }
      if(keyDown("right") ){
        jorge.x += 3
      }
      if(keyDown("up") ){
        jorge.velocityY = -10
      }
      if(keyDown("down") ){
        jorge.y += 3
      }
      if(keyCode==48 ){
        jorge.displace(noggers);
        jorge.changeAnimation("atacando")
      }
      if(keyDown('x')){
        noggers.displace(jorge)
        noggers.changeAnimation("atacando")
      }
      if(jorge.y>height || noggers.y>height){
        gameState = 'over'
      }
  }
   
  if(player == "jorge"){
    if(keyDown("left") ){
      noggers.x -= 3
    }
    if(keyDown("right") ){
      noggers.x += 3
    }
    if(keyDown("up") ){
      noggers.velocityY = -10
    }
    if(keyDown("down") ){
      noggers.y += 3
    }
    if(keyDown("a") ){
      jorge.x -= 3
    }
    if(keyDown("d") ){
      jorge.x += 3
    }
    if(keyDown("w") ){
      jorge.velocityY = -10
    }
    if(keyDown("s") ){
      jorge.y += 3
    }
    if(keyCode==48 ){ 
      noggers.displace(jorge)
      noggers.changeAnimation("atacando")
    }
    if(keyDown('x')){
      jorge.displace(noggers);
      jorge.changeAnimation("atacando")
    }
    if(noggers.y>height||jorge.y>height ){
      gameState = 'over'
    }
  }
  }  
  if(gameState == 'over'){
    background("white");
    
    textSize(50);
    fill("red")
    text("GAME OVER", width/3,height/1.5)
    solo.visible = false;
    espaço.visible = false;
    jorge.visible = false;
    noggers.visible = false;
    nome.visible = true;
    botao.visible = true;
    if(mousePressedOver(botao)){
      location.reload()
    }
  }
  drawSprites()
}