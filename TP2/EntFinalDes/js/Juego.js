var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var circuloMove = new Circulo(100,100,25,"Gray",false);
var circulo = new Circulo(100,175,25,"Black",true);
var rectanguloMov = new Rectangulo(150,75,70,50,'Gray',false);
var rectangulo = new Rectangulo(150,150,70,50,'Black',true);
var cuadradoMov = new Cuadrado(250,75,50,'Gray',false);
var cuadrado =  new Cuadrado(250,150,50,'Black',true);

// var imgTriangulo = new Image();
// imgTriangulo.src = "images/trian.png"
// var trianguloMov = new Triangulo(350,300,imgTriangulo,true)


var objetos = [];
var objectoSelect = null;
objetos.push(circuloMove,circulo,rectanguloMov,rectangulo,cuadrado,cuadradoMov);//trianguloMov

function actualizar() {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0,0,canvas.width,canvas.height)
  for (var i = 0; i < objetos.length; i++) {
    objetos[i].draw(ctx);
  }
}
actualizar();

canvas.onmousedown = function (event) {
  for (var i = 0; i < objetos.length; i++) {
    if(objetos[i].selectThis(event,canvas) && objetos[i].estado){
      objetos[i].inicioX = event.clientX - objetos[i].x;
      objetos[i].inicioY = event.clientY - objetos[i].y;
      objectoSelect = objetos[i];
      break;
    }
  }
}

canvas.onmousemove = function (event) {
    if(objectoSelect != null){
        objectoSelect.x = event.clientX - objectoSelect.inicioX;
        objectoSelect.y = event.clientY - objectoSelect.inicioY;
        actualizar();
    }
}

canvas.onmouseup = function (event) {
  for (var i = 0; i < objetos.length; i++) {
    if(objetos[i].selectThis(event,canvas) && !objetos[i].estado && objetos[i].equals(objectoSelect)){
      //Misma figura
      console.log("mismafigura");
      break;
    }else {
      //Figura distinta
      console.log("distintafigura");
    }
  }
  objectoSelect = null;
}
