var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var objetos = [];
var objetosSeleccionados = [];


var circulo = new Circulo(100,100,100,'black',true);
var circulo1 = new Circulo(600,300,100,'red',false);
// var circulo2= new Circulo(250,350,100,'blue');
var rectangulo = new Rectangulo(250,350,120,100,'blue')
objetos.push(circulo,rectangulo,circulo1);
for (var i = 0; i < objetos.length; i++) {
  objetosSeleccionados[i] = false;
}
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
    if(objetos[i].selectThis(event,canvas)){
      objetosSeleccionados[i] = true;
      objetos[i].inicioX = event.clientX - objetos[i].x;
      objetos[i].inicioY = event.clientY - objetos[i].y;
    }
  }
}

canvas.onmousemove = function (event) {
    for (var i = 0; i < objetosSeleccionados.length; i++) {
      if(objetosSeleccionados[i]){
        objetos[i].x = event.clientX - objetos[i].inicioX;
        objetos[i].y = event.clientY - objetos[i].inicioY;
        actualizar();
      }
    }
}

canvas.onmouseup = function (event) {
  for (var i = 0; i < objetosSeleccionados.length; i++) {
    objetosSeleccionados[i] = false;
  }
}
