class Inimigo {
    constructor(x, y, altura,largura, IsDerrotavel, imagem){
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.largura = largura;
        this.IsDerrotavel = IsDerrotavel;
        this.imagem = imagem;
        this.durabilidade = 20;
    }

    desenhar(){
        
        rect(this.x, this.y, this.largura, this.altura)
    }

    levarDano(ataqueJogador){
        this.durabilidade-= ataqueJogador
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
