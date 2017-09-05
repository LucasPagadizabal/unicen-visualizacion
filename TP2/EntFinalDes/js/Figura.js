class Figura {

  constructor(puntos,tipo) {
    this.tipo = tipo
    this.inicioX =0;
    this.inicioY =0;
    this.r = 20;
    this.n = puntos;
    this.f = Math.PI / this.n * 2;
    this.x = 100;
    this.y = 300;
    this.estado = false;
  }

  draw(){
    ctx.beginPath();
		ctx.strokeStyle = 'black';
		var fx, fy;
		for (var i = 0; i < this.n; i++) {
			var x = this.r * Math.cos(i * this.f) + this.x;
			var y = this.r * Math.sin(i * this.f) + this.y;
			if (i > 0) {
				ctx.lineTo(x, y);
			} else {
				fx = x;
				fy = y;
			}
			ctx.moveTo(x, y);
		}
		ctx.lineTo(fx, fy);
		ctx.lineWidth = 4;
		ctx.stroke();
  }

  selectThis(){
    return true;
  }
  equals (){
    return true;
  }
}
