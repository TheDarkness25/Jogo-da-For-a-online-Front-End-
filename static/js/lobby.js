import {LobbyMultiplayerController} from './socket_js.js';
import {User} from './user.js';

$(window).on('load', function() {
    LobbyMultiplayerController.connectToRandom(new User())
});



$(".cancelar").click(function () {
    LobbyMultiplayerController.leaveGame()
})

$(".pronto").click(function () {
    LobbyMultiplayerController.startGame()
})