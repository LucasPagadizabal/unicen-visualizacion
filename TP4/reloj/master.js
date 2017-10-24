let anguloHora=0;

function girarHora(){
    anguloHora+=0.5;
    document.getElementById("hora").style.transform="rotate("+anguloHora+"deg)";
}

// setInterval(function(){girarHora(),10000});


