class Jogo {
    constructor(){
        
    }

    static Jogar(){
        this.fase = 1;
        if(this.fase==1){
            this.fase1();
        }
    
    }

    static fase1(){
        image(fundo1, 0, 0, width, height);
        breu.desenhar();
        breu.mover();
        breu.atualizar(estruturas);
        for(let estrutura of estruturas){
        estrutura.mostrar();
        }
    }
}