// Define variables
//let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cardValues = ['./images/foto1.jpeg', './images/foto2.jpeg', './images/foto3.jpeg', './images/foto4.jpeg', './images/foto5.jpeg', './images/foto6.jpeg', './images/foto7.jpg', './images/foto8_.png', './images/foto9.jpeg', './images/foto10.jpeg', './images/foto11.jpeg', './images/foto12.jpeg', './images/foto14.jpeg'];

let cards = [];
let flippedCards = [];
let matchedCards = [];

// Creamos tablero de juego:
const game = document.querySelector('.game');
for (let i = 0; i < cardValues.length; i++) {
  for (let j = 0; j < 2; j++) {
    const card = document.createElement('img');
    card.classList.add('card');
    card.dataset.value = cardValues[i];
    card.setAttribute('src', './images/interrogante.jpg');
    //card.setAttribute('src', cardValues[i])
    //card.textContent = '?';
    cards.push(card);
  }
}

// Barajar cartas:
cards.sort(() => Math.random() - 0.5);

// Add cards to game board
cards.forEach(card => {
  game.appendChild(card);
  card.addEventListener('click', flipCard);
});

// Definimos la función de voltear la tarjeta:
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    //this.textContent = this.dataset.value;
    this.setAttribute('src', this.dataset.value);
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Definimos la función que verifica el match de las tarjetas:
function checkMatch() {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    flippedCards.forEach(card => {
      matchedCards.push(card);
      card.removeEventListener('click', flipCard);
    });
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      //alert('¡Has ganado! Feliz cumpleaños, ¡TE QUEREMOS!');

      const defaults = {
        spread: 360,
        ticks: 1000,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      };

      confetti({
        ...defaults,
        particleCount: 1000,
        scalar: 2,
      });

      confetti({
        ...defaults,
        particleCount: 500,
        scalar: 3,
      });

      confetti({
        ...defaults,
        particleCount: 100,
        scalar: 4,
      });
    }
  } else {
    flippedCards.forEach(card => card.setAttribute('src', './images/interrogante.jpg'));
    flippedCards = [];
  }
}
