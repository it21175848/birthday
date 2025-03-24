const images = [
  "nukani08.jpg",
  "group.jpg",
  "vithiya.jpg",
  "thisa.jpg",
  "kiruthika.jpg",
  "salini.jpg",
];
let cards = images.concat(images); // double up for pairs
let shuffled = cards.sort(() => 0.5 - Math.random());
let gameBoard = document.getElementById("game-board");
let firstCard = null,
  secondCard = null,
  matchedPairs = 0;

shuffled.forEach((img) => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back"><img src="images/${img}" alt="Memory" /></div>
    </div>
  `;
  card.dataset.image = img;
  card.addEventListener("click", () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (card.classList.contains("flipped") || secondCard) return;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    const img1 = firstCard.dataset.image;
    const img2 = secondCard.dataset.image;

    if (img1 === img2) {
      matchedPairs++;
      resetCards();
      if (matchedPairs === images.length) {
        document.getElementById("game-message").textContent =
          "🎉 You matched all the memories!";
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetCards();
      }, 1000);
    }
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}
