let breu, camera;
let estruturas = [];
let inimigos = [];
let fundos = [];
let fase1 = [];
let fase2 = [];
let fase3 = [];
let fase4 = [];
let fase5 = [];
let fase6 = [];
let fase7 = [];
let meuJson;
let jogo = new Jogo();

let podeInteragir = false;
let camaProxima = null;
let lendoLivro = false;
let livroProximo = null;
let TextoLivroAberto = null;
let portaTrem = null;
let item = null;
let gravetoNaMao = false;
let textoAtual = [];
let indiceLinha = 0;
let indiceLetra = 0;
let tempoUltimaLetra = 0;
let velocidadeTexto = 50; 
let textoCompleto = false;

let spritesBreuFrente = [];
let spritesBreuTras = [];
let spritesBreuFrenteGraveto = [];
let spritesBreuTrasGraveto = [];

function preload() { 
  meuJson = loadJSON("jogo.json");

  

}

function setup() {
  createCanvas(800, 550);

  spritesBreuFrente = [
    loadImage(meuJson.Sprites.t1),
    loadImage(meuJson.Sprites.t2),
    loadImage(meuJson.Sprites.t3)
  ];
  
  spritesBreuTras = [
    loadImage(meuJson.Sprites.t4),
    loadImage(meuJson.Sprites.t5),
    loadImage(meuJson.Sprites.t6)
  ];
  
  spritesBreuFrenteGraveto = [
    loadImage(meuJson.Sprites.t1_graveto),
    loadImage(meuJson.Sprites.t2_graveto),
    loadImage(meuJson.Sprites.t3_graveto)
  ];
  
  spritesBreuTrasGraveto = [
    loadImage(meuJson.Sprites.t4_graveto),
    loadImage(meuJson.Sprites.t5_graveto),
    loadImage(meuJson.Sprites.t6_graveto)
  ];


  
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
  for(let fundo of fundos) {
    if(fundo.img.width > 5000 || fundo.img.height > 5000) {
      
      if(fundo.img.width > fundo.img.height) {
        fundo.img.resize(1800, 900);
      }
    }
  }
  
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

    else if(item){
      text("Pressione F para pegar o graveto", width/2, height - 50);

    }

    pop();
    
  }
  if(lendoLivro){
    lerTexto(TextoLivroAberto);

    return;
  }

}

function checarInteracaoElementos() {
  podeInteragir = false;
  camaProxima = null;
  livroProximo = null;
  portaTrem = null;
  item = null;

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
          portaTrem = e;
        }
    }
    if(e.tipo=="item"){
      let colide =
          breu.x < e.x + e.largura &&
          breu.x + breu.largura > e.x &&
          breu.y < e.y + e.altura &&
          breu.y + breu.altura> e.y;
        if(colide){
          podeInteragir = true;
          item = e;
        }
    }
  }
  }

function keyPressed() {
  if (lendoLivro && keyCode === 27) {
    lendoLivro = false;
    textoAtual = [];
    indiceLinha = 0;
    indiceLetra = 0;
    textoCompleto = false;
    return;
  }

  if ((key === "e" || key === "E") && podeInteragir) {
    if (camaProxima) {
      jogo.iniciarTransicao(2);
    }
    else if (livroProximo) {
      lendoLivro = true;
      TextoLivroAberto = livroProximo.texto;
      textoAtual = [];
      indiceLinha = 0;
      indiceLetra = 0;
      textoCompleto = false;
    }

    else if(portaTrem){
      jogo.iniciarTransicao(3);
    }
  }

  else if((key=="f" || key=="F")){
    if(item && podeInteragir) {
      pegarItem(item);
      breu.gravetoPego = true;
      breu.frameAtual = 0;
      console.log("Graveto coletado e equipado!");
    }
    else {
      breu.alternarGraveto()
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
      "livroNaoInteragivel"
    );

    let livro2 = new Estrutura(
      livro2JSON.x, livro2JSON.y,
      livro2JSON.largura, livro2JSON.altura,
      livro2JSON,
      false,
      null,
      false,
      "livroNaoInteragivel",
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
    livro3.texto = livro3JSON.texto

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
  
    let bancoMulherJSON = meuJson.Cenarios.vagao1.estruturas.mulher;
    let bancoHomemJSON = meuJson.Cenarios.vagao1.estruturas.homem;
    let bancoGordoJSON = meuJson.Cenarios.vagao1.estruturas.gordo;
    let bancoPescocoJSON = meuJson.Cenarios.vagao1.estruturas.pescoco;
    let bancoVazioJSON = meuJson.Cenarios.vagao1.estruturas.vazio;

    let bancoMulher = new Estrutura(
      bancoMulherJSON.x,
      bancoMulherJSON.y,
      bancoMulherJSON.largura,
      bancoMulherJSON.altura,
      bancoMulherJSON,
      false,
      false,
      false,
      "passageiro"
    )
    let bancoHomem = new Estrutura(
      bancoHomemJSON.x,
      bancoHomemJSON.y,
      bancoHomemJSON.largura,
      bancoHomemJSON.altura,
      bancoHomemJSON,
      false,
      false,
      false,
      "passageiro"
    )
    let bancoPescoco = new Estrutura(
      bancoPescocoJSON.x,
      bancoPescocoJSON.y,
      bancoPescocoJSON.largura,
      bancoPescocoJSON.altura,
      bancoPescocoJSON,
      false,
      false,
      false,
      "passageiro"
    )
    let bancoGordo = new Estrutura(
      bancoGordoJSON.x,
      bancoGordoJSON.y,
      bancoGordoJSON.largura,
      bancoGordoJSON.altura,
      bancoGordoJSON,
      false,
      false,
      false,
      "passageiro"
    )
    
    let bancoVazio = new Estrutura(
      bancoVazioJSON.x,
      bancoVazioJSON.y,
      bancoVazioJSON.largura,
      bancoVazioJSON.altura,
      bancoVazioJSON,
      false,
      false,
      false,
      "passageiro"
    )
    
    if(fase == 3){
      estruturas.push(bancoMulher, bancoGordo, bancoHomem, bancoVazio)
  }
  if(fase == 6) {
    let portaJSON = meuJson.Cenarios.vagaoSaida.estruturas.porta;
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
  fase3.push(fundos[3]);
  fase4.push(fundos[4]);
  fase5.push(fundos[5]);
  fase6.push(fundos[6]);
  fase7.push(fundos[7]);

  
}

function PegarInfoPersonagem() {
  let meuPersonagem = meuJson.personagem;
  let objPersonagem = {};
  for (let valor in meuPersonagem) {
    objPersonagem[valor] = meuPersonagem[valor];
  }
  return objPersonagem;
}

function lerTexto(textoReferente){
  if (textoAtual.length === 0) {
    textoAtual = textoReferente;
    indiceLinha = 0;
    indiceLetra = 0;
    textoCompleto = false;
    tempoUltimaLetra = millis();
  }

  let posX = 15;
  let posY = height - 80;
  
  push();
  fill(0, 0, 0, 215);
  rect(0, height - 105, width / 1.5, 105, 5, 5);
  
  push();
  textSize(16);
  fill("red");
  stroke(255, 99,74)
  
  for (let i = 0; i < indiceLinha; i++) {
    text(textoAtual[i], posX, posY + i * 20);
  }
  
  if (indiceLinha < textoAtual.length) {
    let linhaAtual = textoAtual[indiceLinha].substring(0, indiceLetra);
    text(linhaAtual, posX, posY + indiceLinha * 20);
    
    if (millis() - tempoUltimaLetra > velocidadeTexto && !textoCompleto) {
      indiceLetra++;
      tempoUltimaLetra = millis();
      
      if (indiceLetra > textoAtual[indiceLinha].length) {
        indiceLinha++;
        indiceLetra = 0;
        
        if (indiceLinha >= textoAtual.length) {
          textoCompleto = true;
        }
      }
    }
  }
  
  if (textoCompleto) {
    push();
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text("Pressione ESC para fechar", width/2, 15);
    pop();
  }
  
  pop();
  pop();
}

function pegarItem(item){
  if(item.tipo=="item"){
    breu.inventario.push(item);
    estruturas = estruturas.filter((a) => a!=item)
  }
}

function carregarInimigos(fase){
  inimigos = [];

  if(fase == 3){
    let lesma1JSON = meuJson.Cenarios.vagao1.inimigos.lesma1;

    let lesma1 = new Inimigo(
      lesma1JSON.x, lesma1JSON.y,
      lesma1JSON.largura, lesma1JSON.altura,
      lesma1JSON.img,
      true
    )
    inimigos.push(lesma1)
  }
}