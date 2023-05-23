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

//Función efecto confeti:
function generateConfetti() {
  confetti({
    particleCount: 800, // Ajusta el número de confetis generados
    spread: 360,
    origin: { y: 0.6 },
    colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585'],
  });
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

      generateConfetti();

    }

  } else {
    flippedCards.forEach(card => card.setAttribute('src', './images/interrogante.jpg'));
    flippedCards = [];
  }
}


