class Cuadrado {

  constructor(x,y,lado,color,estado) {
    this.inicioX = 0;
    this.inicioY = 0;
    this.tipo = 2;
    this.estado = estado;
    this.x = x;
    this.y = y;
    this.lado = lado;
    this.color = color;
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x,this.y,this.lado,this.lado);
    ctx.closePath();
  }

  selectThis(){
    return  (this.x < event.clientX - canvas.offsetLeft) && (this.lado + this.x > event.clientX - canvas.offsetLeft) && (this.y < event.clientY - canvas.offsetTop) && (this.lado + this.y > event.clientY-canvas.offsetTop);
  }

  equals(figura){
    return figura.tipo == this.tipo;
  }
}
