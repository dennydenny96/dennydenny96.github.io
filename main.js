var theCard = [];
var theDiscard = [];
var playerWinningHands = 0;
var bankerWinningHands = 0;
var tieHands = 0;
var totalHands = 0;
var myRunningChipTotal = 1000;
var playerTotal = null;
var bankerTotal = null;
var playerWins = false;
var bankerWins = false;
var resultIsATie = false;
var playerTotalCards = 0;
var bankerTotalCards = 0;
var playerHand = [];
var bankerHand = [];
var playerBet = 0;
var bankerBet = 0;
var tieBet = 0;



document
document.getElementById("shuffleButton").addEventListener("click", createCard);
document.getElementById("dealButton").addEventListener("click", dealAHand);

document.getElementById("dealButton").disabled = true;

function createCard() {
  theDiscard = [];
  theCard = [];
  createTheCard();
  shuffleTheCards(theCard);
  burnCards(theCard, theDiscard);

  function card(name, suit, value, deck, image) {
    this.name = name;
    this.image = image;
    this.suit = suit;
    this.deck = deck;
    this.value = value > 10 ? 0 : value;
  }

  function createTheCard() {
    this.names = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    this.images = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    this.decks = 8;
    if (theCard.length === 0) {
      for (var deck = 1; deck <= this.decks; deck++) {
        for (var suit = 0; suit < suits.length; suit++) {
          for (var name = 0; name < names.length; name++) {
            theCard.push(new card(this.names[name], this.suits[suit], name + 1, deck, this.images[name]))
          }
        }
      }
    }
    return theCard;
  }

  function shuffleTheCards() {
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * theCard.length);
      var location2 = Math.floor(Math.random() * theCard.length);
      var temp = theCard[location1];
      theCard[location1] = theCard[location2];
      theCard[location2] = temp;
    }
  }

  function burnCards() {
    var numBurnCards = theCard[0].value === 0 ? 10 : theCard[0].value;
    for (var i = 0; i <= numBurnCards; i++) {
      theDiscard.push(theCard.shift());
    }
    document.getElementById("dealButton").disabled = false;
    document.querySelector("myChipTotal").innerHTML = myRunningChipTotal
  }
}

function dealAHand() {
  clearTheTable();
}

function clearTheTable() {
  document.querySelector("#playerFirst .suit").innerHTML = "";
  document.querySelector("#playerFirst .image").innerHTML = "";
  document.querySelector("#playerSecond .suit").innerHTML = "";
  document.querySelector("#playerSecond .image").innerHTML = "";
  document.querySelector("#bankerFirst .suit").innerHTML = "";
  document.querySelector("#bankerFirst .image").innerHTML = "";
  document.querySelector("#bankerSecond .suit").innerHTML = "";
  document.querySelector("#bankerSecond .image").innerHTML = "";
  document.querySelector("#playerThird .suit").innerHTML = "";
  document.querySelector("#playerThird .image").innerHTML = "";
  document.querySelector("#bankerThird .suit").innerHTML = "";
  document.querySelector("#bankerThird .image").innerHTML = "";
  document.querySelector("#playerFirst").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document.querySelector("#playerSecond").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document.querySelector("#bankerFirst").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document.querySelector("#bankerSecond").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document.querySelector("#playerThird").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  document.querySelector("#bankerThird").classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
  dealFirstFourCards();
}

function dealFirstFourCards() {
  playerHand.push(theCard.shift());
  playerTotalCards++;
  bankerHand.push(theCard.shift());
  bankerTotalCards++;
  playerHand.push(theCard.shift());
  playerTotalCards++;
  bankerHand.push(theCard.shift());
  bankerTotalCards++;
  showFirstFourCards();
}

function suitChanger(suit) {
  if (suit === "Spades") {
    return "&spades;";
  }
  else if (suit === "Hearts") {
    return "&hearts;";
  }
  else if (suit === "Clubs") {
    return "&clubs;";
  }
  else if (suit === "Diamonds") {
    return "&diams;";
  }
}

function showFirstFourCards() {
  if (playerHand[0]) {
    document.querySelector("#playerFirst .suit").innerHTML = suitChanger(
      playerHand[0].suit
    );
    document.querySelector("#playerFirst .image").innerHTML =
      playerHand[0].image;
    document.querySelector("#playerFirst").classList.add(playerHand[0].suit);
  }
  if (playerHand[1]) {
    document.querySelector("#playerSecond .suit").innerHTML = suitChanger(
      playerHand[1].suit
    );
    document.querySelector("#playerSecond .image").innerHTML =
      playerHand[1].image;
    document.querySelector("#playerSecond").classList.add(playerHand[1].suit);
  }
  if (bankerHand[0]) {
    document.querySelector("#bankerFirst .suit").innerHTML = suitChanger(bankerHand[0].suit);
    document.querySelector("#bankerFirst .image").innerHTML = bankerHand[0].image;
    document.querySelector("#bankerFirst").classList.add(bankerHand[0].suit);
  }
  if (bankerHand[1]) {
    document.querySelector("#bankerSecond .suit").innerHTML = suitChanger(bankerHand[1].suit);
    document.querySelector("#bankerSecond .image").innerHTML = bankerHand[1].image;
    document.querySelector("#bankerSecond").classList.add(bankerHand[1].suit);
  }
  totalTheHands();
}

function totalTheHands() {
  playerTotal = (playerHand[0].value + playerHand[1].value) % 10;
  bankerTotal = (bankerHand[0].value + bankerHand[1].value) % 10;
  compareHandsForNaturals();
}

function compareHandsForNaturals() {
  if (playerTotal === 8 || playerTotal === 9 || bankerTotal === 8 || bankerTotal === 9) {
    compareHandsFinal();
  }
  else {
    drawThirdCards();
  }
}

function drawThirdCards() {
  if (playerTotal <= 5) {
    playerHand.push(theCard.shift());
    playerTotalCards++;
  }
  if (!playerHand[2]) {
    if (bankerTotal <= 5) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
  }
  if (playerHand[2]) {
    if (bankerTotal === 0 || bankerTotal === 1 || bankerTotal === 2) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
    else if (bankerTotal === 3 && playerHand[2].value !== 8) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
    else if (bankerTotal === 3 && playerHand[2].value === 8) {
    }
    else if (bankerTotal === 4 && [2, 3, 4, 5, 6, 7].includes(playerHand[2].value)) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
    else if (bankerTotal === 5 && [4, 5, 6, 7].includes(playerHand[2].value)) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
    else if (bankerTotal === 6 && [6, 7].includes(playerHand[2].value)) {
      bankerHand.push(theCard.shift());
      bankerTotalCards++;
    }
  }
  playerTotal = playerHand[2] ? (playerHand[0].value + playerHand[1].value + playerHand[2].value) % 10 : (playerHand[0].value + playerHand[1].value) % 10;
  bankerTotal = bankerHand[2] ? (bankerHand[0].value + bankerHand[1].value + bankerHand[2].value) % 10 : (bankerHand[0].value + bankerHand[1].value) % 10;
  showThirdCards()
}

function showThirdCards() {
  if (playerHand[2]) {
    document.querySelector("#playerThird .suit").innerHTML = suitChanger(playerHand[2].suit)
    document.querySelector("#playerThird .image").innerHTML = playerHand[2].image;
    document.querySelector("#playerThird").classList.add(playerHand[2].suit);
  }

  if (bankerHand[2]) {
    document.querySelector("#bankerThird .suit").innerHTML = suitChanger(bankerHand[2].suit)
    document.querySelector("#bankerThird .image").innerHTML = bankerHand[2].image;
    document.querySelector("#bankerThird").classList.add(bankerHand[2].suit)
  }
  compareHandsFinal();
}

function compareHandsFinal() {
  if (playerTotal > bankerTotal) {
    playerWins = true;
  }
  else if (playerTotal < bankerTotal) {
    bankerWins = true;
  }
  else if (playerTotal === bankerTotal) {
    resultIsATie = true;
  }
  countHandTotals();
}



function countHandTotals() {
  if (playerWins === true) {
    playerWinningHands++;
  }
  else if (bankerWins === true) {
    bankerWinningHands++;
  }
  else if (resultIsATie === true) {
    tieHands++;
  }
  totalHands++;
  updateRunningChipTotal();
}

function updateRunningChipTotal() {
  playerBet = parseInt(document.getElementById("playerBet").value, 10);
  bankerBet = parseInt(document.getElementById("bankerBet").value, 10);
  tieBet = parseInt(document.getElementById("tieBet").value, 10);
  myRunningChipTotal = myRunningChipTotal - playerBet - bankerBet  - tieBet;
  document.querySelector("#myChipTotal").innerHTML = myRunningChipTotal;
  if (playerWins === true) {
    myRunningChipTotal = myRunningChipTotal + 2 * playerBet;
  }
  else if (bankerWins === true) {
    myRunningChipTotal = myRunningChipTotal + 2 * bankerBet - (bankerBet * 5/100);
  }
  else if (resultIsATie === true) {
    myRunningChipTotal = myRunningChipTotal + 1 * bankerBet + 1 * playerBet + 1 * tieBet + 8 * tieBet;
  }
  document.querySelector("#myChipTotal").innerHTML = "";
  document.querySelector("#myChipTotal").innerHTML = myRunningChipTotal;
  discardCards();
}

function discardCards() {
  for (var i = 0; i < playerHand.length; i++) {
    theDiscard.push(playerHand[i])
  }
  playerHand = [];
  for (var j = 0; j < bankerHand.length; j++) {
    theDiscard.push(bankerHand[j])
  }
  bankerHand = [];
  resetAll();
}

function resetAll() {
  playerTotal = null;
  bankerTotal = null;
  playerWins = false;
  bankerWins = false;
  resultIsATie = false;
  playerTotalCards = 0;
  bankerTotalCards = 0;
  seeTheMoney();
}

function seeTheMoney() {
  if (myRunningChipTotal <= 0) {
    alert("You cannot play anymore, because you lose all your chips")
    stopTheGame();
  }
  seeTheCards();
}

function seeTheCards() {
  if (theCard.length < 52) {
    stopTheGame();
  }
}

function stopTheGame() {
  document.getElementById("dealButton").disabled = true;
  playerWinningHands = 0;
  bankerWinningHands = 0;
  tieHands = 0;
  totalHands = 0;
}