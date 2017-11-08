//paginado grilla

//***************************
const TOTAL_GRID = 12;
let cb = new Codebird;
let contenedor = $('#contenedor');
cb.setConsumerKey(key, keySecret);
cb.setToken(token, tokenSecret);
let tweets = [];

function cargarTweets(hash){
    cleanImages();
    let indice = 0;
    let params = {
        q: "#"+hash,
        count: 100//,
        // result_type:'popular'
    }
   
    cb.__call(
        "search_tweets",
        params,
        function (reply) {
            console.log(reply.httpstatus);
            if(reply.httpstatus == 0){
                //mostrar error
                $(".loader").hide();
                $(".loaderFail").show();
            }else{
                //mostrar grilla
                $(".loader").hide();
                $("#panel-image").show(2000);
                tweets = [];
                url_img = [];
                for (var i = 0; i < reply.statuses.length; i++) {
                    if(!reply.statuses[i].retweeted && reply.statuses[i].entities.media != undefined && indice<TOTAL_GRID){

                        if(!url_img.includes(reply.statuses[i].entities.media[0].media_url)){
                            $("#carousel-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                            $("#gallery-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                            $("#fullscreen-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                            url_img.push(reply.statuses[i].entities.media[0].media_url);
                            tweets.push({img: reply.statuses[i].entities.media[0].media_url,
                                            like: reply.statuses[i].favorite_count});
                            indice++
                        }
                    }  
                }
            }
        }
    );
}

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
        $("#panel-search").height(560);
        $("#layout-grid").css({top:'2%'})
        $("#layout-carrousel").css({top:'2%'})
        $("#layout-play").css({top:'2%'})
        $(".loader").show(2000);
        // $("#panel-image").show(2000); muestra la grilla de imagenes
        $("#layout-grid").show(2000);
        $("#layout-carrousel").show(2000);
        $("#layout-play").show(2000);
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
$("#layout-play").click(function () {
    $("#imgFullScreen").attr("src",tweets[indiceImgFullScreen].img);
    $("#likes").find("p").text(tweets[indiceImgFullScreen].like);
    $("#section-fullscreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").show();
    layout='fullscreen';
    let nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
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
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#containerImgFullScreen").css({'opacity':'1'}); 
             animacion = false;
        });
            break;

        case 3:
        $("#containerImgFullScreen").css({'left':'110%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'left':'4%'}); 
            animacion = false;
        });
            break;

        case 4:
        $("#containerImgFullScreen").css({'width':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'width': $(window).width()-100});
            animacion = false;
        });
            break;

         case 5:
        $("#containerImgFullScreen").css({'height':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'height': $(window).height()-100});
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