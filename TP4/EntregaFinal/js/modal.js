function crearModal(points,time){
    var modal = document.createElement("div");
    var info = document.createElement("div");
    
    let gameOver = document.createElement("h2");
    gameOver.appendChild(document.createTextNode("Game Over"));

    let puntaje = document.createElement("p");
    puntaje.appendChild(document.createTextNode("Monedas:  "+points));
   
    let ptime = document.createElement("p");
    ptime.appendChild(document.createTextNode("Tiempo:  "+time))
    
    let tryAgain = document.createElement("p");
    tryAgain.appendChild(document.createTextNode("Volver a Intentarlo"));
    tryAgain.className="tryAgain";
    tryAgain.addEventListener("click",function () {
        location.replace(replacerUrl('play.html'));
    });

    let backMenu = document.createElement("p");
    backMenu.appendChild(document.createTextNode("Volver a Menu"));
    backMenu.className="backMenu";
    backMenu.addEventListener("click",function () {
        location.replace(replacerUrl('index.html'));
    });

    modal.appendChild(info);
    info.appendChild(gameOver)
    info.appendChild(puntaje);
    info.appendChild(ptime);
    info.appendChild(tryAgain);
    info.appendChild(backMenu);
    modal.className = "contenedorModal";
    info.className = "modal";

    document.body.appendChild(modal);
    return modal;
}

function mostrarModal(points,time){
    modalGameOver = crearModal(points,time);
    modalGameOver.style.visibility = "visible";
}

let modalGameOver;