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
        $("#carrousel").hide(1000);
        $("#grilla").show(3000);
    }
    layout = 'grid';
})
$("#layout-carrousel").click(function () {    
    if(search){
        $("#grilla").hide(1000);
        $("#carrousel").show(3000);
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
let layout = 'grid';
$("#layout-play").click(function () {
    if(layout == 'grid'){
        $("#grilla").hide(700);
        $("#carrousel").show(700);
    }
    $("#form").hide();
    $("#layout-grid").hide();
    $("#layout-carrousel").hide();
    $("#layout-play").hide();
    $("#divSearch").removeClass("col-md-offset-1");
    $("#divSearch").removeClass("col-md-10");
    $("#divSearch").addClass("col-md-12");
    $("#divSearch").css({position:'fixed','height': (($(window).height()))+'px',top:'0%'});
    $("#carrousel").css({position:'fixed',top:'0%',left:'0%'})
    $("#carrousel").find('img').css({'height': (($(window).height()))-35+'px'});
    fullscreen='fullscreen';
});

document.onkeydown = function(ev){
    if(ev.keyCode==27 && fullscreen){
        $("#form").show();
        $("#layout-grid").show();
        $("#layout-carrousel").show();
        $("#layout-play").show();
        $("#divSearch").removeClass("col-md-12");
        $("#divSearch").addClass("col-md-offset-1");
        $("#divSearch").addClass("col-md-10");
        $("#divSearch").css({position:'','height': ''});
        $("#carrousel").css({position:'',top:'',left:''})
        $("#carrousel").find('img').css({'height': '470px'});
        fullscreen='carrousel';
    }
}