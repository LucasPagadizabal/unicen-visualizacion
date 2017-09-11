class Pentagono {
  constructor(x,y,size,color,estado,imagen) {
    this.inicioX = 0;
    this.inicioY = 0;
    this.x = x;
    this.y = y;
    this.size = size;
    this.puntos = [];
    this.color = color;
    this.estado = estado;
    this.tipo = 4;
    this.initX = x;
    this.initY = y;
    this.imagen = imagen;
  }
  setPosInicial(){
    this.x=this.initX;
    this.y=this.initY;
  }

  addPunto(punto){
    if(this.puntos.length == 0){
      ctx.moveTo(punto.X, punto.Y);
    }else{
      ctx.lineTo(punto.X, punto.Y);
    }
    this.puntos.push(punto);
  }

  draw(){
    var width = this.size * 0.1;
    this.puntos = [];
    // ctx.fillStyle = this.color;
    ctx.beginPath();
    this.addPunto(new Punto(this.x, this.y));
    this.addPunto(new Punto(this.x + this.size, this.y));
    this.addPunto(new Punto(this.x + this.size + this.size / 2 + width, this.y + this.size));
    this.addPunto(new Punto(this.x + this.size, this.y  + this.size * 2));
    this.addPunto(new Punto(this.x, this.y + this.size * 2));
    this.addPunto(new Punto(this.x - this.size / 2 - width, this.y + this.size ));
    ctx.closePath();
    ctx.fill();
    if(this.imagen != null){
        ctx.fillStyle ="rgba(246,199,153,1)";
      ctx.drawImage(this.imagen, this.x, this.y+15, this.size , this.size+25);
    }
    ctx.stroke();
  }

  getMousePosition(e){
    let rect = canvas.getBoundingClientRect();
    return new Punto(e.clientX - rect.left , e.clientY - rect.top);
  }

  selectThis(event){
        var punto = this.getMousePosition(event);
        return this.dentroForma(punto);
      }

  dentroForma(p){
    var dentro = false;
    for (let i = 0, j = this.puntos.length - 1 ; i < this.puntos.length; j = i++){
      if (this.puntos[i].Y > p.Y != this.puntos[j].Y > p.Y && p.X < (this.puntos[j].X - this.puntos[i].X) *   (p.Y - this.puntos[i].Y) / (this.puntos[j].Y - this.puntos[i].Y) + this.puntos[i].X) {
        dentro = !dentro;
      }
    }
    return dentro;
  }

  equals(figura){
    return this.tipo == figura.tipo;
  }
}
