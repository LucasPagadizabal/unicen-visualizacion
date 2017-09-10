var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const FACIL = 8;
const MEDIO = 12;
const DIFICIL = 16;

var tablero = new Tablero();
var objectoSelect = null;


function jugar() {
  run();
  tablero.setMov();
}
canvas.onmousedown = function (event) {
  for (var i = 0; i < tablero.figuras.length; i++) {
    if(tablero.figuras[i].selectThis(event,canvas) && tablero.figuras[i].estado){
      tablero.figuras[i].inicioX = event.clientX - tablero.figuras[i].x;
      tablero.figuras[i].inicioY = event.clientY - tablero.figuras[i].y;
      objectoSelect = tablero.figuras[i];
      tablero.figuras.splice(i,1);
      tablero.figuras.push(objectoSelect);
      break;
    }
  }
}

canvas.onmousemove = function (event) {
    if(objectoSelect != null){
        objectoSelect.x = event.clientX - objectoSelect.inicioX;
        objectoSelect.y = event.clientY - objectoSelect.inicioY;
        tablero.draw(tablero.dificultad);
    }
}

canvas.onmouseup = function (event) {
  for (var i = 0; i < tablero.dificultad; i++) {
    if(tablero.encastres[i].selectThis(event,canvas) && !tablero.encastres[i].estado && tablero.encastres[i].equals(objectoSelect)){
      objectoSelect.x = tablero.encastres[i].x;
      objectoSelect.y = tablero.encastres[i].y;
      objectoSelect.estado = !objectoSelect.estado;
      tablero.encastrados += 1 ;
      tablero.draw(tablero.dificultad);
      if(tablero.completo()){
        console.log("ganar");
        stop();
      }
      break;
    }else {
      //Figura distinta
      objectoSelect.setPosInicial();
      tablero.draw(tablero.dificultad);
    }
  }
  objectoSelect = null;
}

var imagenes = [];
window.onload = function(){//esta funcion carga las imagenes para ser utilizadas por las figuras
  var imagenesCargadas = 0;
  var cantImagenes = 7;

  for (var i = 1; i <= cantImagenes; i++) {
    var imagen = new Image();
    imagen.src = "images/" + i +".png";
    imagen.onload = function () {
      imagenes.push(this);
      imagenesCargadas++;
      if(imagenesCargadas == cantImagenes){
        tablero.cargar();
        tablero.draw(FACIL);
      }
    }
  }
}
