//paginado grilla

//***************************
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
        count: 100
    }
   
    cb.__call(
        "search_tweets",
        params,
        function (reply) {
            tweets = [];
            for (var i = 0; i < reply.statuses.length; i++) {
                if(reply.statuses[i].entities.media != undefined && indice<12){
                    $("#carousel-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                    $("#gallery-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                    $("#fullscreen-image-"+indice).attr("src",reply.statuses[i].entities.media[0].media_url);
                    tweets.push({img: reply.statuses[i].entities.media[0].media_url,
                                     like: reply.statuses[i].favorited});
                    indice++
                }
                
            }
        }
    );
}

function cleanImages(){
    for (var i = 0; i < 12; i++) {
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
        $("#panel-image").show(2000);
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
        $("#carrousel").hide(1500);
        $("#grilla").show(1500);
    }
    layout = 'grid';
})
$("#layout-carrousel").click(function () {    
    if(search){
        $("#grilla").hide(1500);
        $("#carrousel").show(1500);
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


//**************** fullscreen */
$("#section-fullscreen").css({'height' : $(window).height() , 'width': $(window).width()});
$("#containerImgFullScreen").css({'height' : $(window).height()-100 , 'width': $(window).width()-100});
let layout = 'grid';
$("#layout-play").click(function () {
    $("#section-fullscreen").css({'visibility': 'visible'});
    layout='fullscreen';
});


/*exit fullscreen */
document.onkeydown = function(ev){
    if(ev.keyCode==27 && layout=='fullscreen'){
        $("#section-fullscreen").css({'visibility': 'hidden'});
        fullscreen='carrousel';
    }
}
$("#section-fullscreen").click(function(){
    $("#section-fullscreen").css({'visibility': 'hidden'});
    fullscreen='carrousel';
});
