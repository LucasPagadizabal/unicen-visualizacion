class Tablero {
  constructor() {
    this.encastres = [];
    this.figuras = [];
    this.dificultad = FACIL;
    this.encastrados = 0;
  }


  cargar(){
    var c1 = new Circulo(625,75,50,"Gray",false,null);//fila 1
    var c2 = new Circulo(365,197,50,'Gray',false,null);//fila 2
    var c4 = new Circulo(235,435,50,"Gray",false,null);//fila 3
    var c3 = new Circulo(495,320,50,"Gray",false,null);//fila 4

    var t1 = new Triangulo(195,130,95,'Gray',false,null);//fila 1
    var t2 = new Triangulo(446, 240, 95, 'Gray' ,false,null);//fila 2
    var t3 = new Triangulo(580,480,95,'Gray',false,null);//fila 4

    var r1 = new Rectangulo(312,40,115,80,'Gray',false,null);//fila 1
    var r2 = new Rectangulo(565,155,115,80,'Gray',false,null);//fila 2
    var r3 = new Rectangulo(180,275,115,80,'Gray',false,null)//fila 3

    var cua1 =  new Cuadrado(318,265,95,'Gray',false,null);//fila 3
    var cua2 =  new Cuadrado(450,395,95,'Gray',false,null);//fila 4


    var p1 = new Pentagono(473,30,50,'Gray',false,null);//fila 1
    var p2 = new Pentagono(214,151,50,'Gray',false,null);//fila 2
    var p3 = new Pentagono(600,266,50,'Gray',false,null);//fila 3
    var p4 = new Pentagono(342,385,50,'Gray',false,null);//fila 4

    this.encastres.push(c1,t1,r1,p1,c2,t2,r2,p2,c3,r3,cua1,p3,c4,t3,cua2,p4);

    var c1M = new Circulo(73,250,50,"rgba(246,199,153,1)",false,imagenes[0]);
    var c2M = new Circulo(73,250,50,"rgba(246,199,153,1)",false,imagenes[0]);
    var c3M = new Circulo(73,250,50,"rgba(246,199,153,1)",false,imagenes[0]);
    var c4M = new Circulo(73,250,50,"rgba(246,199,153,1)",false,imagenes[0]);


    var r1M = new Rectangulo(17,5,120,80,"rgba(246,199,153,1)",false,imagenes[2]);
    var r2M = new Rectangulo(17,5,120,80,"rgba(246,199,153,1)",false,imagenes[2]);
    var r3M = new Rectangulo(17,5,120,80,"Yellow",false,imagenes[2]);


    var cuad1M = new Cuadrado(21,310,100,"rgba(246,199,153,1)",false,imagenes[1]);
    var cuad2M = new Cuadrado(21,310,100,"rgba(246,199,153,1)",false,imagenes[1]);


    var t1M = new Triangulo(23, 510, 95,"rgba(246,199,153,01",false,imagenes[6]);
    var t2M = new Triangulo(23, 510, 95,"rgba(246,199,153,1)",false,imagenes[6]);
    var t3M = new Triangulo(23, 510, 95,"rgba(246,199,153,1)",false,imagenes[6]);

    var p4M = new Pentagono(47,92,50,"rgba(246,199,153,1)",false,imagenes[4]);
    var p3M = new Pentagono(47,92,50,"rgba(246,199,153,1)",false,imagenes[4]);
    var p2M = new Pentagono(47,92,50,"rgba(246,199,153,1)",false,imagenes[4]);
    var p1M = new Pentagono(47,92,50,"rgba(246,199,153,1)",false,imagenes[4]);

    this.figuras.push(c1M,c2M,c3M,c4M,r1M,r2M,r3M,cuad1M,cuad2M,t1M,t2M,t3M,p4M,p3M,p2M,p1M);

  }

  draw(dificultad){
    this.dificultad = dificultad;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(198,118,19,0.7)";
    ctx.fillRect(0,0, 150, canvas.height);
    ctx.fillStyle = "rgba(160,160,160,0.7)";
    ctx.fillRect(150,0, canvas.width, canvas.height);
    for (var i = 0; i < dificultad; i++) {
      this.encastres[i].draw(ctx);
    }
    for (var i = 0; i < this.figuras.length; i++) {
      this.figuras[i].draw(ctx)
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setMov(){
    for (var i = 0; i < this.figuras.length; i++) {
      this.figuras[i].estado = true;
    }
  }

  completo(){
    return this.dificultad == this.encastrados;
  }
}
