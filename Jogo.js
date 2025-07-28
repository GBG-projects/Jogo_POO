class Jogo {
    constructor(){
        
    }

    static Jogar(){
        this.fase = 1;
        switch(this.fase){
            case 1:
                this.fase1();
            case 2:
                this.fase2();
        }
    
    }

    static fase1(){
        itens.push(
            {x: 20, y:height-90, desenho: () => circle(width/2, height-40, 40)}
        )
        image(fundo1, 0, 0, width, height);
        breu.desenhar();
        breu.atualizar(estruturas);
        breu.mover();
        for(let itemX of itens){
            itemX.desenho()
            breu.pegarItem(itemX)
        }
        
        for(let estrutura of estruturas){
        estrutura.mostrar();
        }
    }
    static fase2(){
        
    }
}