import {User} from './user.js';

const user = new User()
var vidasSpan = document.querySelector(".vidas-div span")
var moedasSpan = document.querySelector(".moedas-div span")

vidasSpan.innerHTML = user.qtdVidas
moedasSpan.innerHTML = user.qtdMoedas