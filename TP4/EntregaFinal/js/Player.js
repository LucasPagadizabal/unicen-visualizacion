class Player {

    constructor(x,y,heigth,widht){
        this.divRunner = document.getElementById("runner");
        this.state= 'none';
        this.coins = 0;
    }

    run(){
        this.state='running';
        this.divRunner.className = '';
        this.divRunner.className = 'run';   
    }

    jump(){
       this.state='jumping'; 
       this.divRunner.className = '';
       this.divRunner.className = 'jump';
       this.divRunner.addEventListener("animationend",this.endJump);
    }
    
    dead(){
        this.divRunner.className = '';
        this.divRunner.className = 'dead';
    }

    endJump(){
        if(arrows['ArrowRight']){
            game.player.state = 'running';
            this.className = '';
            this.className = 'run';
        }else{
            game.player.state = 'none';
            this.className = '';
            this.className = 'idle';
            document.getElementById("layertierra").style.WebkitAnimationPlayState='paused';
            document.getElementById("layerpiso").style.WebkitAnimationPlayState='paused';
        }
        this.style.top = '500px';
       
    }
}