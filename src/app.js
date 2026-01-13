import "bootstrap";
import "./style.css";


const startGame = document.querySelector('#startGame');
const btnHit = document.querySelector('#btnHit');
const btnStand = document.querySelector('#btnStand');
startGame.addEventListener('click', gameStarted)
btnHit.addEventListener('click', oneMoreCard)
btnStand.addEventListener('click', noMoreCards)

function welcomeMessage() {
  return alert("Welcome!!, Let's get fun playing this simple Black Jack game by ErosDevFS. Press 'OK' to start. Have fun!")
}

function gameStarted() {
  const dealer = document.querySelector(".dealer");
  const player = document.querySelector(".player");
  const machine = document.querySelector(".machine");
  const btnStart = document.querySelector(".start-game");
  const cards = document.querySelectorAll(".cards");
  btnStart.style.display = "none"
  dealer.style.display = "flex"
  player.style.display = "flex"
  machine.style.display = "flex"

  setTimeout(() => {
    cards[0].classList.add("deal-player")
  }, 2000)
  setTimeout(() => {
    cards[3].classList.add("deal-player-second")
  }, 6000)
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    playerCards.appendChild(renderCard(randomCard));
    document.querySelector("#pointsPlayer").textContent = randomCard.points

  }, 5000);
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    playerCards.appendChild(renderCard(randomCard));
    sumPoints('player', randomCard)
  }, 6000);

  setTimeout(() => {
    cards[1].classList.add("deal-dealer")
  }, 3000)
  setTimeout(() => {
    cards[4].classList.add("deal-dealer-second")
  }, 7000)
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    dealerCards.appendChild(renderCard(randomCard));
    document.querySelector("#pointsDealer").textContent = randomCard.points
  }, 6000);
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    dealerCards.appendChild(renderCard(randomCard));
    sumPoints('dealer', randomCard)
  }, 7000);

  setTimeout(() => {
    cards[2].classList.add("deal-machine")
  }, 4000)
  setTimeout(() => {
    cards[5].classList.add("deal-machine-second")
  }, 8000)
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    machineCards.appendChild(renderCard(randomCard));
    document.querySelector("#pointsMachine").textContent = randomCard.points
  }, 7000);
  setTimeout(() => {
    let randomCard = dealCard(mixDeck(createDeck()))
    machineCards.appendChild(renderCard(randomCard));
    sumPoints('machine', randomCard)
  }, 8000);

  setTimeout(()=> {
    let playerPoints = Number(document.querySelector('#pointsPlayer').textContent);
    //if(playerPoints === 21) return winVerificator();
    if (playerPoints < 21) {
    document.querySelector("#btnHit").style.display = "inline";
    document.querySelector("#btnStand").style.display = "inline";
    }
  }, 9000)


  
}


function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"]
  const values = [
    { value: "A", points: 11 },
    { value: "2", points: 2 },
    { value: "3", points: 3 },
    { value: "4", points: 4 },
    { value: "5", points: 5 },
    { value: "6", points: 6 },
    { value: "7", points: 7 },
    { value: "8", points: 8 },
    { value: "9", points: 9 },
    { value: "10", points: 10 },
    { value: "J", points: 10 },
    { value: "Q", points: 10 },
    { value: "K", points: 10 }
  ]

  const deck = []

  for (let suit of suits) {
    for (let val of values) {
      deck.push({ suit, ...val })
    }
  }
  return deck
}

function mixDeck(deck) {
  return (deck.sort(() => Math.random() - 0.5))
}

function dealCard(deck) {
  return deck.pop()
}

function renderCard(card) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add(card.suit === "♥" || card.suit === "♦" ? "red" : "black");

  div.innerHTML = `
    <span class="top">${card.value} ${card.suit}</span>
    <span class="center">${card.suit}</span>
    <span class="bottom">${card.value} ${card.suit}</span>
  `;

  return div;
}

function sumPoints(player, card) {
  if (player === 'player') player = '#pointsPlayer';
  if (player === 'dealer') player = "#pointsDealer";
  if (player === 'machine') player = "#pointsMachine";
  let actualPoints = Number(document.querySelector(player).textContent);
  actualPoints += card.points;
  return document.querySelector(player).textContent = String(actualPoints);

}


function oneMoreCard() {
  const machinePoints = Number(document.querySelector("#pointsMachine").textContent);
  const dealerPoints = Number(document.querySelector("#pointsDealer").textContent);
  const playerPoints = Number(document.querySelector("#pointsPlayer").textContent);
  //Evaluar si los demas pueden pedir una carta mas o no.
  if(playerPoints >= 21){
    document.querySelector("#btnHit").style.display = "none"
    document.querySelector("#btnStand").style.display = "none" 
    return;
  }
  let randomPlayerCard = dealCard(mixDeck(createDeck()));
  playerCards.appendChild(renderCard(randomPlayerCard));
  sumPoints('player', randomPlayerCard)
  //DONE: Si "MACHINE" tiene 18 puntos, elige "STAND"
  if (machinePoints < 18) {
    let randomCard = dealCard(mixDeck(createDeck()));
    machineCards.appendChild(renderCard(randomCard));
    sumPoints('machine', randomCard)
  }
  //Si el "DEALER" tiene menos de 21 puntos, && "PLAYER" tiene 21 debe seguir jugando || Si "DEALER" tiene menos puntos que "PLAYER" debe seguir jugando "DEALER".
  if ((dealerPoints < 21 && playerPoints === 21) || (dealerPoints <= playerPoints && dealerPoints < 22)) {
    let randomCard = dealCard(mixDeck(createDeck()));
    dealerCards.appendChild(renderCard(randomCard));
    sumPoints('dealer', randomCard)
  }
  //"DEALER" debe parar de jugar solo si "PLAYER" presiono "STAND" y los puntos de "PLAYER" no son mayores o iguales a los de "DEALER".
 
}

function noMoreCards() {

}

function winVerificator(){
  const machinePoints = Number(document.querySelector("#pointsMachine").textContent);
  const dealerPoints = Number(document.querySelector("#pointsDealer").textContent);
  const playerPoints = Number(document.querySelector("#pointsPlayer").textContent);

  if((playerPoints < 22 && playerPoints > dealerPoints && playerPoints > machinePoints) || (machinePoints > 21 && playerPoints < 22) || (dealerPoints > 21 && playerPoints < 22 )) {
    document.querySelector('.you').textContent = "You 👑 WON!";
  }

  //Alternativa, no colocar si los otros "Jugadores" ganaron, simplemente si perdiste abrir un modal, donde puedas elegir si volver a jugar nuevamente o regresar al menu de inicio.

  if((dealerPoints < 22 && dealerPoints > playerPoints && dealerPoints > machinePoints) || (machinePoints > 21 && dealerPoints < 22) || (playerPoints > 21 && dealerPoints < 22 )) {
    document.querySelector('.dealer').textContent = "Dealer 👑 WON!";
  }

  if((machinePoints < 22 && machinePoints > dealerPoints && machinePoints > playerPoints) || (playerPoints > 21 && machinePoints < 22) || (dealerPoints > 21 && machinePoints < 22 )) {
    document.querySelector('.machine').textContent = "Machine 👑 WON!";
  }
  //Siguientes condicionales, debo verificar lo siguiente:
  //Alguien se paso de 21 puntos? Si es asi, perdio, si no, continue
  //Hay mas de 1 persona con 21 puntos? si es asi, empate, si no continue
  return;

}

//window.addEventListener("DOMContentLoaded", welcomeMessage)