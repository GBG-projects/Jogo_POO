let breu, camera;
let estruturas = [];
let fundos = [];
let fase1 = [];
let fase2 = [];

let meuJson;
let jogo = new Jogo();

let podeInteragir = false;
let camaProxima = null;
let lendoLivro = false;
let livroProximo = null;
let imagemLivroAberto = null;
let portaTrem = null;

function preload() { 
  meuJson = loadJSON("jogo.json");
}

function setup() {
  createCanvas(800, 550);
  puxarCenario();

  let objPersonagem = PegarInfoPersonagem();
  breu = new Personagem(
    objPersonagem.x,
    objPersonagem.y,
    objPersonagem.largura,
    objPersonagem.altura
  );

  camera = new Camera(objPersonagem.x, objPersonagem.y);

  carregarEstruturasDaFase(2);
}

function draw() {
  background(200);

  jogo.Jogar();

  checarInteracaoElementos();

  if (podeInteragir) {
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER);

    if(camaProxima){

      text("Pressione E para deitar", width/2, height - 50);
    }
    else if(livroProximo){
      text("Pressione E para ler", width/2, height - 50);

    }
    else if(portaTrem){
      text("Pressione E para entrar no trem", width/2, height - 50);

    }

    pop();
    
  }
  if(lendoLivro){
    lerTexto(livroProximo.imgAberta);
    return;
  }
}

function checarInteracaoElementos() {
  podeInteragir = false;
  camaProxima = null;

  for (let e of estruturas) {
    if (e.tipo === "cama" && jogo.fase === 1) {
      let colide =
        breu.x < e.x + e.largura &&
        breu.x + breu.largura > e.x &&
        breu.y < e.y + e.altura &&
        breu.y + breu.altura > e.y;

      if (colide) {
        podeInteragir = true;
        camaProxima = e;
      }
    }
    if(e.tipo== "livro"){
      let colide =
        breu.x+10 < e.x + e.largura &&
        breu.x-10 + breu.largura > e.x &&
        breu.y+10 < e.y + e.altura &&
        breu.y-10 + breu.altura > e.y;

      if (colide) {
        podeInteragir = true;
        livroProximo = e;
      }
    }
  
    if(e.tipo == "portaTrem"){
        let colide =
          breu.x < e.x + e.largura &&
          breu.x + breu.largura > e.x &&
          breu.y < e.y + e.altura &&
          breu.y + breu.altura> e.y;
        if(colide){
          podeInteragir = true;
          porta = e;
        }
    }
  }
  }

function keyPressed() {
  if (lendoLivro && keyCode === 27) {
    lendoLivro = false;
    return;
  }

  if ((key === "e" || key === "E") && podeInteragir) {

    if (camaProxima) {
      jogo.iniciarTransicao(2);
    }

    else if (livroProximo) {
      lendoLivro = true;
      imagemLivroAberto = livroProximo.imgAberta;
    }

    else if(portaTrem){
      jogo.iniciarTransicao(3);
    }
  }
}

function carregarEstruturasDaFase(fase) {
  estruturas = [];

  if (fase === 1) {
    let camaJSON  = meuJson.Cenarios.quarto.estruturas.cama;
    let livro1JSON = meuJson.Cenarios.quarto.estruturas.livro1;
    let livro2JSON = meuJson.Cenarios.quarto.estruturas.livro2;
    let livro3JSON = meuJson.Cenarios.quarto.estruturas.livro3;

    let cama = new Estrutura(
      camaJSON.x, camaJSON.y,
      camaJSON.largura, camaJSON.altura,
      camaJSON,
      true,
      null,
      false,
      "cama",
      camaJSON.largura
    );
    cama.destino = 2;

    let livro1 = new Estrutura(
      livro1JSON.x, livro1JSON.y,
      livro1JSON.largura, livro1JSON.altura,
      livro1JSON,
      false,
      null,
      false,
      "livro"
    );

    let livro2 = new Estrutura(
      livro2JSON.x, livro2JSON.y,
      livro2JSON.largura, livro2JSON.altura,
      livro2JSON,
      false,
      null,
      false,
      "livro",
    );

    let livro3 = new Estrutura(
      livro3JSON.x, livro3JSON.y,
      livro3JSON.largura, livro3JSON.altura,
      livro3JSON,
      true,
      null,
      false,
      "livro",
    );
    livro3.imgAberta = loadImage(livro3JSON.imgAberta);

    estruturas.push(cama, livro1, livro2, livro3);
}


  if (fase === 2) {
    let entradaTremJSON = meuJson.Cenarios.floresta2.estruturas.entradaTrem;
    let gravetoJSON = meuJson.Cenarios.floresta2.estruturas.graveto;
    
    let graveto = new Estrutura(
      gravetoJSON.x,
      gravetoJSON.y,
      gravetoJSON.largura,
      gravetoJSON.altura,
      gravetoJSON,
      null,
      true,
      true,
      "item"    
    
    )
    let entradaTrem = new Estrutura(
      entradaTremJSON.x,
      entradaTremJSON.y,
      entradaTremJSON.largura,
      entradaTremJSON.altura,
      entradaTremJSON,
      true,
      true,
      true,
      "portaTrem"
    )
    estruturas.push(entradaTrem, graveto);
  }

  if(fase == 3){

  }
}

function puxarCenario() {
  let cenariosDoJogo = meuJson.Cenarios;
  for (let cenario in cenariosDoJogo) {
    let c = cenariosDoJogo[cenario];
    c.img = loadImage(c.img);
    fundos.push(c);
  }
  fase1.push(fundos[0]);
  fase2.push(fundos[1],fundos[2]);
}

function PegarInfoPersonagem() {
  let meuPersonagem = meuJson.personagem;
  let objPersonagem = {};
  for (let valor in meuPersonagem) {
    objPersonagem[valor] = meuPersonagem[valor];
  }
  return objPersonagem;
}

function lerTexto(img){
  push();
  imageMode(CORNER);
  image(img, 0, 0, width, height);
  pop();
}


