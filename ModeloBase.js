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
        }else {
            fill("red");
            rect(this.x,this.y, this.largura, this.altura)
        }
    }
}