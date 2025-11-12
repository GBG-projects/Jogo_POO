class Personagem extends ModeloBase {
  constructor(x, y, largura, altura) {
    super(x, y, largura, altura);
    this.vida = 3;
    this.vidaMax = 3;
    this.dano = 5;
    this.vx = 3.2;
    this.vy = 0;
    this.agachado = false;
    this.pulando = false;
    this.gravidade = 0.5;
    this.alturaLevantado = altura;
    this.alturaAgachado = altura / 1.75;
    this.estado = "parado";
     this.spritesFrente = [
      loadImage(meuJson.Sprites.t1),
      loadImage(meuJson.Sprites.t2),
      loadImage(meuJson.Sprites.t3)
    ];
    this.spritesTras = [
      loadImage(meuJson.Sprites.t4),
      loadImage(meuJson.Sprites.t5),
      loadImage(meuJson.Sprites.t6)
    ];

    this.imagem = this.spritesFrente[1];
    this.frameAtual = 0;
    this.ultimoFrameTempo = 0;
    this.intervaloTroca = 120; 
  }

  desenhar(){
    this.mudarestado()
    image(this.imagem,this.x,this.y,this.largura,this.altura,50,0,280,384)
  }
  mover(tmfase) {
    
    if (keyIsDown(65) && this.x>-10) {
      this.x -= this.vx;
      this.estado = "esquerda";
    }
    else if (keyIsDown(68) && this.x+this.largura-10<tmfase) {
      this.x += this.vx;
      this.estado = "direita";
    }
    else {
      this.estado = "parado";
    }
    if (keyIsDown(83) && !this.pulando) {
      if (this.altura > this.alturaAgachado) {
        let base = this.y + this.altura; 
        this.altura -= 1.5;
        this.y = base - this.altura;
        this.vx = 1.2;
      }
      this.agachado = true;
    } else {
      if (this.altura < this.alturaLevantado) {
        let base = this.y + this.altura;
        this.altura += 1.5;
        this.y = base - this.altura;
        this.vx= 3;
      }
      
      this.agachado = false;

    }

    if (keyIsDown(87)) {
      this.pular();
    }
  }

  atualizar(estruturas) {
    this.pulando = true;
    this.vy += this.gravidade;
    this.y += this.vy;

    for (let estrutura of estruturas) {
      let lado = this.colidiu(estrutura);

      if (lado === "cima" && this.vy >= 0) {
        this.vy = 0;
        this.y = estrutura.y - this.altura; 
        this.pulando = false;
      }

      if (lado === "baixo" && this.vy < 0) {
        this.vy = 0; 
        this.y = estrutura.y + estrutura.altura;
      }

      if (lado === "esquerda") {
        this.x = estrutura.x - this.largura;
      }

      if (lado === "direita") {
        this.x = estrutura.x + estrutura.largura; 
      }
    }

    if (this.y > height - this.altura) {
      this.y = height - this.altura;
      this.vy = 0;
      this.pulando = false;
    }
  }

  pular() {
    if (!this.pulando && !this.agachado) {
      this.vy = -10;
    }
  }

  colidiu(outro) {
    let margem = 10;

    let colisaoX =
      this.x+margem < outro.x + outro.largura && this.x + this.largura-margem > outro.x;
    let colisaoY =
      this.y < outro.y + outro.altura && this.y + this.altura > outro.y;

    if (colisaoX && colisaoY) {
      let sobreX = Math.min(
        this.x + this.largura - outro.x,
        outro.x + outro.largura - this.x
      );
      let sobreY = Math.min(
        this.y + this.altura - outro.y,
        outro.y + outro.altura - this.y
      );

      if (sobreX < sobreY) {
        if (this.x < outro.x) {
          return "esquerda";
        } else {
          return "direita";
        }
      } else {
        if (this.y < outro.y) {
          return "cima"; 
        } else {
          return "baixo"; 
        }
      }
    }
    return null; 
  }

  atacar(VidaIni) {
    VidaIni -= this.dano;
    return VidaIni;
  }

  levarDano(dano) {
    this.vida -= dano;
    if (this.vida < 0) this.vida = 0;
  }
  mudarestado(){
    if (this.estado === "direita") {
      if (millis() - this.ultimoFrameTempo > this.intervaloTroca) {
        this.frameAtual = (this.frameAtual + 1) % this.spritesFrente.length;
        this.imagem = this.spritesFrente[this.frameAtual];
        this.ultimoFrameTempo = millis();
      }
    }
    else if (this.estado === "esquerda") {
      if (millis() - this.ultimoFrameTempo > this.intervaloTroca) {
        this.frameAtual = (this.frameAtual + 1) % this.spritesTras.length;
        this.imagem = this.spritesTras[this.frameAtual];
        this.ultimoFrameTempo = millis();
      }
    }
     else {
      let isFrente = false;
      for(let frente of this.spritesFrente){
          if(this.imagem == frente){
              isFrente = true;
          }
      }

      if(isFrente){
        this.imagem = this.spritesFrente[1];
      }
      else {
        this.imagem = this.spritesTras[1];
      }
  }
}
}