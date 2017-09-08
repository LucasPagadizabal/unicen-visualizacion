var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const FACIL = 8;
const MEDIO = 12;
const DIFICIL = 16;

let tablero = new Tablero();

tablero.cargar();
let objectoSelect = null;
tablero.draw(FACIL);

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

    }
  }
  objectoSelect = null;
}
