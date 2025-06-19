class Estrutura {
    constructor(x, y, Altura, Largura, Interagivel, Durabilidade, IsMovel, imagem){
        this.x = x;
        this.y = y;
        this.Altura = Altura;
        this.Largura = Largura;
        this.Interagivel = Interagivel;
        this.Durabilidade = Durabilidade;
        this.IsMovel = IsMovel;
        this.imagem = imagem;
    }

    mostrar(){
        // if(this.Durabilidade<=0 && !this.IsMovel){
        //     return;
        // }
        // if(this.Durabilidade<=0 && this.IsMovel){
        //     // image("", this.x, this.y/3)
        // }
        fill("red")
        rect(this.x, this.y, this.Largura, this.Altura)
    }

    Quebrar(DanoJogador){
        if(this.Durabilidade == null){
            return;
        }
        else {
            this.Durabilidade-= DanoJogador;
        }
    }
    
}