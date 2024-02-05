function checkGenerationNumber(number) {
  return !Number.isNaN(number) && number > 0 && number % 2 === 0;
}
let timerInterval = null;
let firstCard = null;
let secondCard = null;
let isChecking = false;

/**
 * Inicia el temporizador del juego
 */
function startTimer() {
  const startTime = Date.now();
  const timerElement = document.getElementById('timer');

  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    timerElement.textContent = `${minutes}m ${seconds}s`;
  }, 1000); // Actualiza el temporizador cada segundo
}

/**
 * Mezcla las cartas en un orden aleatorio
 * @param originalCards
 * @returns {*[]}
 */
function shuffleCards(originalCards) {
  // Crear una copia del array para evitar modificar el array original
  const cards = [...originalCards];

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

/**
 * Comprueba si dos cartas son iguales
 * @param card1
 * @param card2
 * @returns {boolean}
 */
function checkMatch(card1, card2) {
  const id1 = card1.getAttribute('data-id');
  const id2 = card2.getAttribute('data-id');

  return id1 === id2;
}

/**
 * Detiene el temporizador del juego
 */
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

/**
 * Comprueba si el jugador ha ganado el juego
 */
function checkWin() {
  const allCards = document.querySelectorAll('#game-board .card');
  const matchedCards = document.querySelectorAll('#game-board .card.matched');

  // Comprobar si el número de cartas emparejadas es igual al número total de cartas
  if (allCards.length > 0 && allCards.length === matchedCards.length) {
    stopTimer();
  }
}

/**
 * Voltea una carta
 * @param card
 */
function flipCard(card) {
  if (card.classList.contains('matched')) {
    return;
  }

  card.classList.toggle('flipped');

  const flippedCards = document.querySelectorAll('#game-board .card.flipped');
  if (flippedCards.length === 2) {
    const matchFound = checkMatch(flippedCards[0], flippedCards[1]);

    if (matchFound) {
      flippedCards.forEach((flippedCard) => flippedCard.classList.add('matched'));
      checkWin();
    } else {
      setTimeout(() => {
        flippedCards.forEach((flippedCard) => flippedCard.classList.remove('flipped'));
      }, 1000); // Retraso de 1 segundo
    }
  }
}

/**
 * Maneja la selección de una carta
 * @param card
 */
function handleCardSelect(card) {
  // Evitar voltear más cartas si ya se están revisando dos cartas
  if (isChecking || card === firstCard || card.classList.contains('flipped')) {
    return;
  }

  flipCard(card);

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    isChecking = true;

    setTimeout(() => {
      if (checkMatch(firstCard, secondCard)) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        checkWin();
      } else {
        flipCard(firstCard);
        flipCard(secondCard);
      }
      firstCard = null;
      secondCard = null;
      isChecking = false;
    }, 1000);
  }
}

/**
 * Inicia el juego
 * @param cardList
 * @returns {Promise<null>}
 */
async function playGame(cardList) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  const duplicatedCardList = [...cardList, ...cardList];
  const shuffledCards = shuffleCards(duplicatedCardList);

  shuffledCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', card.pokemonId);
    // Crear la carta trasera
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `Pokemon ${card.pokemonId}`;
    cardBack.appendChild(cardImage);

    // Crear el frente de la carta
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    cardElement.appendChild(cardBack);
    cardElement.appendChild(cardFront);

    gameBoard.appendChild(cardElement);

    cardElement.addEventListener('click', () => handleCardSelect(cardElement));
  });

  startTimer();
  return timerInterval;
}

export { checkGenerationNumber, playGame };
