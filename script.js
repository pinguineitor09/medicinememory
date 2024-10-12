const totalCards = 16;
const availableCards = [
   'im1.jpg', 'im2.jpg', 'im3.jpg', 'im4.jpg', 'im5.jpg', 'im6.jpg', 'im7.jpg', 'im8.jpg',
   'im9.jpg', 'im10.jpg', 'im11.jpg', 'im12.jpg', 'im13.jpg', 'im14.jpg', 'im15.jpg', 'im16.jpg'
];
let cards = [];
let selectedCards = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = `
   <div class="card">
      <div class="back"></div>
      <div class="face"></div>
   </div>
`;

// Función para manejar la lógica de activación de las cartas
function activate(e) {
   if (currentMove < 2) {
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove === 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            const card1Value = selectedCards[0].dataset.value;
            const card2Value = selectedCards[1].dataset.value;

            // Verifica si las dos cartas seleccionadas coinciden según su número correlativo
            if (Math.abs(card1Value - card2Value) === 1 && Math.min(card1Value, card2Value) % 2 !== 0) {
               // Las cartas coinciden, las dejamos fijas
               selectedCards[0].classList.add('matched');
               selectedCards[1].classList.add('matched');
               selectedCards = [];
               currentMove = 0;
            } else {
               // Las cartas no coinciden, las volteamos después de un breve retraso
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

// Mezcla las imágenes de forma aleatoria
function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

// Inicializa el tablero del juego
function initializeGame() {
   shuffle(availableCards);
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);

      // Asigna el valor de la imagen a la cara de la carta
      let face = cards[i].querySelectorAll('.face')[0];
      face.style.backgroundImage = `url(images/${availableCards[i]})`;
      face.style.backgroundSize = 'cover';

      // Añade el atributo de valor de la carta (número correlativo)
      cards[i].querySelectorAll('.card')[0].dataset.value = availableCards[i].match(/\d+/)[0];  // Extrae el número de "im1.jpg", "im2.jpg", etc.

      // Añade el evento click
      cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
   }
}

// Función para resetear el juego
function resetGame() {
   currentAttempts = 0;
   document.querySelector('#stats').innerHTML = '0 intentos';
   selectedCards = [];
   currentMove = 0;

   // Volver todas las cartas a su estado inicial
   cards.forEach(card => {
      card.classList.remove('active', 'matched');
   });

   // Vuelve a barajar las cartas y reinicia el juego
   document.querySelector('#game').innerHTML = '';
   cards = [];
   initializeGame();
}

// Evento para el botón de reset
document.querySelector('#resetButton').addEventListener('click', resetGame);

// Inicializa el juego
initializeGame();

