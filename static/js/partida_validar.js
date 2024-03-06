function validar (letra) {

    var volta = 0;
    mudou = false;

    for (i = 0; i < palavra.length && vez == jogador; i++ ){
     
        if (letras[i] != letra.toUpperCase()){
            
           volta  += 1;
        }

        if ( volta == palavra.length && erros==7) {

           var id = cilindro + erros;
           document.getElementById(id).style.backgroundColor = "#737373"; 

           switch(cilindro) {

                 case "pjcor":
                      pjerro += 1;
                      erros = pjerro;
                 break;

                 case "sjcor":
                      sjerro += 1;
                      erros = sjerro;
                 break;
           }

           var id = cilindro + erros;

           document.getElementById(id).style.backgroundColor = "#737373"; 

           mudou = true;
           
           switch(cilindro) {

                 case "pjcor":
                      pjerro += 1;
                      erros = pjerro;
                 break;

                 case "sjcor":
                      sjerro += 1;
                      erros = sjerro;
                 break;
            
          }

        }

        if (volta == palavra.length && erros < 7){
           
           var id = cilindro + erros;

           document.getElementById(id).style.backgroundColor = "#737373"; 


           switch(cilindro) {

                 case "pjcor":
                      pjerro += 1;
                      erros = pjerro;
                      const elempj = document.getElementById("movepj");
                      pospj += 21;
                      elempj.style.top = pospj + "px";
                      mudou = true;
                 break;

                 case "sjcor":
                      sjerro += 1;
                      erros = sjerro;
                      const elemsj = document.getElementById("movesj");
                      possj += 21;
                      elemsj.style.top = possj + "px";
                      mudou = true;
                 break;
            
          }

        }

        if ( volta == palavra.length && erros==2) {
           
           var id = cilindro + erros;
           document.getElementById(id).style.backgroundColor = "#737373"; 


           
           switch(cilindro) {

                 case "pjcor":
                      pjerro += 1;
                      erros = pjerro;
                 break;

                 case "sjcor":
                      sjerro += 1;
                      erros = sjerro;
                 break;
            
          }
             
        }
        
        

    }

    verificar(letra);
}