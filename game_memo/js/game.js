const cardsColor = [
  "red",
  "red",
  "orange",
  "orange",
  "blue",
  "blue",
  "yellow",
  "yellow",
  "lightgreen",
  "lightgreen",
  "brown",
  "brown",
  "purple",
  "purple",
  "cadetblue",
  "cadetblue"
];
let cards = document.querySelectorAll(".card");
cards = [...cards];
const gamePairs = cards.length / 2;
let gameResult = 0;
let activeCard = "";
const activeCards = [];

const clickCard = function () {
  activeCard = this;
  if (activeCard === activeCards[0]) return;
  activeCard.classList.remove("hidden");
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    activeCards[1] = activeCard;
    cards.forEach(card => card.removeEventListener("click", clickCard));
    setTimeout(() => {
      if (activeCards[0].className === activeCards[1].className) {
        activeCards.forEach(card => card.classList.add("off"));
        gameResult++;
        cards = cards.filter(card => !card.classList.contains("off"));
        if (gameResult === gamePairs) {
          timer.stop();
          displayResults(results);
          document.getElementById('results').style.display = "flex";
        }
      } else {
        activeCards.forEach(card => card.classList.add("hidden"));
      }
      activeCard = "";
      activeCards.length = 0;
      cards.forEach(card => card.addEventListener("click", clickCard));
    }, 500);
  }
};

const init = _ => {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position, 1);
  });
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 1000);
};

