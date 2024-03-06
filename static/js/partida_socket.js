class MatchMultiplayerController {

    static gameProgress = {}
    static gameId = 0;
    static user = {}
    static timeLeft = 30;
    static timer;

    constructor() {
        
    }

    static displayName = "MatchMultiplayerController";
    
    static connectToSocket(gameId) {

        let stompClient;
        let socket = new SockJS(window.origin + "/gameplay");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/topic/match-connect/" + gameId, function (response) {
                let data = JSON.parse(response.body); 
                MatchMultiplayerController.gameProgress = data
                MatchMultiplayerController.updateTurnMsg()
            })
            stompClient.subscribe("/topic/match-play/" + gameId, function (response) {
                let data = JSON.parse(response.body); 
                MatchMultiplayerController.gameProgress = data
                MatchMultiplayerController.updateTurnMsg()
                MatchMultiplayerController.updateBoard()
                MatchMultiplayerController.updateRemainingAttempts()
                MatchMultiplayerController.resetTimer()
            })
        })
    }

    static connectToMatch(gameId, user) {
        MatchMultiplayerController.gameId = gameId
        MatchMultiplayerController.user = user
        MatchMultiplayerController.connectToSocket(gameId)
        $.ajax({
            url: window.origin + '/game/connect/' + gameId,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                MatchMultiplayerController.gameProgress = data
                MatchMultiplayerController.initializeBoard(data.gameAssets.palavra, data.gameAssets.tema)
                MatchMultiplayerController.updateTurnMsg()
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static initializeBoard(palavra, tema) {
        $('.tema').text(tema)
        var palavraDiv = document.querySelector('.palavra')
        for (var i = 0; i < palavra.length; i++) {
            palavraDiv.innerHTML += "<div class=\"letra\"><p></p></div>";
        }

        var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ"
        var tecladoDiv = document.querySelector('.teclado')
        for (var i = 0; i < alfabeto.length; i++) {
            tecladoDiv.innerHTML += "<div class=\"tecla\"><p id=\"" + alfabeto[i] + "\">" + alfabeto[i] + "</p></div>"
        }
        tecladoDiv.innerHTML += "<div class=\"responder\"><p>RESPONDER</p></div>"
        $(".tecla").click(function () {
            var elementId = $( this ).children('p').attr('id')
            $('#' + elementId).css("background-color", "gray")
            $('#' + elementId).css("pointer-events", "none")
            MatchMultiplayerController.letterKeyClick(elementId)
         });
    }

    static letterKeyClick(letter) {
        MatchMultiplayerController.gameProgress.board[letter] = true;
        MatchMultiplayerController.gameProgress.lastLetter = letter;
        MatchMultiplayerController.sendPlay()
    }

    static sendPlay() {
        $.ajax({
            url: window.origin + '/game/play/' + MatchMultiplayerController.gameId,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(
            {
                "game": MatchMultiplayerController.gameProgress.game,
                "gameAssets": MatchMultiplayerController.gameProgress.gameAssets,
                "playerOfTurn": MatchMultiplayerController.gameProgress.playerOfTurn,
                "qtdVidasPlayers": MatchMultiplayerController.gameProgress.qtdVidasPlayers,
                "board": MatchMultiplayerController.gameProgress.board,
                "winner": MatchMultiplayerController.gameProgress.winner,
                "lastLetter": MatchMultiplayerController.gameProgress.lastLetter,
                "qtdAcertos": MatchMultiplayerController.gameProgress.qtdAcertos,
                "listOfIdx": MatchMultiplayerController.gameProgress.listOfIdx
            }),
            success: function (data) {
                //console.log(data)
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static updateTurnMsg(){
        if (MatchMultiplayerController.gameProgress.playerOfTurn === MatchMultiplayerController.user.id) {
            $('.teclado').css("pointer-events", "auto")
            $('.aviso-turno').text('É a sua vez!')
        } else {
            $('.teclado').css("pointer-events", "none")
            $('.aviso-turno').text('Aguarde sua vez!')
        }
        MatchMultiplayerController.startTimer()
    }

    static updateBoard(){
        var tecladoDiv = document.querySelector('.teclado')
        for (var i = 0; i < tecladoDiv.childElementCount; i++) {
            var id = tecladoDiv.children[i].querySelector('p').innerText;
            if (MatchMultiplayerController.gameProgress.board[id]) {
                $('#' + id).css("background-color", "gray")
                $('#' + id).css("pointer-events", "none")
            }
        }

        var palavraDiv = document.querySelector('.palavra')
        var idxLetrasCorretas = MatchMultiplayerController.gameProgress.listOfIdx
        var palavra = MatchMultiplayerController.gameProgress.gameAssets.palavra
        for (var i = 0; i < idxLetrasCorretas.length; i++) {
            palavraDiv.children[idxLetrasCorretas[i]].querySelector('p').innerText = palavra[idxLetrasCorretas[i]]
        }


    }

    static updateRemainingAttempts(){
        var player1Id = MatchMultiplayerController.gameProgress.game.player1Id
        var player2Id = MatchMultiplayerController.gameProgress.game.player2Id
        var vidasRestantesPlayer1 = MatchMultiplayerController.gameProgress.qtdVidasPlayers[player1Id]
        var vidasRestantesPlayer2 = MatchMultiplayerController.gameProgress.qtdVidasPlayers[player2Id]
        $('.left-column .bottom .ponteiro').css("bottom", 19 - 3*(6-vidasRestantesPlayer1) + 'vh')
        $('.right-column .bottom .ponteiro').css("bottom", 19 - 3*(6-vidasRestantesPlayer2) + 'vh')

        if (vidasRestantesPlayer1 == 0) {
            MatchMultiplayerController.gameProgress.winner = player2Id
        } else if (vidasRestantesPlayer2 == 0) {
            MatchMultiplayerController.gameProgress.winner = player1Id
        }
        MatchMultiplayerController.checkForWinner()
    }

    static startTimer(){
        MatchMultiplayerController.timer = setInterval(function() {
            if (MatchMultiplayerController.timeLeft < 10) {
                $('.timer').text('00:0' + MatchMultiplayerController.timeLeft)
            }
            $('.timer').text('00:' + MatchMultiplayerController.timeLeft)
            MatchMultiplayerController.timeLeft = MatchMultiplayerController.timeLeft - 1;
            if (MatchMultiplayerController.timeLeft < 0) {
                clearInterval(MatchMultiplayerController.timer)
                MatchMultiplayerController.resetTimer()
                if (MatchMultiplayerController.gameProgress.playerOfTurn === MatchMultiplayerController.user.id) {
                    MatchMultiplayerController.gameProgress.lastLetter = '#';
                    MatchMultiplayerController.sendPlay()
                }
            }
        }, 10000);
    }

    static resetTimer(){
        MatchMultiplayerController.timeLeft = 30
        $('.timer').text('00:' + MatchMultiplayerController.timeLeft)
    }

    static checkForWinner(){
        if (MatchMultiplayerController.gameProgress.winner != null)  {
            $('.teclado').css("pointer-events", "none")
            MatchMultiplayerController.resetTimer()
            if (MatchMultiplayerController.gameProgress.winner === MatchMultiplayerController.user.id) {
                $('.aviso-turno').text('Você ganhou! :)')
            } else {
                $('.aviso-turno').text('Você perdeu! :(')
            }
        }
    }

}

export { MatchMultiplayerController }



