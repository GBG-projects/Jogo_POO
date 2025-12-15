class Estrutura extends ModeloBase {
    constructor(x, y, largura, altura, imagemJSON, interagivel, durabilidade, isMovel, tipo) {
        super(x, y, largura, altura, imagemJSON?.img);

        this.interagivel = interagivel;
        this.durabilidade = durabilidade;
        this.isMovel = isMovel;
        this.tipo = tipo;
        if (imagemJSON) {
            this.crop = {
                xI: imagemJSON.imgxI,
                xW: imagemJSON.imgxW,
                yI: imagemJSON.imgyI,
                yH: imagemJSON.imgyH
            };
        } else {
            this.crop = null;
        }
    }

    desenhar() {
        if (this.temImagem && this.crop) {
            image(
                this.imagem,       
                this.x, this.y,
                this.largura, this.altura, 
                this.crop.xI, this.crop.yI,   
                this.crop.xW - this.crop.xI,
                this.crop.yH - this.crop.yI   
            );
        } else if (this.temImagem) {
            image(this.imagem, this.x, this.y, this.largura, this.altura);
        } else {
            fill("red");
            rect(this.x, this.y, this.largura, this.altura);
        }
    }

    quebrar(dano) {
        if (this.durabilidade != null) {
            this.durabilidade -= dano;
        }
    }

    interagir(jogador) {

    }
}
