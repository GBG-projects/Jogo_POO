class Inimigo extends ModeloBase {
    constructor(x, y, largura,altura,imagem, IsDerrotavel ){
        super(x,y, largura, altura, imagem);
        this.IsDerrotavel = IsDerrotavel;
        this.durabilidade = 20;
    }

    Dardano(PosX, posY, vidaJogador){
        
    let distanciaX = Math.max(this.x, PosX) - Math.min(x, PosX)
    let distanciaY = Math.max(this.y, posY) - Math.min(y, posY)
    if(distanciaX <10 && distanciaY<10){
        vidaJogador -= 1;
    }
    return vidaJogador;
}
}
