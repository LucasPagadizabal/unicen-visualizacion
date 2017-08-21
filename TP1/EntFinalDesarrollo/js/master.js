//filtros
// negativo--
// greyscale
// sepia(variantes)--
// binarizacion--
// brillo
// ------
// saturacion
// suavizado
// deteccion bordes
// blur
var imgOrigin = null;//tomamos la img original
var srcOrigin = "images/girl.jpg";
var ctx = document.getElementById("canvas").getContext("2d");
var ctrCargaImg = false;
function loadImgDefault() {
  // Carga de imagen por defecto
  var imagenDefault = new Image();
  imagenDefault.src =srcOrigin;
  imgOrigin = imagenDefault;
  imagenDefault.onload = function () {
    myDrawImage(this);
  }
}
loadImgDefault();

function selectImg() {
  ctrCargaImg = true;
  document.getElementById('btn-selectImg').click();
}

//Funcion para la carga de imagenes
 function cargaImg() {
   if (ctrCargaImg) {
     var imagen = new Image();
     imagen.src =document.getElementById('btn-selectImg').files[0].name;
     srcOrigin = imagen.src;
     imgOrigin = imagen;
     imagen.onload = function () {
       myDrawImage(this);
     }
     loadImgDefault();
   }else{
     loadImgDefault();
   }
 }

 function myDrawImage(imagen) {//funcion que dibuja la imagen en el canvas
   ctx.drawImage(imagen,0,0);
 }

 //Filtro Blanco y Negro
 function filtroBN() {
   myDrawImage(imgOrigin);
   var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

  for (var i = 0; i < imageData.height; i++) {
        for (var j = 0; j < imageData.width; j++) {
            var pos = (i * 4) * imageData.width + j * 4;
            var rgb = (imageData.data[pos] + imageData.data[pos + 1] + imageData.data[pos + 2]) / 3;
            imageData.data[pos] = rgb;
            imageData.data[pos + 1] = rgb;
            imageData.data[pos + 2] = rgb;
        }
    }
    ctx.putImageData(imageData,0,0);
 }

 //Filtro Negativo
 function negativo() {
    myDrawImage(imgOrigin);
    var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

    for (var y = 0; y < imageData.height; y++) {
       for (var x = 0; x < imageData.width; x++) {
           setPixel(imageData, x, y, 255 - getRed(imageData, x, y), 255 - getBlue(imageData, x, y), 255 - getGreen(imageData, x, y), 255);
       }
   }
   ctx.putImageData(imageData,0,0);
 }

 //Filtro Sepia
 function sepia() {
   myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  for (var y = 0; y < imageData.height; y++) {
       for (var x = 0; x < imageData.width; x++) {

           var red = (getRed(imageData, x, y) * .393) + (getGreen(imageData, x, y) * .769) + (getBlue(imageData, x, y) * .189);
           var green = (getRed(imageData, x, y) * .349) + (getGreen(imageData, x, y) * .686) + (getBlue(imageData, x, y) * .168);
           var blue = (getRed(imageData, x, y) * .272) + (getGreen(imageData, x, y) * .534) + (getBlue(imageData, x, y) * .131);

           setPixel(imageData, x, y, red, green, blue, 255);
       }
   }
   ctx.putImageData(imageData,0,0);

 }
//Filtro Binarizacion
function binarizacion() {
  myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

  for (var y = 0; y < imageData.height; y++) {
       for (var x = 0; x < imageData.width; x++) {
           var rgb = (getRed(imageData, x, y) + getGreen(imageData, x, y) + getBlue(imageData, x, y)) / 3;
           if (rgb > 128) {
               setPixel(imageData, x, y, 0, 0, 0, 255);
           }
           else {
               setPixel(imageData, x, y, 255, 255, 255, 255);
           }

       }
   }
  ctx.putImageData(imageData,0,0);
}

//Filtro Brillo
function brillo() {
    myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

  for (var y = 0; y < imageData.height; y++) {
       for (var x = 0; x < imageData.width; x++) {
         var r = getRed(imageData,x,y) +90;
         var g = getGreen(imageData,x,y)+90;
         var b = getBlue(imageData,x,y)+90;
         setPixel(imageData,x,y,r,g,b,255);
       }
     }
  // var pixeles = imageData.data;
  // var cantPixel = imageData.width * imageData.height;
  // for (var i = 0; i < cantPixel; i++) {
  //   // var r = pixeles[i*4];
  //   // var g = pixeles[i*4 + 1];
  //   // var b = pixeles[i*4 + 2];
  //
  //   pixeles[ i * 4 ] += 90;
  //   pixeles[ i * 4 + 1 ] += 90;
  //   pixeles[ i * 4 + 2 ] += 90;
  // }
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

 function save() {
   ctx.toDataURL("image/png");
 }
