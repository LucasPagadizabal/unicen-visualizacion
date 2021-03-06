    var tiempo = {
        hora: 0,
        minuto: 0,
        segundo: 0
    };

    var tiempo_corriendo = null;
    function run() {
          tiempo_corriendo = setInterval(function(){
              // Segundos
              tiempo.segundo++;
              if(tiempo.segundo >= 60)
              {
                  tiempo.segundo = 0;
                  tiempo.minuto++;
              }

              // Minutos
              if(tiempo.minuto >= 60)
              {
                  tiempo.minuto = 0;
                  tiempo.hora++;
              }

              $("#hour").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
              $("#minute").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
              $("#second").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
          }, 10);
      }

    function stop() {
          clearInterval(tiempo_corriendo);
      }

    function clearTime() {
      tiempo_corriendo = null;
      $("#hour").text('00');
      $("#minute").text('00');
      $("#second").text('00');
      tiempo.hora = 0;
      tiempo.minuto = 0;
      tiempo.segundo = 0;
    }
