var seg = 15;
cronometro = window.setInterval('contagem( )',1000);

function contagem(){
    if(seg == 0){
       let tempo = "00 : 0" + seg ;
       document.getElementById("tempo").value = tempo;

       switch(vez){
          case pj:
              if ( erros==7) {

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

              if (erros < 7){
           
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

              if ( erros==2) {
           
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
    
              vez = sj;
              jogador = sj;
              cilindro = "sjcor";
              erros = sjerro;
              document.getElementById("vez").value = vez;
              

              
          break;

          case sj:
              if ( erros==7) {

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

              if (erros < 7){
           
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

              if ( erros==2) {
           
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
   
              vez = pj;
              jogador = pj;
              cilindro = "pjcor";
              erros = pjerro;
              document.getElementById("vez").value = vez;
         break;
              
       }
      seg = 15;
      
      
    }

    if(seg <= 9 && 0 != seg){
       let tempo = "00 : 0" + seg;
       document.getElementById("tempo").value = tempo;
       seg--;
    }
    if (seg >= 10){
       let tempo = "00 : " + seg ;
       document.getElementById("tempo").value = tempo;
       seg--;
    }
    
}