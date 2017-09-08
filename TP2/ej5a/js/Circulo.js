
class Circulo {

  constructor(x,y,radio,color,imagen) {
    this.inicioX = 0;
    this.inicioY = 0;
    this.x=x;
    this.y=y;
    this.radio = radio;
    this.color=color;
    this.imagen = imagen;
  }

  draw(img) {
      var img = ctx.createPattern(this.imagen,'repeat');
      console.log(img);
      ctx.fillStyle =this.imagen;
      ctx.rect(Math.floor(this.x),Math.floor(this.y),100,100);
      ctx.fill();
    // ctx.drawImage(this.image, 0, 0);
    // cv.fillStyle = this.color;
    // cv.beginPath();
    // cv.arc(this.x,this.y,this.radio,0,Math.PI*2);
    // cv.fill();
    // cv.closePath();
  }


  selectThis(event){
    return this.radio>=( Math.sqrt(Math.pow((event.clientX - this.x),2)+Math.pow((event.clientY - this.y),2)));
  }
}
