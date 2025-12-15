class ModeloBase {
    constructor(x,y,largura, altura, imagem){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        
         if (imagem) {
            this.imagem = loadImage(imagem);
            this.temImagem = true;
        } else {
            this.imagem = null;
            this.temImagem = false;
        }
    }
    desenhar(){
        if(this.temImagem && this.imagem){
            image(this.imagem, this.x, this.y, this.largura, this.altura)
        }
    }
    colideCom(obj) {
        return (
            this.x+20 < obj.x + obj.largura &&
            this.x-20 + this.largura > obj.x &&
            this.y < obj.y + obj.altura &&
            this.y + this.altura > obj.y
        );
    }
}
