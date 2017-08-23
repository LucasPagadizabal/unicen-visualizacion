//filtros
// negativo--
// greyscale
// sepia(variantes)--
// binarizacion--
// brillo--
// ------
//sharpen---
//repujado
// saturacion--
// suavizado
// deteccion bordes
// blur---

var imgOrigin = null;//tomamos la img original
var srcOrigin = "images/paisaje.jpg";
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

 function saturacion() {
   myDrawImage(imgOrigin);
   var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

   for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
          var r = getRed(imageData,x,y);
          var g = getGreen(imageData,x,y);
          var b = getBlue(imageData,x,y);
          var hsl = rgbToHsl(r,g,b);//pasaje de rgb a hsl
          hsl[1] = 0.7;//saturacion de pixel
          var rgb = hslToRgb(hsl[0],hsl[1],hsl[2]);
          setPixel(imageData,x,y,rgb[0],rgb[1],rgb[2],255);
        }
      }
      ctx.putImageData(imageData,0,0);
 }

 function rgbToHsl(r, g, b) {
   r /= 255, g /= 255, b /= 255;

   var max = Math.max(r, g, b), min = Math.min(r, g, b);
   var h, s, l = (max + min) / 2;

   if (max == min) {
     h = s = 0; // achromatic
   } else {
     var d = max - min;
     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

     switch (max) {
       case r: h = (g - b) / d + (g < b ? 6 : 0); break;
       case g: h = (b - r) / d + 2; break;
       case b: h = (r - g) / d + 4; break;
     }

     h /= 6;
   }
   return [ h, s, l ];
 }

 function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

function createImageData(w,h){
    return ctx.createImageData(w,h);
}

function difumado() {
  myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var a = convolute(imageData,[1 / 9, 1 / 9, 1 / 9,1 / 9, 1 / 9, 1 / 9,1 / 9, 1 / 9, 1 / 9]);
  ctx.putImageData(a,0,0);
}

function sharpen() {
  myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var a = convolute(imageData,[  0, -1,  0,-1,  5, -1,0, -1,  0 ]);
  ctx.putImageData(a,0,0);
}

function reputed() {
  myDrawImage(imgOrigin);
  var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var a = convolute(imageData,[  -2, -1,  0,-1,  1, 1,0, 1,  2 ]);
  ctx.putImageData(a,0,0);
}

function convolute (pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};
