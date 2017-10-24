function rotate(div){
    let grados = Math.floor(Math.random() * (360 - 0)) + 0;
    let x = Math.floor(Math.random() * (250 - 0)) + 0;
    let y = Math.floor(Math.random() * (250 - 0)) + 0;
    div.style.transform="translate("+x+"px,"+y+"px) rotate("+grados+"deg)";
}

function ej2(div){
    let colores = ["red","yellow","black","blue"];
    let color = Math.floor(Math.random() * (4 - 0)) + 0;

    div.style.background=colores[color];

    let grados = Math.floor(Math.random() * (360 - 0)) + 0;
    let x = Math.floor(Math.random() * (250 - 0)) + 0;
    let y = Math.floor(Math.random() * (250 - 0)) + 0;
    div.style.transform="translate("+x+"px,"+y+"px) rotate("+grados+"deg)";
}