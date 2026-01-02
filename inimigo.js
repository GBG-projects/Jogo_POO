class Inimigo extends ModeloBase {
  constructor(x, y, largura, altura, imagem, isDerrotavel) {
    super(x, y, largura, altura, imagem);
    this.isDerrotavel = isDerrotavel;
    this.durabilidade = 20;
    this.dano = 1;
  }

  mover(personagem) {
    let dx = 2;

    // Inimigo persegue o personagem

    if (this.x > personagem.x) {
      this.x -= dx;
    } else {
      this.x += dx;
    }

    // colisão
    this.darDano(personagem);
  }

  darDano(personagem) {
    //função colisão ModeloBase
    if (this.colidiu(personagem)) {
      personagem.levarDano(this.dano);
    }
  }
}