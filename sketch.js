let breu, estrutura1,breuIMG,camera;
let estruturas = [];
let fundos = [];
let fase1 = [];
let fase2 = [];
let fase3 = [];
let fase4 = [];
let fase5 = [];
let fase6 = [];



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
  fase1.push(fundos[0],fundos[1])
/*fase2.push(fundos[1])
fase3.push(fundos[2],fundos[3])
fase4.push(fundos[4],fundos[5])
fase5.push(fundos[6],fundos[7])
fase6.push(fundos[8],fundos[9])*/
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
