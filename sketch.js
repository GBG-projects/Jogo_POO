let breu, estrutura1,breuIMG,camera;
let estruturas = [];
let fundos = [];
let meuJson;
let jogo = new Jogo()
function preload(){ 
  meuJson = loadJSON("jogo.json");
}
function setup() {
  createCanvas(800, 550);
  puxarCenario()
  objPersonagem = PegarInfoPersonagem()
  breu = new Personagem(
    objPersonagem.x,
    objPersonagem.y,
    objPersonagem.largura,
    objPersonagem.altura
  )
  camera = new Camera(
    objPersonagem.x,
    objPersonagem.y
  );
  estrutura1 = new Estrutura(200, height- 80, 50, 20, null, null, null, null)
  
  estruturas.push(estrutura1);
}

function draw() {
  background(200);
  jogo.Jogar()
}

function puxarCenario(){
  let cenariosDoJogo = meuJson.Cenarios;
  for(let cenario in cenariosDoJogo){
    let c = cenariosDoJogo[cenario];
    c.img = loadImage(c.img);
    fundos.push(c);
  }
}
function PegarInfoPersonagem(){
  let meuPersonagem = meuJson.personagem;
  let objPersonagem = {}
  for(let valor in meuPersonagem){
    objPersonagem[valor] = meuPersonagem[valor];
  }
  
  return objPersonagem;
}

function mundoAtual(){
  
}