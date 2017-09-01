class Rectangulo {

  constructor(x,y,a,b,color) {
    if(a<b || b<a){
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

  selectThis(event,canvas){
    return  (this.x < event.clientX - canvas.offsetLeft) && (this.a + this.x > event.clientX - canvas.offsetLeft) && (this.y < event.clientY - canvas.offsetTop) && (this.b + this.y > event.clientY-canvas.offsetTop);
  }
}
