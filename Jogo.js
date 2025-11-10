class Jogo {
    Jogar() {
        this.fase = 1;
        if (this.fase === 1) {
            this.jogo();
        }
    }

    jogo() {
        push();
        translate(-camera.x, 0);
        for(let fundo of fundos){
            image(
                fundo.img,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                fundo.imgxI, fundo.imgyI,
                fundo.imgxW, fundo.imgyH
            ); 
        } 
        pop();
        breu.mover();
        breu.atualizar(estruturas);
        camera.acompanhar(breu);
        push();
        translate(-camera.x, 0);
        for (let estrutura of estruturas) {
            estrutura.desenhar();
        }
        breu.desenhar();
        pop();

        fill(255, 0, 0);
        textSize(20);
        text(`Vida: ${breu.vida}`, 20, 30);
    }
}
