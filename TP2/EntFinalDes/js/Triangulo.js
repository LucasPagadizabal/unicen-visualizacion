class Triangulo {

  constructor(x,y,imagen,estado) {
    this.imagen = imagen;
    this.inicioX = 0;
    this.inicioY = 0;
    this.tipo = 4;
    this.estado = estado;
    this.x = x;
    this.y = y;
    // this.color = color;
  }

  draw(ctx){
      ctx.drawImage(this.imagen,this.x,this.y);
  }
}
