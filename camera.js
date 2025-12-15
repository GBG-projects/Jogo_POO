class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    acompanhar(personagem, limiteMaximo) {

        const offsetFrente = 150;  

        let posicaoDesejada = personagem.x - width / 2 + offsetFrente;

        posicaoDesejada = max(0, posicaoDesejada);

        posicaoDesejada = min(posicaoDesejada, limiteMaximo - width);

        this.x = posicaoDesejada;
    }
}