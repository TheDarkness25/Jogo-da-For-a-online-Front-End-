function teclado(){

   var codigo = event.keyCode;
   letra = String.fromCharCode(codigo);
   letra.toLowerCase();

   if (65 <= codigo && codigo >=90 && letra != 'ç'){ 
      validar(letra.toUpperCase());
   }
}

document.body.onkeypress = teclado;