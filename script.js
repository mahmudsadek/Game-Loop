var gameHover = document.querySelectorAll('.game-btn');
var btnClickChangeImg = document.querySelectorAll('.change-bg-img');
var gameCover = document.querySelector('#game-info');
var btnPlay = document.querySelector('.button-49');
var gameTitle = document.querySelector('#game-title');
var gameDesc = document.querySelector('#game-desc');

var imgsSrc = ['assit/1.jpg', 'assit/2.jpg', 'assit/3.jpg', 'assit/4.jpg']
var gamesDescription = ["Unleash your inner warrior in this adrenaline-pumping fight game! Engage in heart-pounding one-on-one battles, execute powerful combos, and rise through the ranks to become the ultimate champion.",
   "Dive into a world of brain-teasing challenges with our captivating puzzle game! Immerse yourself in a medley of mind-bending puzzles, from clever brainteasers to visually stunning challenges.",
   "Experience the timeless thrill of decision-making with our Rock, Paper, Scissors game! Simple yet addictive, challenge friends or test your luck against the computer in this classic showdown of rock, paper, and scissors.",
   "Ball: Maze Escape is an exhilarating puzzle adventure video game where players control a vibrant ball navigating through intricate mazes filled with walls and strategically placed holes. The goal is simple yet challenging."];
var gamesTitles = ["SAMURAI SWORDS", "PUZZLE ME", "ROCK SESSIOR PAPER", "BallRoll: Maze Escape"]
var gamesLocation = ["samuri_sword/index.html",
   "puzzle-me/index.html",
   "rock-paper-scissors/index.html",
   "BallRoll/index.html"]
// console.log(gameHover)
// console.log(gameCover)
var i = 0;
btnPlay.onclick = function (e) {
   location.href = gamesLocation[0];
}
gameTitle.innerHTML = gamesTitles[0];
gameDesc.innerHTML = gamesDescription[0];
setInterval(() => {
   if (i > 3) {
      i = 0;
   }
   gameCover.style.backgroundImage = `url("${imgsSrc[i]}")`;
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[i - 1];
   }
   gameTitle.innerHTML = gamesTitles[i];
   gameDesc.innerHTML = gamesDescription[i]
   i++;
}, 8000)

gameHover[0].addEventListener('mouseover', (e) => {
   gameCover.style.backgroundImage = 'url("assit/1.jpg")';
   console.log(btnPlay);
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[0];
   }
   gameTitle.innerHTML = gamesTitles[0];
   gameDesc.innerHTML = gamesDescription[0];
   i = 0;
})
gameHover[1].addEventListener('mouseover', (e) => {
   gameCover.style.backgroundImage = 'url(assit/2.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[1];
   }
   gameTitle.innerHTML = gamesTitles[1];
   gameDesc.innerHTML = gamesDescription[1]
   i = 1;
})
gameHover[2].addEventListener('mouseover', (e) => {
   gameCover.style.backgroundImage = 'url(assit/poster.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[2]
   }
   gameTitle.innerHTML = gamesTitles[2];
   gameDesc.innerHTML = gamesDescription[2]
   i = 2;
})
gameHover[3].addEventListener('mouseover', (e) => {
   gameCover.style.backgroundImage = 'url(assit/4.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[3];
   }
   gameTitle.innerHTML = gamesTitles[3];
   gameDesc.innerHTML = gamesDescription[3];
   i = 3;
})

btnClickChangeImg[0].addEventListener('click', (e) => {
   gameCover.style.backgroundImage = 'url(assit/1.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[0];
   }
   gameTitle.innerHTML = gamesTitles[0];
   gameDesc.innerHTML = gamesDescription[0];
   i = 0;
})
btnClickChangeImg[1].addEventListener('click', (e) => {
   gameCover.style.backgroundImage = 'url(assit/2.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[1];
   }
   gameTitle.innerHTML = gamesTitles[1];
   gameDesc.innerHTML = gamesDescription[1]
   i = 1;
})
btnClickChangeImg[2].addEventListener('click', (e) => {
   gameCover.style.backgroundImage = 'url(assit/3.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[2]
   }
   gameTitle.innerHTML = gamesTitles[2];
   gameDesc.innerHTML = gamesDescription[2];
   i = 2;
})
btnClickChangeImg[3].addEventListener('click', (e) => {
   gameCover.style.backgroundImage = 'url(assit/4.jpg)';
   btnPlay.onclick = function (e) {
      location.href = gamesLocation[3];
   }
   gameTitle.innerHTML = gamesTitles[3];
   gameDesc.innerHTML = gamesDescription[3];
   i = 3;
})
