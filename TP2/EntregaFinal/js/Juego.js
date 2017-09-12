var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

//dificultades del juego
const FACIL = 8;
const MEDIO = 12;
const DIFICIL = 16;7

var tablero;
var objectoSelect;

function loadPage() {//carga de la pagina del juego
  tablero = new Tablero();
  objectoSelect = null;
  tablero.cargar();
  tablero.draw(FACIL);
}

function jugar() {//funcion que da inicio al juego
  run();
  $("#btn-jugar").prop("disabled",true);
  $("#dificultadFacil").prop("disabled",true);
  $("#dificultadMedio").prop("disabled",true);
  $("#dificultadDificil").prop("disabled",true);
  tablero.setMov();
}

canvas.onmousedown = function (event) {
  for (var i = 0; i < tablero.figuras.length; i++) {
    if(tablero.figuras[i].selectThis(event,canvas) && tablero.figuras[i].estado){
      tablero.figuras[i].inicioX = event.clientX - tablero.figuras[i].x;
      tablero.figuras[i].inicioY = event.clientY - tablero.figuras[i].y;
      objectoSelect = tablero.figuras[i];
      tablero.figuras.splice(i,1);
      tablero.figuras.push(objectoSelect);//paso la figura seleccionada a la ultima posicion asi no se superpone con otras figuras
      break;
    }
    if(tablero.cirRestart.selectThis(event,canvas)){//restart al juego
      $("#btn-jugar").prop("disabled",false);
      $("#dificultadFacil").prop("disabled",false);
      $("#dificultadMedio").prop("disabled",false);
      $("#dificultadDificil").prop("disabled",false);
      stop();
      clearTime();
      loadPage();
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
    if(tablero.encastres[i].selectThis(event,canvas) && !tablero.encastres[i].estado && tablero.encastres[i].equals(objectoSelect)&&!tablero.encastresCompletos[i]){
      objectoSelect.x = tablero.encastres[i].x;
      objectoSelect.y = tablero.encastres[i].y;
      objectoSelect.estado = !objectoSelect.estado;
      tablero.encastrados += 1 ;
      tablero.encastresCompletos[i] = true;
      tablero.draw(tablero.dificultad);
      if(tablero.completo()){
        //bloquear el btn jugar
        stop();
        tablero.setMov();
        setTimeout(function() {   tablero.victory(); }, 800);
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

var imgRestart = new Image();
var imagenes = [];
window.onload = function(){//esta funcion carga las imagenes para ser utilizadas por las figuras
  imgRestart.src = "images/restart.jpg";
  var imagenesCargadas = 0;
  var cantImagenes = 5;

  for (var i = 1; i <= cantImagenes; i++) {
    var imagen = new Image();
    imagen.src = "images/" + i +".png";
    imagen.onload = function () {
      imagenes.push(this);
      imagenesCargadas++;
      if(imagenesCargadas == cantImagenes){
        loadPage();
      }
    }
  }
}
