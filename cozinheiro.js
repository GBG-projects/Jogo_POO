class Cozinheiro extends ModeloBase {
    constructor(x, y, largura, altura, imagem) {
    super(x, y, largura, altura, imagem);
    this.dano = 3;
    this.imagem = imagem.resize(1800, 900);
    
  }
    mover(mapa) {
        let dx = 1.5;
    
        let ultimaPosicao = mapa[mapa.length-1].width;
        while(this.x+this.largura == ultimaPosicao){
            this.x+= dx;
        }
        let distanciaHorizontal = Math.abs(this.x - personagem.x);
        let personagemProximo = distanciaHorizontal < 10;

        if (personagem.escondido && personagemProximo && personagemAcima) {
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
    }

}