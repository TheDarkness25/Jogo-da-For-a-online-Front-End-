class LobbyMultiplayerController {

    constructor() {
        let gameId = 0
        let game = {}
        let gameAssets = {}
        let userId = 0
    }

    static displayName = "LobbyMultiplayerController";
    
    static connectToSocket(gameId) {

        console.log("connecting to the game");
        let stompClient;
        let socket = new SockJS(window.origin + "/gameplay");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log("connected to the frame: " + frame);
            stompClient.subscribe("/topic/game-lobby/" + gameId, function (response) {
                let data = JSON.parse(response.body);            
                LobbyMultiplayerController.game = data;
            })
            stompClient.subscribe("/topic/game-sorteio/" + gameId, function (response) {
                let data = JSON.parse(response.body); 
                LobbyMultiplayerController.displayGameAssets(data)           
                LobbyMultiplayerController.gameAssets = data;
            })
            stompClient.subscribe("/topic/game-sair/" + gameId, function (response) {
                window.location.replace(window.origin + '/home');          
            })
            stompClient.subscribe("/topic/game-pronto/" + gameId, function (response) {
                console.log("game pronto")
                LobbyMultiplayerController.redirectToGame()           
            })
        })
    }

    static connectToRandom(user) {
        LobbyMultiplayerController.userId = user.id
        $.ajax({
            url: window.origin + '/game/connect',
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "id": user.id
            }),
            success: function (data) {
                console.log(data)
                LobbyMultiplayerController.gameId = data.id
                LobbyMultiplayerController.connectToSocket(LobbyMultiplayerController.gameId)
                LobbyMultiplayerController.waitingForGame(data, LobbyMultiplayerController.userId)
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static waitingForGame(data, playerId){
        if (data.hasOwnProperty("status") && data.status == "IN_PROGRESS") {
            $(".carregando p").text("Sorteando a palavra!")
            if (data.player2Id == playerId) {
                LobbyMultiplayerController.fetchGameAssets(data.id)
            }
        } else {
            console.log("game is not in progress yet")
        }
    }

    static fetchGameAssets(id){
        $.ajax({
            url: window.origin + '/game/sorteio/' + id,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                LobbyMultiplayerController.displayGameAssets(data) 
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static displayGameAssets(gameAssets){
        console.log('displayGameAssets')
        $('.box .section .tema').text(gameAssets.tema)
        $('.box .section .dificuldade').text(gameAssets.dificuldade)
        $('#box').css("visibility","visible")
        $(".carregando p").text("Clique em pronto para começar o jogo")
    }


    static leaveGame(){
        $.ajax({
            url: window.origin + '/game/sair/' + LobbyMultiplayerController.gameId,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.log(data)
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static startGame(){
        $.ajax({
            url: window.origin + '/game/start/' + LobbyMultiplayerController.gameId,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.log(data)
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    static redirectToGame(){
        console.log("redirectToGame")
        let url = window.origin + '/game/partida/' + LobbyMultiplayerController.gameId
        window.location.assign(url)
    }

}

export { LobbyMultiplayerController }



