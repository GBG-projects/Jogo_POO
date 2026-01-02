class Jogo {
    constructor() {
        this.fase = 3;
        this.mudandoFase = false;
        this.faseDestino = 1;
        this.fadeAlpha = 0;
    }

    Jogar() {
        if (!this.mudandoFase || this.mudandoFase === "volta") {
            this.executarFase();
        }
        this.metodoObri();
        this.gerenciarTransicao();
    }

    executarFase() {
        const fases = [null, fase1, fase2, fase3, fase4, fase5, fase6, fase7];
        const faseAtual = fases[this.fase];
        if (faseAtual) this.modeloFase(faseAtual);
    }

    metodoObri() {
        fill(255, 0, 0);
        textSize(20);
        text(`Vida: ${breu.vida}`, 20, 30);
    }

    gerenciarTransicao() {
        if (!this.mudandoFase || this.mudandoFase === "volta") {
            if (this.mudandoFase === "volta") {
                this.fadeAlpha -= 2;
                if (this.fadeAlpha <= 0) {
                    this.fadeAlpha = 0;
                    this.mudandoFase = false;
                    return;
                }
                fill(0, this.fadeAlpha);
                noStroke();
                rect(0, 0, width, height);
            }
            return;
        }

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

    iniciarTransicao(destino) {
        this.mudandoFase = true;
        this.faseDestino = destino;
        this.fadeAlpha = 0;
    }

    modeloFase(fase) {
        const ultimoFundo = fase[fase.length - 1];
        const limiteCamera = ultimoFundo.x + ultimoFundo.largura;

        push();
        translate(-camera.x, 0);
        
        const margemVisivel = 200;
        for (let i = 0; i < fase.length; i++) {
            const fundo = fase[i];
            if (fundo.x + fundo.largura < camera.x - margemVisivel) continue;
            if (fundo.x > camera.x + width + margemVisivel) break;
            
            image(
                fundo.img,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                fundo.imgxI, fundo.imgyI,
                fundo.imgxW, fundo.imgyH
            );
        }
        pop();

        breu.mover(limiteCamera);
        breu.atualizar(estruturas);
        camera.acompanhar(breu, limiteCamera);

        push();
        translate(-camera.x, 0);
        
        for (let i = 0; i < estruturas.length; i++) {
            const est = estruturas[i];
            if (est.x + est.largura < camera.x - margemVisivel) continue;
            if (est.x > camera.x + width + margemVisivel) continue;
            
            est.desenhar();
        }
        
        breu.desenhar();
        pop();
    }

    f1() { this.modeloFase(fase1); }
    f2() { this.modeloFase(fase2); }
    f3() { this.modeloFase(fase3); }
    f4() { this.modeloFase(fase4); }
    f5() { this.modeloFase(fase5); }
    f6() { this.modeloFase(fase6); }
    f7() { this.modeloFase(fase7); }
}