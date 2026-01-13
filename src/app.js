import "bootstrap";
import "./style.css";

const startGame = document.querySelector('#startGame');
startGame.addEventListener('click', gameStarted)

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

  setTimeout(()=> {
    cards[0].classList.add("deal-player")
  }, 2000)
  setTimeout(()=> {
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
  
  setTimeout(()=> {
    cards[1].classList.add("deal-dealer")
  }, 3000)
  setTimeout(()=> {
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

  setTimeout(()=> {
    cards[2].classList.add("deal-machine")
  }, 4000)
  setTimeout(()=> {
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
}

function createDeck () {
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

  for(let suit of suits){
    for(let val of values){
      deck.push({suit, ...val})
    }
  }
  return deck 
}

function mixDeck(deck) {
  return (deck.sort(() => Math.random() - 0.5))
}

function dealCard(deck){
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



function sumPoints(player, card){
  if(player === 'player') player = '#pointsPlayer';
  if(player === 'dealer') player = "#pointsDealer";
  if(player === 'machine') player = "#pointsMachine";
  let actualPoints = Number(document.querySelector(player).textContent);
  actualPoints += card.points;
  return document.querySelector(player).textContent = String(actualPoints);
  
}

function oneMoreCard(){
  //Evaluar si los demas pueden pedir una carta mas o no.
  //Si "MACHINE" tiene 18 puntos, elige "STAND"
  //Si el "DEALER" tiene menos de 21 puntos, && "PLAYER" tiene 21 debe seguir jugando || Si "DEALER" tiene menos puntos que "PLAYER" debe seguir jugando "DEALER".
  //"DEALER" debe parar de jugar solo si "PLAYER" presiono "STAND" y los puntos de "PLAYER" no son mayores o iguales a los de "DEALER".

}

function noMoreCards(){
  
}

//window.addEventListener("DOMContentLoaded", welcomeMessage)