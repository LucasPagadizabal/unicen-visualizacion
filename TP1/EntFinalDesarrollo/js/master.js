//filtros
// negativo--
// greyscale
// sepia(variantes)--
// binarizacion
// brillo
// ------
// saturacion
// suavizado
// deteccion bordes
// blur


function selectImg() {
  document.getElementById('btn-selectImg').click();
}

var ctx = document.getElementById("canvas").getContext("2d");
var width = ctx.canvas.width;
var heigth = ctx.canvas.heigth;

var imagen = new Image();
imagen.src ="truck.jpg";
imagen.onload = function () {
  myDrawImage(this);
}

 function cargaImg() {
   var imagen = new Image();
   imagen.src =document.getElementById('btn-selectImg').files[0].name;
   console.log(imagen.src);
   imagen.onload = function () {
     myDrawImage(this);
   }
 }

 function myDrawImage(imagen) {
   ctx.drawImage(imagen,0,0);
 }

 //Filtro Blanco y Negro
 function filtroBN() {
   imageData = ctx.getImageData(0,0,imagen.width,imagen.height);

   for (var i = 0; i < imagen.width; i++) {
     for (var j = 0; j < imagen.height; j++) {
       var colorBN =  Math.floor(getRed(imageData,i,j)+getGreen(imageData,i,j)+getBlue(imageData,i,j) /3);//tomo el color negro del px
       setPixel(imageData,i,j,colorBN,colorBN,colorBN,255);
     }
   }
    ctx.putImageData(imageData,0,0);
 }

 //Filtro Negativo
 function negativo() {
    var imageData = ctx.getImageData(0,0,imagen.width,imagen.height);
     for (var i=0;i<imageData.data.length;i+=4){
          imageData.data[i]=255-imageData.data[i];
          imageData.data[i+1]=255-imageData.data[i+1];
          imageData.data[i+2]=255-imageData.data[i+2];
          imageData.data[i+3]=255;
    }
    ctx.putImageData(imageData,0,0);
 }

 //Filtro Sepia
 function sepia() {
   var imageData = ctx.getImageData(0,0,imagen.width,imagen.height);
   var pixeles = imageData.data;
   var cantPixel = imageData.width * imageData.height;
   for (var i = 0; i < cantPixel; i++) {
     var r = pixeles[i*4];
     var g = pixeles[i*4 + 1];
     var b = pixeles[i*4 + 2];

     pixeles[i*4] = 255 - r;
     pixeles[i*4 + 1] = 255 - g;
     pixeles[i*4 + 2] = 255 - b;

     pixeles[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
     pixeles[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
     pixeles[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
   }
   ctx.putImageData(imageData,0,0);

 }
//Filtro Binarizacion
function binarizacion() {
  var imageData = ctx.getImageData(0,0,imagen.width,imagen.height);
  var pixeles = imageData.data;
  var cantPixel = imageData.width * imageData.height;

  for (var i = 0; i < cantPixel; i++) {
    var r = pixeles[i*4];
    var g = pixeles[i*4 + 1];
    var b = pixeles[i*4 + 2];
    var gris =  (0.299 * r + 0.587 * g + 0.114 * b);

    if(gris < 128){
      pixeles[i*4] = 0;
      pixeles[i*4 + 1] = 0;
      pixeles[i*4 + 2]; 0;
    }else{
      pixeles[i*4] = 255;
      pixeles[i*4 + 1] = 255;
      pixeles[i*4 + 2]; 255;
    }
  }
  ctx.putImageData(imageData,0,0);
}

//Filtro Brillo
function brillo() {
  var imageData = ctx.getImageData(0,0,imagen.width,imagen.height);
  var pixeles = imageData.data;
  var cantPixel = imageData.width * imageData.height;
  for (var i = 0; i < cantPixel; i++) {
    // var r = pixeles[i*4];
    // var g = pixeles[i*4 + 1];
    // var b = pixeles[i*4 + 2];

    pixeles[ i * 4 ] += 90;
    pixeles[ i * 4 + 1 ] += 90;
    pixeles[ i * 4 + 2 ] += 90; 
  }
     ctx.putImageData(imageData,0,0);
}

 function getRed(imageData,x,y) {
   index = (x+y* imageData.width)*4;
   return imageData.data[index+0];
 }

 function getGreen(imageData,x,y) {
   index = (x+y* imageData.width)*4;
   return imageData.data[index+1];
 }

 function getBlue(imageData,x,y) {
   index = (x+y* imageData.width)*4;
   return imageData.data[index+2];
 }

 function setPixel(imageData,x,y,r,g,b,a) {

   var index = ( x + y * imageData.width)*4;
   imageData.data[index+0]=r;
   imageData.data[index+1]=g;
   imageData.data[index+2]=b;
   imageData.data[index+3]=a;
 }
