//paginado grilla

//***************************
const TOTAL_GRID = 12;
let tweets = [];

function cargarTweets(hash){
  

    
                $(".loader").hide();
                $("#panel-image").show(2000);


    for (var indice = 0; indice < TOTAL_GRID; indice++) {
       
        $("#carousel-image-"+indice).attr("src",'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg');
        $("#gallery-image-"+indice).attr("src",'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg');
        $("#fullscreen-image-"+indice).attr("src",'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg');
        
    }
                
                        
}

tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 0});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 1});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 2});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 3});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 4});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 5});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 6});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 7});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 8});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 90});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 10});
tweets.push({img: 'https://k31.kn3.net/taringa/0/C/1/2/0/0/KonahsFvZ/F6D.jpg' , like : 11});

function cleanImages(){
    for (var i = 0; i < TOTAL_GRID; i++) {
        $("#carousel-image-"+i).attr("src","default.png");
        $("#gallery-image-"+i).attr("src","default.png");
    }
}
//******************************

let search=false;
$("#btn-search").click(function() {
    if($("#text-search").val() != ''){
        cargarTweets($("#text-search").val());
    }

    if(!search){
        $('.transform').toggleClass('transform-active');
        $("#panel-search").height(580);
        $("#layout-grid").css({top:'2%'})
        $("#layout-carrousel").css({top:'2%'})
        $("#layout-play").css({top:'2%'})
        // $(".loader").show(2000);
        $("#panel-image").show(2000); //muestra la grilla de imagenes
        $("#layout-grid").show(2000);
        $("#layout-carrousel").show(2000);
        $("#layout-play").show(2000);
        $("hr").show();
        search = true;
    }
  });

  $('#myCarousel').carousel({
    interval: 5000
});

$("#layout-grid").click(function () {
    if(search){
        $("#carrousel").hide(2000);
        $("#grilla").show(1000);
    }
    layout = 'grid';
})
$("#layout-carrousel").click(function () {    
    if(search){
        $("#grilla").hide(2000);
        $("#carrousel").show(1000);
    }
    layout = 'carrousel';
})

//Handles the carousel thumbnails
$('[id^=carousel-selector-]').click(function () {
var id_selector = $(this).attr("id");
try {
var id = /-(\d+)$/.exec(id_selector)[1];
console.log(id_selector, id);
jQuery('#myCarousel').carousel(parseInt(id));
} catch (e) {
console.log('Regex failed!', e);
}
});
// When the carousel slides, auto update the text
$('#myCarousel').on('slid.bs.carousel', function (e) {
     var id = $('.item.active').data('slide-number');
    $('#carousel-text').html($('#slide-content-'+id).html());
});

// $("#likes").find("p").text('10');
//**************** fullscreen */
$("#section-fullscreen").css({'height' : $(window).height() , 'width': $(window).width()});
$("#containerImgFullScreen").css({'height' : $(window).height()-100 , 'width': $(window).width()-100});
let layout = 'grid';
let indiceImgFullScreen = 0;
let nextFullScreen;
$("#layout-play").click(function () {
    $("#imgFullScreen").attr("src",tweets[indiceImgFullScreen].img);
    $("#likes").find("p").text(tweets[indiceImgFullScreen].like);
    $("#section-fullscreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").show();
    layout='fullscreen';
    nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
});


/*exit fullscreen */
document.onkeydown = function(ev){
    if(ev.keyCode==27 && layout=='fullscreen'){
        $("#containerImgFullScreen").hide();
        // $("#containerImgFullScreen").css({'visibility': 'hidden'});
        $("#section-fullscreen").css({'visibility': 'hidden'});
        fullscreen='carrousel';
        clearInterval(nextFullScreen);
    }
}
$("#btn-exitFullScreen").click(function(){
    $("#containerImgFullScreen").hide();
    // $("#containerImgFullScreen").css({'visibility': 'hidden'});
    $("#section-fullscreen").css({'visibility': 'hidden'});
    fullscreen='carrousel';
    clearInterval(nextFullScreen);
});

// Movimientos fullscreen
let animacion = false;
$("#next").click(function () {
    if(!animacion){
       
        if(indiceImgFullScreen < tweets.length-1){
            indiceImgFullScreen++;
        }else{
            indiceImgFullScreen = 0;
        }    

        let num = Math.floor((Math.random() * 5) + 1);
        animaciones(num,indiceImgFullScreen);  
    }  
});

$("#prev").click(function () {
    if(!animacion){
       
        if(indiceImgFullScreen > 0){
            indiceImgFullScreen--;
        }else{
            indiceImgFullScreen = tweets.length-1;
        }    

        let num = Math.floor((Math.random() * 5) + 1);
        animaciones(num,indiceImgFullScreen);  
    }  
});

function animaciones(num,indice) {
    animacion = true;
    switch (num) {
        case 1:
            $("#likes").css({'opacity': '0'});
            $("#containerImgFullScreen").css({'top':'110%'});
            $("#containerImgFullScreen").bind("transitionend", function(){ 
                $("#imgFullScreen").attr('src',tweets[indice].img);
                $("#likes").find("p").text(tweets[indice].like);
                $("#containerImgFullScreen").css({'top':'8%'});
                $("#likes").css({'opacity': '1'});
                animacion = false;
            });
            break;

        case 2:
        $("#likes").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#containerImgFullScreen").css({'opacity':'1'}); 
             $("#likes").css({'opacity': '1'});
             animacion = false;
        });
            break;

        case 3:
        $("#likes").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'left':'110%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'left':'4%'}); 
            $("#likes").css({'opacity': '1'});
            animacion = false;
        });
            break;

        case 4:
        $("#likes").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'width':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'width': $(window).width()-100});
            $("#likes").css({'opacity': '1'});
            animacion = false;
        });
            break;

         case 5:
         $("#likes").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'height':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'height': $(window).height()-100});
            $("#likes").css({'opacity': '1'});
            animacion = false;
        });
            break;
        default:
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#containerImgFullScreen").css({'opacity':'1'}); 
             animacion = false;
        });
            break;
    }
}

$("#icon").click(function () {
    location.reload();
})

$(".grilla").click(function () {
    $("#layout-play").click();
});

$(".item").click(function () {
    $("#layout-play").click();
});

$("#icon").click(function () {
    location.reload();
})

