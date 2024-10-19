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

            if (Math.abs(card1Value - card2Value) === 1 && Math.min(card1Value, card2Value) % 2 !== 0) {
               selectedCards[0].classList.add('matched');
               selectedCards[1].classList.add('matched');
               selectedCards = [];
               currentMove = 0;
            } else {
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

function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function initializeGame() {
   shuffle(availableCards);
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);

      let face = cards[i].querySelector('.face');
      face.style.backgroundImage = `url(images/${availableCards[i]})`;
      face.style.backgroundSize = 'cover';

      cards[i].querySelector('.card').dataset.value = availableCards[i].match(/\d+/)[0];

      cards[i].querySelector('.card').addEventListener('click', activate);
   }
}

function resetGame() {
   currentAttempts = 0;
   document.querySelector('#stats').innerHTML = '0 intentos';
   selectedCards = [];
   currentMove = 0;

   cards.forEach(card => {
      card.classList.remove('active', 'matched');
   });

   document.querySelector('#game').innerHTML = '';
   cards = [];
   initializeGame();
}

document.querySelector('#resetButton').addEventListener('click', resetGame);

initializeGame();



