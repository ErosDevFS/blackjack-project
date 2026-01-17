import "bootstrap";
import "./style.css";
import Swal from 'sweetalert2';




const startGame = document.querySelector('#startGame');
const btnHit = document.querySelector('#btnHit');
const btnStand = document.querySelector('#btnStand');
startGame.addEventListener('click', gameStarted)
btnHit.addEventListener('click', oneMoreCard)
btnStand.addEventListener('click', noMoreCards)

function welcomeMessage() {
  Swal.fire({
    title:"Welcome",
    imageUrl: "https://www.shutterstock.com/image-vector/cartoon-ace-king-queen-jack-600nw-2455635703.jpg",
    imageWidth: 400,
    imageHeight: 200,
    confirmButtonColor: "#121212",
    confirmButtonText: "LETS BEGIN",
    padding: "0.5em",
    color: "#f8f9fa",
    background: "linear-gradient(135deg, #5a0f14 0%, #7a1a1f 50%, #5a0f14 100%)",
    backdrop: `
    #000000
    url("https://images.squarespace-cdn.com/content/v1/6168c17121323e3baa39fcc1/1634264647890-E4IIVFDN9ZNX7UB92IE5/blackjack.gif")
    center top
    no-repeat
  `
  });
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

  setTimeout(() => {
    let playerPoints = Number(document.querySelector('#pointsPlayer').textContent);
    if(playerPoints == 21) return resultVerificator();
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



//EN ESTA FUNCION DEBO ARREGLAR QUE CUANDO PRESIONE "HIT" Y LA CARTA SEA MAYOR A 21 DIRECTAMENTE APAREZCA UN LOSE MODAL, SIN NECESIDAD DE PRESIONARLO NUEVAMENTE 
function oneMoreCard() {
  const machinePoints = Number(document.querySelector("#pointsMachine").textContent);
  const dealerPoints = Number(document.querySelector("#pointsDealer").textContent);
  const playerPoints = Number(document.querySelector("#pointsPlayer").textContent);

 
  if (machinePoints < 18) {
    let randomCard = dealCard(mixDeck(createDeck()));
    machineCards.appendChild(renderCard(randomCard));
    sumPoints('machine', randomCard)
  }
  if ((dealerPoints < 22 && playerPoints === 21) || (dealerPoints <= playerPoints && dealerPoints < 22)) {
    let randomCard = dealCard(mixDeck(createDeck()));
    dealerCards.appendChild(renderCard(randomCard));
    sumPoints('dealer', randomCard)
  }

  let randomPlayerCard = dealCard(mixDeck(createDeck()));
  playerCards.appendChild(renderCard(randomPlayerCard));
  sumPoints('player', randomPlayerCard)
}

function noMoreCards() {
  const machinePoints = Number(document.querySelector("#pointsMachine").textContent);
  const dealerPoints = Number(document.querySelector("#pointsDealer").textContent);
  const playerPoints = Number(document.querySelector("#pointsPlayer").textContent);

  if ((dealerPoints < 22 && playerPoints === 21) || (dealerPoints <= playerPoints && dealerPoints < 22)) {
    let randomCard = dealCard(mixDeck(createDeck()));
    dealerCards.appendChild(renderCard(randomCard));
    sumPoints('dealer', randomCard)
    setTimeout(()=>{
      return resultVerificator()},3000)
  }

  if (machinePoints < 18) {
    let randomCard = dealCard(mixDeck(createDeck()));
    machineCards.appendChild(renderCard(randomCard));
    sumPoints('machine', randomCard)
  }

  document.querySelector("#btnHit").style.display = "none"
  document.querySelector("#btnStand").style.display = "none"
  return resultVerificator();
}

function resultVerificator() {
  const machinePoints = Number(document.querySelector("#pointsMachine").textContent);
  const dealerPoints = Number(document.querySelector("#pointsDealer").textContent);
  const playerPoints = Number(document.querySelector("#pointsPlayer").textContent);

  if (playerPoints > 21) {
    document.querySelector("#btnHit").style.display = "none"
    document.querySelector("#btnStand").style.display = "none"
    return loseModal();
  }

  if (((playerPoints > dealerPoints && dealerPoints > 21) && (playerPoints > machinePoints && machinePoints > 21)) || (machinePoints > 21 && playerPoints < 22 && dealerPoints > 21 && playerPoints < 22)) {
    document.querySelector("#btnHit").style.display = "none"
    document.querySelector("#btnStand").style.display = "none"
    return winModal();
  }

  if(playerPoints == dealerPoints || playerPoints == machinePoints){
    document.querySelector("#btnHit").style.display = "none"
    document.querySelector("#btnStand").style.display = "none"
    return drawModal();
  }

  if((playerPoints < dealerPoints && dealerPoints <= 21) || (playerPoints < machinePoints && machinePoints <= 21)){
    document.querySelector("#btnHit").style.display = "none"
    document.querySelector("#btnStand").style.display = "none"
    return loseModal();
  }

}

function winModal() {
  const modalWhenYouWin = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning"
    },
    buttonsStyling: false
  });
  modalWhenYouWin.fire({
    title: "YOU WIN!",
    text: "Press Go Back to restart",
    color: "#ffffff",
    background: "radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 55%),  linear-gradient(135deg, #1f8f4a, #0f5e3a)",
    showCancelButton: false,
    confirmButtonText: "Go Back",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });

}

function loseModal() {
  const modalWhenYouLose = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning"
    },
    buttonsStyling: false
  });
  modalWhenYouLose.fire({
    title: "YOU LOSE",
    text: "Press Go Back to restart",
    color: "#ffffff",
    background: "radial-gradient(circle at center, rgba(0,0,0,0.25), transparent 60%), linear-gradient(135deg, #7a1111, #3d0707)",
    showCancelButton: false,
    confirmButtonText: "Go Back",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}


function drawModal() {
  const modalWhenDraw = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-warning"
    },
    buttonsStyling: false
  });
  modalWhenYouWin.fire({
    title: "DRAW",
    text: "Press Go Back to restart",
    color: "#eaeaea",
    background: "linear-gradient(135deg, #2b2f2e, #3a4a45)",
    showCancelButton: false,
    confirmButtonText: "Go Back",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });

}

window.addEventListener("DOMContentLoaded", welcomeMessage)