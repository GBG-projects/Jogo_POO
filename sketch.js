let instanteInicial;
let breu, estrutura1,breuIMG,cenarioAtual;
let estruturas = [];
let fundo1;
let itens;
function preload(){ 
breuIMG = loadImage("https://png.pngtree.com/png-clipart/20220605/original/pngtree-pixel-art-character-wearing-suit-png-image_7964693.png")
fundo1 = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoW89wIB0tsQq59eoBL2HYwI49cKWkcAbPvw&s")
}
function setup() {
  createCanvas(900, 650);
  instanteInicial = millis()
  breu = new Personagem(10, height- 70, 50, 80, breuIMG)
  estrutura1 = new Estrutura(200, height- 80, 20, 50, null, null, null, null)
  estruturas.push(estrutura1);
  itens = [];
}




function draw() {
  background(200);
  Jogo.Jogar();
}