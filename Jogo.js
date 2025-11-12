class Jogo {
    Jogar() {
        this.fase = 1;
        if (this.fase === 1) {
            this.f1();
        }

        this.metodoObri()

    }
    metodoObri(){
        fill(255, 0, 0);
        textSize(20);
        text(`Vida: ${breu.vida}`, 20, 30);
   
    }
    f1() {
        push();
        translate(-camera.x, 0);
        for(let fundo of fase1){
            image(
                fundo.img,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                fundo.imgxI, fundo.imgyI,
                fundo.imgxW, fundo.imgyH
            ); 
        } 
        pop();
        breu.mover(fase1[fase1.length-1].largura);
        breu.atualizar(estruturas);
        camera.acompanhar(breu);
        push();
        translate(-camera.x, 0);
        for (let estrutura of estruturas) {
            estrutura.desenhar();
        }
        breu.desenhar();
        pop();
      
    }

    f2(){

    }
}
