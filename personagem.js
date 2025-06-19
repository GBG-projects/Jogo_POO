class Personagem 
{
    constructor(x, y, lado, altura, imagem){
      this.x = x;
      this.y = y;
      this.Largura = lado;
      this.altura = altura;
      this.vida = 3;
      this.vidaMax = 3;
      this.dano = 5;
      this.vx = 5;
      this.vy = 0;
      this.imagem = imagem;
      this.agachado = false;
      this.pulando = false;
      this.gravidade = 0.5;
      this.cor = "blue"
      this.alturaLevantado = altura;
      this.alturaAgachado = altura/1.3;
      
    }
    desenhar(){
      
      image(this.imagem, this.x, this.y, this.Largura, this.altura)
      
    }
    mover(){
      if(keyIsDown(65)){
        this.x-= this.vx;
      }
      if(keyIsDown(68)){
        this.x+=this.vx
      }
      if(keyIsDown(83)){
        if(this.altura>this.alturaAgachado){
        this.altura-= 1.5;
        }
        this.y = height-this.altura;
      } else {

          if(this.altura<this.alturaLevantado){
            this.altura+= 1.5;
          }
            this.agachado = false;
      }
    }
    atualizar(estruturas) {
      this.pulando = true;
      this.vy += this.gravidade;
      this.y += this.vy;

      for(let estrutura of estruturas){
        if(this.colidiu(estrutura) && this.vy>0 && this.y+this.altura<= estrutura.y+this.vy){
          this.y = estrutura.y- this.altura
          this.vy = 0;
          this.pulando = false;
        }
        if(this.colidiu(estrutura) && this.vy==0 ){
            this.x = estrutura.x
        }
      }
      
  
      if (this.y > height - this.altura) {
        this.y = height - this.altura;
        this.vy = 0;
        this.pulando = false;
      }
    }
  
    pular() {
      if (!this.pulando) {
        this.vy = -8;         
      }
    }
  
    colidiu(outro){
      let limX = outro.x+outro.Largura>this.x
      && this.Largura+this.x > outro.x
      
      let limY = outro.y+outro.Altura>this.y
      && this.altura+this.y > outro.y

      if(limY){
        if(limX){
          return true;
        }
      }
      return false
  }
    atacar(VidaIni){
      VidaIni -= this.dano;
      return VidaIni;
    }
    levarDano(DanoIni){
      this.vida -=1;
    }
}
  