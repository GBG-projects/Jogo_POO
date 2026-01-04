class Inimigo extends ModeloBase {
  constructor(x, y, largura, altura, imagem, isDerrotavel) {
  super(x, y, largura, altura, imagem);
  this.isDerrotavel = isDerrotavel;
  this.durabilidade = 20;
  this.dano = 1;
  this.esperando = false;
  this.tempoEspera = 0;
  this.duracaoEspera = 250;
  this.spritesFrente = spritesLesmaFrente;
  this.spritesTras = spritesLesmaTras;
  this.frameAtual = 0;
  this.velocidadeAnimacao = 10;
}

desenhar(personagem) {
  push();
  rect(this.x, this.y, this.largura, this.altura)
  let olhandoParaEsquerda = this.x > personagem.x;
  
  let spritesAtual = olhandoParaEsquerda ? this.spritesTras : this.spritesFrente;
  
  if (!this.esperando) {
    this.frameAtual++;
  }
  
  let indiceSprite = floor((this.frameAtual / this.velocidadeAnimacao) % spritesAtual.length);
  
  image(spritesAtual[indiceSprite], this.x, this.y, this.largura, this.altura);
  
  pop();
}
  mover(personagem) {
    this.desenhar(personagem)
    let dx = 0.8;
    let distanciaHorizontal = Math.abs(this.x - personagem.x);
    let personagemAcima = personagem.y < this.y;
    let personagemProximo = distanciaHorizontal < 90;

    if (personagem.pulando && personagemProximo && personagemAcima) {
      this.esperando = true;
      this.tempoEspera = millis();
      dx = 0;
    }
    
    if (this.esperando) {
      if (millis() - this.tempoEspera < this.duracaoEspera) {
        dx = 0;
      } else {
        this.esperando = false;
      }
    }
    
    
    if (dx !== 0) {
      if (this.x > personagem.x) {
        this.x -= dx;
      } else {
        this.x += dx;
      }
    }
  }
  }


  /*darDano(personagem) {
    //função colisão ModeloBase
    if (this.colidiu(personagem)) {
      personagem.levarDano(this.dano);
    }
  }*/