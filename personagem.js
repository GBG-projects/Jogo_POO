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
      this.alturaLevantado = altura;
      this.alturaAgachado = altura/1.75;
      
    }
    desenhar(){
      image(this.imagem, this.x, this.y, this.Largura, this.altura)
    }
    mover(){

      // move-se para direita
      if(keyIsDown(65)){
        this.x-= this.vx;
      }
      // move-se esquerda
      if(keyIsDown(68)){
        this.x+=this.vx
      }
      // se agacha
      if(keyIsDown(83)){
        // aplica uma animação para diminuir o personagem e seu y
        if(this.altura>this.alturaAgachado){
          //  nao apague esta linha, faz o Personagem nao cair de estruturas
          this.y+=1.5;
          this.altura-= 1.5;
        
        }
        this.agachado = true;
      } else {
        // aplica a animacao para fazer o Personagem crescer
          if(this.altura<this.alturaLevantado){
          //  nao apague esta linha, faz o Personagem nao cair de estruturas
            this.y-=1.5;
            this.altura+= 1.5;
            
          }
            this.agachado = false;
      }
      if(keyIsDown(87)){
          this.pular()
        
      }
    }
    atualizar(estruturas) {
      this.pulando = true;
      this.vy += this.gravidade;
      this.y += this.vy;
      for(let estrutura of estruturas){

        // itera em todas as estruturas e verifica se colidiu
        if(this.colidiu(estrutura) && this.vy>0 && this.y+this.altura<= estrutura.y+this.vy){
          this.vy = 0;
          // mantem meu personagem em cima da estrutura
          this.y = estrutura.y - this.altura
          this.pulando = false;
        }
      }
      if(this.y > height - this.altura && !this.agachado) {
        // quando o personagem nao estiver em nenhuma estrutura 
        // ele vai cair e parar no chao
        this.y = height - this.altura;
        this.vy = 0;
        this.pulando = false;
      }
    }
  
    pular() {
      if (!this.pulando) {
        this.vy = -10;         
      }
    
    }
  
    colidiu(outro){
      // verifica se eu colidi com a estrutura
      let limX = outro.x+outro.Largura>this.x
      && this.Largura+this.x > outro.x
      
      let limY = outro.y+outro.Altura>this.y
      && this.altura+this.y > outro.y

      return limX && limY;
  }
    atacar(VidaIni){
      VidaIni -= this.dano;
      return VidaIni;
    }
    levarDano(DanoIni){
      this.vida -=1;
    }
}
  