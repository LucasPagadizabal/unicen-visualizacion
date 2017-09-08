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
    ctx.fillStyle='#000';
    ctx.fillRect(this.x - (1), this.y - (1), this.lado + (1 * 2), this.lado + (1 * 2));
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x,this.y,this.lado,this.lado);
    ctx.stroke();
    ctx.closePath();


  }

  selectThis(event){
    var rect = canvas.getBoundingClientRect();
    var dx =   event.clientX - rect.left;
    var dy =   event.clientY - rect.top;

    return  (this.x <dx) && (this.lado + this.x > dx) && (this.y < dy) && (this.lado + this.y > dy);
  }

  equals(figura){
    return figura.tipo == this.tipo;
  }
}
