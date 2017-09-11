class Punto {
  constructor(x , y) {
    this.X = x;
    this.Y = y;
  }
}

class Triangulo {
  constructor(x, y, size,color,estado,imagen){
    this.inicioX = 0;
    this.inicioY = 0;
    this.x = x;
    this.y = y;
    this.size = size;
    this.puntos = [];
    this.color = color;
    this.estado = estado;
    this.tipo = 5;
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
    this.puntos = [];
    ctx.beginPath();
    this.addPunto(new Punto(this.x, this.y));
    this.addPunto(new Punto(this.x + this.size, this.y));
    this.addPunto(new Punto(this.x + this.size / 2, this.y - this.size));
    this.addPunto(new Punto(this.x, this.y));
    ctx.closePath();
    ctx.fill();
    if(this.imagen!=null){
      ctx.fillStyle ="rgba(246,199,153,1)";
       ctx.drawImage(this.imagen, this.x +23, this.y - 60 + 10, 50  , 50);
    }
    ctx.stroke();
    ctx.restore();
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
