import {User} from './user.js';

(function () {
    let playerId;
    let playerRef;
    let oponente;
    let pardida;

	function iniciarLobby(){
	        const allPlayersRef = firebase.database().ref(`players`);

            allPlayersRef.on("child_added", (snapshot) => {
              //Fires whenever a new node is added the tree
              const addedPlayer = snapshot.val();
              if (addedPlayer.id === playerId) {
                    console.log("Jodador novo: " + addedPlayer.id );
              }else{
                let divPlayer2 = document.createElement("div");
                divPlayer2.setAttribute("id", "player2");
                alert(addedPlayer.name + " Entrou no lobby");
              }
            })
	}

    firebase.auth().onAuthStateChanged((user) => {
        //console.log(user)
		//console.log(user.id)
		const userBD = new User()

        if(user){
		    console.log("you are logged in")
            //you are logged in"
            playerId = user.uid;
            playerRef = firebase.database().ref(`players/${playerId}`);

            playerRef.set({
                id: playerId,
                name: userBD.username,
                moedas: userBD.qtdMoedas,
                estadoDeLogin: userBD.ativo,
                vidas: userBD.qtdVidas
             })
            //Remove me from Firebase when I diconnect
            playerRef.onDisconnect().remove();

			iniciarLobby();

        }else {
            //you are logged out.
			console.log("you are logged out.'")
        }
    })


    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });

})();
