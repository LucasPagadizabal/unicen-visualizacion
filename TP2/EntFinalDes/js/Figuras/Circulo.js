
class Circulo {

  constructor(x,y,radio,color,estado) {
    this.tipo = 1;
    this.inicioX = 0;
    this.inicioY = 0;
    this.estado = estado
    this.x=x;
    this.y=y;
    this.radio = radio;
    this.color=color;
  }

  draw(cv) {
    cv.fillStyle = this.color;
    cv.beginPath();
    cv.arc(this.x,this.y,this.radio,0,Math.PI*2,0);
    cv.fill();
    cv.stroke();
    cv.closePath();
  }

  selectThis(event){
      var rect = canvas.getBoundingClientRect();
      var dx =   event.clientX - rect.left;
      var dy =   event.clientY - rect.top;
    return this.radio>=( Math.sqrt(Math.pow((dx - this.x),2)+Math.pow((dy - this.y),2)));
  }

  equals(figura){
    return figura.tipo == this.tipo;
  }
}
