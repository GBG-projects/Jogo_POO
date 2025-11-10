class Estrutura extends ModeloBase {
    constructor(x, y,largura,altura,imagem, interagivel, durabilidade, isMovel){
       super(x,y,largura, altura, imagem);
        this.interagivel = interagivel;
        this.durabilidade = durabilidade;
        this.isMovel = isMovel;
    }

    Quebrar(DanoJogador){
        if(this.durabilidade == null){
            return;
        }
        else {
            this.Durabilidade-= DanoJogador;
        }
    }
    
}