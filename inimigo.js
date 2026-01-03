class Inimigo extends ModeloBase {
  constructor(x, y, largura, altura, imagem, isDerrotavel) {
    super(x, y, largura, altura, imagem);
    this.isDerrotavel = isDerrotavel;
    this.durabilidade = 20;
    this.dano = 1;
    this.esperando = false;
    this.tempoEspera = 0;
    this.duracaoEspera = 250;
  }
  mover(personagem) {
    let dx = 0.8;
    let distanciaHorizontal = Math.abs(this.x - personagem.x);
    let personagemAcima = personagem.y < this.y;
    let personagemProximo = distanciaHorizontal < 90;

    if (personagem.pulando && personagemProximo && personagemAcima) {
      this.esperando = true;
      this.tempoEspera = millis();
      dx = 0;
    }
    
    // Continua esperando por um tempo após o pulo
    if (this.esperando) {
      if (millis() - this.tempoEspera < this.duracaoEspera) {
        dx = 0;
      } else {
        this.esperando = false;
      }
    }
    
    
    // Move o inimigo se não estiver esperando
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