class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y; 
    }

    acompanhar(personagem) {
        const margemEsquerda = 100;
        const margemDireita = width-3;

        if (personagem.x - this.x > margemDireita) {
            this.x = personagem.x - margemDireita;
        }

        if (personagem.x - this.x < margemEsquerda) {
            this.x = personagem.x - margemEsquerda;
        }

        this.x = max(0, this.x);
    }
}
