var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var circulo = new Circulo(725,75,50,"Gray",false);
var rectangulo = new Rectangulo(665,155,115,75,'Gray',false);
var cuadrado =  new Cuadrado(675,265,95,'Gray',false);

var circuloMove = new Circulo(100,215,50,"Black",true);
var rectanguloMov = new Rectangulo(200,180,120,75,'Black',true);
var cuadradoMov = new Cuadrado(400,170,100,'Black',true);

// var imgTriangulo = new Image();
// imgTriangulo.src = "images/trian.png"
// var trianguloMov = new Triangulo(350,300,imgTriangulo,true)


var objetos = [];
var objectoSelect = null;
objetos.push(cuadrado,circulo,rectangulo,circuloMove,cuadradoMov,rectanguloMov);

function actualizar() {
  ctx.fillStyle = "#e7af34";
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
      objectoSelect.x = objetos[i].x;
      objectoSelect.y = objetos[i].y;
      objectoSelect.estado = !objectoSelect.estado;
      actualizar();
      if(control()){
        win();
      }
      break;
    }else {
      //Figura distinta
      console.log("distintafigura");
    }
  }
  objectoSelect = null;
}

function control() {
  for (var i = 0; i < objetos.length; i++) {
    if(objetos[i].estado){
      return false;
    }
  }
  return true;
}
