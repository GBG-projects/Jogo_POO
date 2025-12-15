class Jogo {
    constructor() {
        this.fase = 2;           
        this.mudandoFase = false;
        this.faseDestino = 1;   
        this.fadeAlpha = 0;    
    }

    Jogar() {
        if (!this.mudandoFase || this.mudandoFase === "volta") {
            if (this.fase === 1) this.f1();
            if (this.fase === 2) this.f2();
        }

        this.metodoObri();

        if (this.mudandoFase && this.mudandoFase !== "volta") {
            this.fadeAlpha += 2;
            if (this.fadeAlpha >= 255) {
                this.fadeAlpha = 255;

                this.fase = this.faseDestino;
                breu.x = 50;
                camera.x = breu.x;

                carregarEstruturasDaFase(this.faseDestino);

                this.mudandoFase = "volta";
            }

            fill(0, this.fadeAlpha);
            noStroke();
            rect(0, 0, width, height);
        } 
        else if (this.mudandoFase === "volta") {
            this.fadeAlpha -= 2;
            if (this.fadeAlpha <= 0) {
                this.fadeAlpha = 0;
                this.mudandoFase = false;
            }
            fill(0, this.fadeAlpha);
            noStroke();
            rect(0, 0, width, height);
        }
    }

    metodoObri(){
        fill(255, 0, 0);
        textSize(20);
        text(`Vida: ${breu.vida}`, 20, 30);
    }

    iniciarTransicao(destino) {
        this.mudandoFase = true;
        this.faseDestino = destino;
        this.fadeAlpha = 0;
    }

    f1() {
            
    
        push();
        translate(-camera.x, 0);
        for (let fundo of fase1) {
            image(
                fundo.img,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                fundo.imgxI, fundo.imgyI,
                fundo.imgxW, fundo.imgyH
            );
        }
        pop();

        breu.mover(fase1[fase1.length - 1].largura + fase1[fase1.length - 1].x);
        breu.atualizar(estruturas);
        camera.acompanhar(breu);

        push();
        translate(-camera.x, 0);
        for (let estrutura of estruturas) estrutura.desenhar();
        breu.desenhar();
        pop();
    }

    f2() {
        push();
        translate(-camera.x, 0);
        for (let fundo of fase2) {
            image(
                fundo.img,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                fundo.imgxI, fundo.imgyI,
                fundo.imgxW, fundo.imgyH
            );
        }
        pop();

        breu.mover(fase2[fase2.length - 1].largura + fase2[fase2.length - 1].x);
        breu.atualizar(estruturas);
        camera.acompanhar(breu, fase2[fase2.length-1].x+fase2[fase2.length-1].largura);

        push();
        translate(-camera.x, 0);
        for (let estrutura of estruturas) estrutura.desenhar();
        breu.desenhar();
        pop();
    }
}
