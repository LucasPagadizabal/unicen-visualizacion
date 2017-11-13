//***************************
const TOTAL_GRID = 12;
let cb = new Codebird;
cb.setProxy("https://cb-proxy.herokuapp.com/");
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
             if(reply.httpstatus == 0){
                 //mostrar error
                 $(".loader").hide();
                 $(".loaderFail").show();
             }else{
                 //mostrar grilla
                 $('#ul-grilla').empty();
                 tweets = [];
                 url_img = [];
                 for (var i = 0; i < reply.statuses.length; i++) {
                     if(!reply.statuses[i].retweeted && reply.statuses[i].entities.media != undefined ){//&& indice<TOTAL_GRID

                         if(!url_img.includes(reply.statuses[i].entities.media[0].media_url)){
                            
                             $("#fullscreen-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                             url_img.push(reply.statuses[i].entities.media[0].media_url);
                             tweets.push({img: reply.statuses[i].entities.media[0].media_url,
                                             like: reply.statuses[i].favorite_count});
                            if(indice<TOTAL_GRID){
                                createImgGrilla(indice,reply.statuses[i].entities.media[0].media_url);                                
                            }
                             indice++
                         }
                     }  
                 }
                 $(".loader").hide();
                 $("#panel-image").show(2000);
                 if (tweets.length > TOTAL_GRID) {
                     $("#next-grilla").show();
                     $("#prev-grilla").show();
                 }
             }
         }
     );    
}
function cleanImages(){
    for (var i = 0; i < TOTAL_GRID; i++) {
        // $("#gallery-li-"+i).hide();
        $("#gallery-image-"+i).attr("src","default.png");
    }
}

function createImgGrilla(id,src) {
    let li = $('<li id="gallery-li-'+id+'" class="col-sm-3 col-md-3"> <a class="thumbnail grilla" id="carousel-selector-'+id+'"><img class="img-responsive" id="gallery-image-'+id+'" src="'+src+'"></a></li>').on('click',function () {
        $("#imgFullScreen").attr("src",tweets[id].img);
        $("#likes").find("p").text(tweets[id].like);
        $("#section-fullscreen").css({'visibility': 'visible'});
        $("#containerImgFullScreen").css({'visibility': 'visible'});
        $("#containerImgFullScreen").show();
        layout='fullscreen';
        nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
    });
    $('#ul-grilla').append(li); 
}
let pageNumberGrilla = 0;
$("#next-grilla").click(function () {
    if (pageNumberGrilla<tweets.length-TOTAL_GRID) {
        pageNumberGrilla+=TOTAL_GRID;
    }else{
        pageNumberGrilla = 0;
    }
    pageGrilla(pageNumberGrilla);
});

$("#prev-grilla").click(function () {
    
    if (pageNumberGrilla>TOTAL_GRID) {
        pageNumberGrilla=pageNumberGrilla -TOTAL_GRID;
    }else{
        pageNumberGrilla = 96;
        while (pageNumberGrilla > tweets.length) {
            pageNumberGrilla  = pageNumberGrilla -12;
        }
    }
    pageGrilla(pageNumberGrilla);
})

function pageGrilla(inicio){
    $('#ul-grilla').empty(); 
    for (var i = inicio; i < inicio + TOTAL_GRID; i++) {
        if(i< tweets.length){
            createImgGrilla(i,tweets[i].img);
        }
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
        $("#panel-search").height($(window).height()-120);
        $(".hide-bullets").height($(window).height()-120);
        $("#layout-grid").css({top:'2%'})
        $("#layout-carrousel").css({top:'2%'})
        $("#layout-play").css({top:'2%'})
        $(".loader").show(2000);
        // $("#panel-image").show(2000); muestra la grilla de imagenes
        $("#layout-grid").show(2000);
        $("#layout-carrousel").show(2000);
        $("#layout-play").show(2000);
        $("hr").show();
        search = true;
    }else{
        $("#next-grilla").hide();
        $("#prev-grilla").hide();
        $("#panel-image").hide();
        $(".loader").show(1000);
    }
  });

  $('#myCarousel').carousel({
    interval: 5000
});

$("#layout-grid").click(function () {
    if(search){
        $("#prev-carrousel").hide();
        $("#next-carrousel").hide();
        $("#container-carrousel").hide(2000);
        $("#grilla").show(1000);
    }
    layout = 'grid';
})

let indiceImgCarrousel = 0;
$("#layout-carrousel").click(function () {    
    if(search){
        $("#grilla").hide(2000);
        // $("#carrousel").show(1000);
        $("#img-carrousel").attr("src",tweets[indiceImgCarrousel].img);
        $("#img-carrousel").attr("data-img",indiceImgCarrousel); 
        $("#container-carrousel").show(1000);
        $("#prev-carrousel").show();
        $("#next-carrousel").show();
    }
    layout = 'carrousel';
})

//move carrousel
$("#next-carrousel").click(function () {
    if(indiceImgCarrousel < tweets.length-1){
        indiceImgCarrousel++;
    }else{
        indiceImgCarrousel = 0;
    }
    $("#img-carrousel").css({'opacity':'0'});
    $("#img-carrousel").bind("transitionend", function(){ 
        $("#img-carrousel").attr("src",tweets[indiceImgCarrousel].img);   
        $("#img-carrousel").attr("data-img",indiceImgCarrousel);
        $("#img-carrousel").css({'opacity':'1'});
    });
});

$("#prev-carrousel").click(function () {
    if(indiceImgCarrousel > 0){
        indiceImgCarrousel--;
    }else{
        indiceImgCarrousel = tweets.length-1;
    }    
    $("#img-carrousel").css({'opacity':'0'});
    $("#img-carrousel").bind("transitionend", function(){ 
        $("#img-carrousel").attr("src",tweets[indiceImgCarrousel].img);  
        $("#img-carrousel").attr("data-img",indiceImgCarrousel);  
        $("#img-carrousel").css({'opacity':'1'});
    }); 
});
//end move carrousel

//show fullscreen - click carrousel
$('#img-carrousel').click(function () {
    let indice = $(this)[0].dataset.img;
    $("#imgFullScreen").attr("src",tweets[indice].img);
    $("#likes").find("p").text(tweets[indice].like);
    $("#section-fullscreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").show();
    layout='fullscreen';
    nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
});


//show fullscreen - click in grilla 
// $('[id^=carousel-selector-]').click(function () {
// var id_selector = $(this).attr("id");
// var id = /-(\d+)$/.exec(id_selector)[1];
// $("#imgFullScreen").attr("src",tweets[id].img);
// $("#likes").find("p").text(tweets[id].like);
// $("#section-fullscreen").css({'visibility': 'visible'});
// $("#containerImgFullScreen").css({'visibility': 'visible'});
// $("#containerImgFullScreen").show();
// layout='fullscreen';
// nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
// });


//**************** fullscreen */
let nextFullScreen;
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
    nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
});


/*exit fullscreen */
document.onkeydown = function(ev){
    if(ev.keyCode==27 && layout=='fullscreen'){
        $("#containerImgFullScreen").hide();       
        $("#section-fullscreen").css({'visibility': 'hidden'});
        fullscreen='carrousel';
        clearInterval(nextFullScreen);
    }
}
$("#btn-exitFullScreen").click(function(){
    $("#containerImgFullScreen").hide();
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

        let num = Math.floor((Math.random() * 4) + 1);
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

        let num = Math.floor((Math.random() * 4) + 1);
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
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'top': '-100%'});
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#containerImgFullScreen").css({'opacity':'1'});
             $("#likes").css({'visibility': 'visible'});
             $("#likes").css({'top': '80%'});
             animacion = false;
        });
            break;

        case 3:
        $("#likes").find('p').hide();
        $("#likes").css({'width': '0px', 'height':'0px'});
        $("#containerImgFullScreen").css({'left':'110%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'left':'4%'}); 
            $("#likes").css({'width': '150px', 'height':'70px'});
            $("#likes").find('p').show(700);
            animacion = false;
        });
            break;

        case 4:
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'left': '-100%'});
        $("#containerImgFullScreen").css({'width':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#containerImgFullScreen").css({'width': $(window).width()-100});
            $("#likes").css({'visibility': 'visible'});
            $("#likes").css({'left': '80%'});
            animacion = false;
        });
            break;
        default:
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'top': '-100%'});
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#containerImgFullScreen").css({'opacity':'1'});
             $("#likes").css({'visibility': 'visible'});
             $("#likes").css({'top': '80%'}); 
             animacion = false;
        });
            break;
    }
}