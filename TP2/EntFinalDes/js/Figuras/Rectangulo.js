class Rectangulo {

  constructor(x,y,a,b,color,estado) {
    if(a<b || b<a){
      this.inicioX = 0;
      this.inicioY = 0;
      this.tipo = 3;
      this.estado = estado;
      this.x = x;
      this.y = y;
      this.a = a;
      this.b = b;
      this.color = color;
    }
  }

  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x,this.y,this.a,this.b);
    ctx.closePath();
  }

  selectThis(event){
    var rect = canvas.getBoundingClientRect();
    var dx =   event.clientX - rect.left;
    var dy =   event.clientY - rect.top;
    return  (this.x < dx) && (this.a + this.x > dx) && (this.y < dy) && (this.b + this.y > dy);
  }

  equals(figura){
    return figura.tipo == this.tipo;
  }
}
