function verificar(letra) {

  var volta_palpite = 0;

  for (let i = 0; i < palpites.length; i++) {
     
     if (letra == palpites[i]){
         volta_palpite = 1;
     }

     if (letra == palpites[i] && erros==7 && mudou == false) {

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

     if (letra == palpites[i] && erros < 7 && mudou == false) {

           var id = cilindro + erros;

           document.getElementById(id).style.backgroundColor = "#737373"; 


           switch(cilindro) {

                 case "pjcor":
                      pjerro += 1;
                      erros = pjerro;
                      const elempj = document.getElementById("movepj");
                      pospj += 21;
                      elempj.style.top = pospj + "px";

                 break;

                 case "sjcor":
                      sjerro += 1;
                      erros = sjerro;
                      const elemsj = document.getElementById("movesj");
                      possj += 21;
                      elemsj.style.top = possj + "px";
                 break;
         
          }
        
     }


     else {
         construir(letra);
     }
     

     if (letra == palpites[i] && erros==2 && mudou == false) {
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

  if (volta_palpite != 1 || palpites.length == 1) {
     document.getElementById(letra).style.backgroundColor = "#737373";
     palpites.splice(0,0,letra);
     switch(vez){
          case pj:
              vez = sj;
              jogador = sj;
              cilindro = "sjcor";
              erros = sjerro;
              document.getElementById("vez").value = vez;
          break;
          case sj:
              vez = pj;
              jogador = pj;
              cilindro = "pjcor";
              erros = pjerro;
              document.getElementById("vez").value = vez;
         break;
      
     }
     seg = 15;
  } else {
  
      switch(vez){
          case pj:
              vez = sj;
              jogador = sj;
              cilindro = "sjcor";
              erros = sjerro;
              document.getElementById("vez").value = vez;
          break;
          case sj:
              vez = pj;
              jogador = pj;
              cilindro = "pjcor";
              erros = pjerro;
              document.getElementById("vez").value = vez;
         break;
      
     }
     seg = 15;  
  }
}