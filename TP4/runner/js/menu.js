function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function replacerUrl(url){
    let pathAbsolute = getAbsolutePath();
    return pathAbsolute = pathAbsolute+url;
}

$("#play").click(function(){
    location.replace(replacerUrl(this.id+'.html'));
});


$(".instrucciones").click(function() {
    if(this.style.height == '300px'){
        this.style.height = '50px';
       $("#infoArrowUp").css("visibility", "hidden");
       $("#objective").css("visibility", "hidden");
       $("#arrowUp").css("visibility", "hidden");
       $("#arrowRight").css("visibility", "hidden");
    }else{
        setTimeout(function () {
            $("#infoArrowUp").css("visibility", "visible");
            $("#objective").css("visibility", "visible");
            $("#arrowUp").css("visibility", "visible");
            $("#arrowRight").css("visibility", "visible");
        },300);
        this.style.height = '300px';

    }
});

