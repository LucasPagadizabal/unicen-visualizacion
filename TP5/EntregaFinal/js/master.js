//***************************
const TOTAL_GRID = 12;
let cb = new Codebird;
cb.setProxy("https://cb-proxy.herokuapp.com/");
let contenedor = $('#contenedor');
cb.setConsumerKey('7oCUSDI0phtJAcA8jBIIBnx2t', 'oNG70iGOeHgjLZMfRP6HZ7ippi46fBWJmjTg4CWLmFETpQ0dhX');
cb.setToken('923372796713033728-hKClTkkSdMBDE1NfKEKqkjl4sKQZpXS', 'IWVPg2M2JIHph0BWgvgdAYRBYPiNH5MroUBkDjo6JIvi9');
let tweets = [];

function cargarTweets(hash){
    indiceImgCarrousel = 0;
    indiceImgFullScreen=0;
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
             
             if(reply.httpstatus == 0){//no anda libreria
                 //mostrar error
                 $(".loader").hide();
                 $(".loaderFail").find('p').text('Sorry, the service is not available');
                 $(".loaderFail").show();
            }else if(reply.statuses.length == 0){//no hay imagenes
                $(".loader").hide();
                $(".loaderFail").find('p').text('Sorry, no images found');
                $(".loaderFail").show();
            }else{
                 //mostrar grilla
                 $('#ul-grilla').empty();
                 tweets = [];
                 url_img = [];
                 for (var i = 0; i < reply.statuses.length; i++) {
                    // console.log(reply.statuses[i])
                     if(!reply.statuses[i].retweeted && reply.statuses[i].entities.media != undefined ){

                         if(!url_img.includes(reply.statuses[i].entities.media[0].media_url)){
                            
                             $("#fullscreen-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                             url_img.push(reply.statuses[i].entities.media[0].media_url);
                             tweets.push({img: reply.statuses[i].entities.media[0].media_url,
                                             like: reply.statuses[i].favorite_count,
                                            user : reply.statuses[i].user.screen_name});
                            if(indice<TOTAL_GRID){
                                createImgGrilla(indice,reply.statuses[i].entities.media[0].media_url);                                
                            }
                             indice++
                         }
                     }  
                 }
                 $(".loader").hide();
                 if (tweets.length > TOTAL_GRID) {
                    $("#next-grilla").show();
                    $("#prev-grilla").show();
                }
                 if(layout == 'grid'){
                    $("#panel-image").show(2000);
                 }else{
                    $("#layout-carrousel").click();
                 }
                 
             }
         }
     );    
}
function cleanImages(){
    for (var i = 0; i < TOTAL_GRID; i++) {
        // $("#gallery-li-"+i).hide();
        $("#gallery-image-"+i).attr("src","");
    }
}

function createImgGrilla(id,src) {
    let li = $('<li id="gallery-li-'+id+'" class="col-sm-3 col-md-3"> <a class="thumbnail grilla" id="carousel-selector-'+id+'"><img class="img-responsive" id="gallery-image-'+id+'" src="'+src+'"></a></li>').on('click',function () {
        $("#imgFullScreen").attr("src",tweets[id].img);
        $("#likes").find("p").text(tweets[id].like);
        $("#twUser").find("p").text("@"+tweets[id].user);        
        $("#section-fullscreen").css({'visibility': 'visible'});
        $("#containerImgFullScreen").css({'visibility': 'visible'});
        $("#containerImgFullScreen").show();
        layout='fullscreen';
        $("html").css({'overflow-y' : 'hidden'});        
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
    if (pageNumberGrilla>=TOTAL_GRID) {
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
        $("#panel-search").height(580);
        $(".hide-bullets").height(500);
        // $("#panel-search").height($(window).height()-120);
        // $(".hide-bullets").height($(window).height()-120);
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
        $("#container-carrousel").hide();
        $("#prev-carrousel").hide();
        $("#next-carrousel").hide();
    }
        
    $(".loader").show(1000);
    
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
        $("#panel-image").show();
    }
    layout = 'grid';
})

let indiceImgCarrousel = 0;
$("#layout-carrousel").click(function () {    
    if(search){
        // $("html").css({'overflow-y' : 'hidden'});
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
    $("#twUser").find("p").text("@"+tweets[indice].user);
    $("#section-fullscreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").show();
    $("#likes").show();
    layout='fullscreen';
    $("html").css({'overflow-y' : 'hidden'});    
    nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
});

//**************** fullscreen */
let nextFullScreen;

let layout = 'grid';
let indiceImgFullScreen = 0;
$("#layout-play").click(function () {
    toggleFullScreen(document.getElementById('section-fullscreen'));
    $("#imgFullScreen").attr("src",tweets[indiceImgFullScreen].img);
    $("#likes").find("p").text(tweets[indiceImgFullScreen].like);
    $("#twUser").find("p").text("@"+tweets[indiceImgFullScreen].user);
    $("#section-fullscreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").css({'visibility': 'visible'});
    $("#containerImgFullScreen").show();
    $("#likes").show();
    layout='fullscreen';
    $("html").css({'overflow-y' : 'hidden'});
    nextFullScreen = setInterval(function(){ $("#next").click() }, 5000);
});

//funcion de fullscreen
function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


/*exit fullscreen */
document.onkeydown = function(ev){
    if(ev.keyCode==27 && layout=='fullscreen'){
        $("#containerImgFullScreen").hide();       
        $("#section-fullscreen").css({'visibility': 'hidden'});
        fullscreen='carrousel';
        clearInterval(nextFullScreen);
        $("html").css({'overflow-y' : 'visible'});
    }
}
$("#btn-exitFullScreen").click(function(){
    $("#containerImgFullScreen").hide();
    $("#section-fullscreen").css({'visibility': 'hidden'});
    fullscreen='carrousel';
    clearInterval(nextFullScreen);
    $("html").css({'overflow-y' : 'visible'});
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

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
            $("#likes").removeClass();
            $("#twUser").css({'opacity': '0'});
            $("#containerImgFullScreen").css({'top':'110%'});
            $("#containerImgFullScreen").bind("transitionend", function(){ 
                $("#imgFullScreen").attr('src',tweets[indice].img);
                $("#likes").find("p").text(tweets[indice].like);
                $("#twUser").find("p").text("@"+tweets[indice].user);
                $("#containerImgFullScreen").css({'top':'8%'});
                $("#likes").css({'opacity': '1'});
                
                $("#twUser").css({'opacity': '1'});
                animacion = false;
            });
            $("#likes").addClass('animHeart2');
            break;

        case 2:
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'top': '-100%'});
        $("#likes").removeClass();
        $("#twUser").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#twUser").find("p").text("@"+tweets[indice].user);
             $("#containerImgFullScreen").css({'opacity':'1'});
             $("#twUser").css({'opacity': '1'});
             $("#likes").css({'visibility': 'visible'});
             $("#likes").css({'top': '85%'});
             
             animacion = false;
        });
        $("#likes").addClass('animHeart1');
            break;

        case 3:
        $("#likes").find('p').hide();
        $("#likes").css({'width': '0px', 'height':'0px'});
        $("#likes").removeClass();
        $("#twUser").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'left':'110%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#twUser").find("p").text("@"+tweets[indice].user);
            $("#containerImgFullScreen").css({'left':'4%'}); 
            $("#twUser").css({'opacity': '1'});
            $("#likes").css({'width': '100px', 'height':'50px'});
            $("#likes").find('p').show(700);
           
            animacion = false;
        });
        $("#likes").addClass('animHeart3');
            break;

        case 4:
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'left': '-100%'});
        $("#likes").removeClass();
        $("#twUser").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'width':'0%'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
            $("#imgFullScreen").attr('src',tweets[indice].img);
            $("#likes").find("p").text(tweets[indice].like);
            $("#twUser").find("p").text("@"+tweets[indice].user);
            $("#containerImgFullScreen").css({'width': $(window).width()-100});
            $("#likes").css({'visibility': 'visible'});
            $("#likes").css({'left': '86%'});
            $("#twUser").css({'opacity': '1'});
           
            animacion = false;
        });
        $("#likes").addClass('animHeart2');
            break;
        default:
        $("#likes").css({'visibility': 'hidden'});
        $("#likes").css({'top': '-100%'});
        $("#likes").removeClass();
        $("#twUser").css({'opacity': '0'});
        $("#containerImgFullScreen").css({'opacity':'0'});
        $("#containerImgFullScreen").bind("transitionend", function(){ 
             $("#imgFullScreen").attr('src',tweets[indice].img);
             $("#likes").find("p").text(tweets[indice].like);
             $("#twUser").find("p").text("@"+tweets[indice].user);
             $("#containerImgFullScreen").css({'opacity':'1'});
             $("#likes").css({'visibility': 'visible'});
             $("#twUser").css({'opacity': '1'});
             $("#likes").css({'top': '85%'}); 
            
             animacion = false;
        });
        $("#likes").addClass('animHeart1');
            break;
    }
}