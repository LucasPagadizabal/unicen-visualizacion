
class Circulo {

  constructor(x,y,radio,color) {
    this.inicioX = 0;
    this.inicioY = 0;
    this.x=x;
    this.y=y;
    this.radio = radio;
    this.color=color;
  }

  draw(cv) {
    cv.fillStyle = this.color;
    cv.beginPath();
    cv.arc(this.x,this.y,this.radio,0,Math.PI*2);
    cv.fill();
    cv.closePath();
  }

  selectThis(event){
    return this.radio>=( Math.sqrt(Math.pow((event.clientX - this.x),2)+Math.pow((event.clientY - this.y),2)));
  }
}
