
let breu, estrutura1;
let breuIMG;
let cenarioAtual;
let estruturas = [];
function preload(){
  // cenarioAtual = loadImage()
  // breuIMG = createImg("https://cdna.artstation.com/p/assets/images/images/024/707/674/original/felipe-zepeda-conejo-agachado.gif?1583271259") 
breuIMG = loadImage("https://png.pngtree.com/png-clipart/20220605/original/pngtree-pixel-art-character-wearing-suit-png-image_7964693.png")
  // breuIMG.hide()
}
function setup() {
  createCanvas(900, 650);
  breu = new Personagem(10, height- 70, 50, 80, breuIMG)
  estrutura1 = new Estrutura(200, height- 50, 20, 50, null, null, null, null)
  estruturas.push(estrutura1)
}




function draw() {
  background(200);
  breu.desenhar()
  breu.mover()
  breu.atualizar(estruturas)
  for(let estrutura of estruturas){
    estrutura.mostrar()
  }
  
}
function keyPressed() {
  if (keyCode === 87) {
    breu.pular();
  }
}