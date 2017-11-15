class Game{

    constructor(){
        this.player = new Player();
        this.layerTierra = document.getElementById("layertierra");
        this.layerPiso = document.getElementById("layerpiso");
        this.cantCoins = 4;
        this.audio = document.getElementById("audioCoin");
        this.audioBack = document.getElementById("audioBack");
        this.audioBack.volume = 0.1;
        this.audioBack.play();
        this.divPoints = $("#coinPoints");
    }

    move(keyDown){
        switch (keyDown) {
            case 'ArrowRight':
                this.player.run();
                this.moveBack('running');
                break;
            case 'ArrowUp':
                this.player.jump();
                break;
            default:
                this.player.idle();
                this.moveBack('paused');
                break;
        }
    }

    isCollision(object){
        let runner = $("#runner");
        let ry= runner.offset().top;
        let rx = runner.offset().left;
        let rh = runner.outerHeight();
        let rw = runner.outerWidth();

        let element = $("#"+object);
        let ey = element.offset().top;
        let ex = element.offset().left;
        let eh = element.outerHeight();
        let ew = element.outerWidth();

        return!(
            ((ry + rh) < (ey)) ||
            (ry> (ey + eh)) ||
            ((rx + rw) < ex) ||
            (rx > (ex + ew)));

    }
    
    enemyUpdate(px){
        let enemy =  $("#enemy");
        if(parseInt(enemy.offset().left)>-100){
            enemy.offset({left: parseInt(enemy.offset().left)-px});
        }else{
            let distanceX = Math.floor((Math.random() * 2000) + innerWidth);
            this.updateDistance("enemy",distanceX);
        }  
    }

    coinUpdate(px){
        for (var i = 1; i <= this.cantCoins; i++) {
            let coin =  $("#coin"+i);
            if(parseInt(coin.offset().left)>-100){
                coin.offset({left: parseInt(coin.offset().left)-px});
            }else{
                let distanceX = Math.floor((Math.random() * 2000) + innerWidth);
                let distanceY = Math.floor((Math.random() * 490) + 250);
                this.updateDistance("coin"+i,distanceX,distanceY);
            }  
        }  
    }

    updateDistance(object,distanceX,distanceY){
        let div = document.getElementById(object);
        if(object == 'enemy'){
            div.style.left = parseInt(div.style.left,10) + distanceX+'px';
        }else{
            div.style.left = parseInt(div.style.left,10) + distanceX+'px';
            div.style.top = parseInt(div.style.top,10) + distanceY+'px';
        }
    }
     
    update(){
        if(arrows['ArrowRight']){
            this.coinUpdate(1.5);
            this.enemyUpdate(4); 
        }else{
            this.enemyUpdate(2);
        }
        
        let isPlaying = (this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2);
        for (var i = 1; i <= this.cantCoins; i++) {
            if(this.isCollision('coin'+i)){
                this.player.coins++;
                this.divPoints.text(this.player.coins);//reemplazar html con la cant monedas
                if(!isPlaying){
                    this.audio.play();
                 }
                 let distanceX = Math.floor((Math.random() * 2000) + innerWidth);
                 let distanceY = Math.floor((Math.random() * 490) + 250);
                 this.updateDistance("coin"+i,distanceX,distanceY);
           }
        }
        
        if(this.isCollision('enemy')){
            this.player.dead();
            this.gameover();
       }
       this.audioInfinity();
    }

    moveBack(action){  
        this.layerTierra.style.WebkitAnimationPlayState=action;
        this.layerPiso.style.WebkitAnimationPlayState=action;
    }

    gameover(){
        document.getElementById("enemy").style.webkitAnimationPlayState = 'paused';
        this.layerPiso.style.webkitAnimationPlayState='paused';
        this.layerTierra.style.webkitAnimationPlayState='paused';
        clearInterval(gameUpdate);
        parar();
        
        setTimeout(function () {document.getElementById("audioGameOver").play();},500);
        
        let totalCoins = this.player.coins;
        this.player = null;
        this.audioBack.pause();

        setTimeout(function () {
            $('#game').css('filter','blur(4px)');
            let time = Minutos.innerHTML+Segundos.innerHTML+Centesimas.innerHTML;
            mostrarModal(totalCoins,time);
        },3000);
    }

    audioInfinity(){
        if(this.audioBack.currentTime >= this.audioBack.duration){
            this.audioBack.play();
        }
    }
}

inicio();
let game = new Game();
let gameUpdate = setInterval(function(){ game.update() }, 0);

let arrows =[];
arrows["ArrowRight"] = false;
arrows["ArrowUp"] = false;

document.onkeydown = function(ev){
    arrows[ev.code] = true;
    if(game.player.state!='jumping'){//para no cortar la ejecucion del salto
        game.move(ev.code);
    }  
}

 document.onkeyup = function (ev){
    arrows[ev.code] = false;
    if(ev.code!='ArrowUp' && game.player.state!='jumping'){//para no cortar la ejecucion del salto
        game.move();
    }

}

$("#audio").click(function(){
    if(game.player!=null){
        if(game.audioBack.paused){
            game.audioBack.play();
            this.src ='images/audioOn.png';
        }else{
            game.audioBack.pause();
            this.src ='images/audioOff.png';
        }
    }
});