var canves = document.querySelector("canvas");
var ctx = canves.getContext("2d");

var timer =  document.querySelector('.time');
var player1Health = document.querySelector('.p1Health');
var player2Health = document.querySelector('.p2Health');
var time = 60;
var sword = new Audio('assets/sword.mp3')

var closePopUp = document.querySelector('.close');
closePopUp.addEventListener('click',()=> {
   var popUp = document.querySelector('.model-container');
   popUp.classList.add('d-none');
   location.reload();
})

function winPopUp(player) {
   var popUp = document.querySelector('.model-container');
   var winner = document.querySelector('.winner');
   var congrts = document.querySelector('.congrts');
   if(player == 'it is a tie') {
      congrts.innerHTML = 'well played'
   }
   winner.innerHTML = player;
   console.log(winner)
   console.log(popUp)
   popUp.classList.remove('d-none');
   console.log(popUp)
   
   clearInterval(setIntrvalHandelr);
   clearInterval(animateInterval);
}

var speed = 0.6;
canves.width = 1024;
canves.height = 576;

ctx.fillRect(0, 0, canves.width, canves.height);

var Player1 = {
   postion: {
      x: 0,
      y: 10
   },
   velocity: {
      x: 0,
      y: 0
   },
   width: 50,
   height: 150,
   weapon: {
      width: 100,
      height: 50
   },
   isAttacing: false,
   offset: 0,
   health: 100,
   state: 'idle',
   imgSrc: '',
   player: 1
}

var Player2 = {
   postion: {
      x: 440,
      y: 100
   },
   velocity: {
      x: 0,
      y: 0
   },
   height: 150,
   width: 70,
   weapon: {
      width: 100,
      height: 50
   },
   isAttacing: false,
   offset: 50,
   health: 100,
   state: 'idle',
   imgSrc: '',
   player: 2
}

function checkWin() {
   if(Player1.health <= 0) {
      winPopUp("Player 2 Won");
   }
   else if(Player2.health <= 0) {
      winPopUp("Player 1 Won");
   }
}

var setIntrvalHandelr = setInterval(()=>{
   // checkWin();
   if(time == 0) {
      if(Player1.health > Player2.health) {
         winPopUp("Player 1 Won");
      }
      else if(Player1.health < Player2.health) {
         winPopUp("Player 2 Won");
      }
      else {
         winPopUp("it is a tie");
      }
   }
   time--;
   timer.innerHTML = time;
},1000)

var Player1framX = 0;
var PlayerWidth = 50;
var PlayerHeigth = 70;
var Player2framX = 0;

var FrameRate1 = 0;
var FrameRate2 = 0;
var attackFrame1 = 1
var attackFrame2 = 1

function Draw(player) {
   // ctx.fillStyle = 'blue';
   var img = new Image()
   // img.src = player.imgSrc;
   // ctx.fillRect(player.postion.x, player.postion.y, 50, player.height);
   // ctx.drawImage(img, player.postion.x, player.postion.y)
   if (player.player == 1) {
      if (player.state == 'idle') {
         player.imgSrc = 'assets/samuraiMack/Idle.png'
         attackFrame1 = 1;
      }
      else if (player.state == 'move') {
         player.imgSrc = 'assets/samuraiMack/Run.png'
         attackFrame1 = 1;
      }
      else if (player.state == 'jump') {
         player.imgSrc = 'assets/samuraiMack/Jump.png'
         attackFrame1 = 1;
      }
      else if (player.state == 'attack') {
         player.imgSrc = 'assets/samuraiMack/Attack2.png'
         attackFrame1 = 2;
      }


      img.src = player.imgSrc
      ctx.drawImage(img, 80  + (Player1framX * PlayerWidth), 60, PlayerWidth, PlayerHeigth,
         player.postion.x, player.postion.y, player.width + 30, player.height);


      if (FrameRate1 % 17 == 0) {
         
         
            if (Player1framX < 12) {
               Player1framX += 4;
            }
            else {
               Player1framX = 0;
            }
         }
         FrameRate1++;
   }
   else {
      if (player.state == 'idle') {
         player.imgSrc = 'assets/kenji/Idle.png'
         attackFrame2 = 1;
      }
      else if (player.state == 'move') {
         player.imgSrc = 'assets/kenji/Run.png'
         attackFrame2 = 1;
      }
      else if (player.state == 'jump') {
         player.imgSrc = 'assets/kenji/Jump.png'
         attackFrame2 = 1;
      }
      else if (player.state == 'attack') {
         player.imgSrc = 'assets/kenji/Attack1.png'
         attackFrame2 = 2;
      }


      img.src = player.imgSrc
      ctx.drawImage(img, 80 / attackFrame2 + (Player2framX * PlayerWidth), 65, PlayerWidth, PlayerHeigth,
         player.postion.x, player.postion.y, player.width + 20, player.height);


      if (FrameRate2 % 17 == 0) {
         if (Player2framX < 12) {
            Player2framX += 4;
         }
         else {
            Player2framX = 0;
         }
      }
      FrameRate2++;
   }


}

function Update(player) {
   Draw(player);
   player.postion.y += player.velocity.y;
   player.postion.x += player.velocity.x;
   if ((player.height + player.postion.y >= canves.height - 85)) {
      player.velocity.y = 0;
   }
   else {
      player.velocity.y += speed;
      // player.velocity.x += speed; 
   }

   if (player.postion.y <= 0) {
      player.velocity.y = 0;
      setTimeout(() => {
         player.velocity.y += speed;

      }, 100)
   }

   if (player.postion.x <= 0) {
      player.velocity.x = 0;
      player.postion.x = 0;
   }
   else if (player.postion.x >= 1024 - player.width) {
      player.velocity.x = 0;
      player.postion.x = 1024 - player.width;
   }
}

function Attack(player) {
   player.isAttacing = true;
   sword.play();
   setTimeout(() => {
      player.isAttacing = false;

   }, 100);
}

function Animation() {
   // ctx.fillStyle = 'black';
   // ctx.fillRect(0, 0, canves.width, canves.height);
   var background = new Image()
   background.src = 'assets/background.png'
   ctx.drawImage(background, 0, 0)
   Update(Player1);
   Update(Player2);
   checkWin()
   // window.requestAnimationFrame(Animation);
   if (Player1.postion.x + Player1.weapon.width >= Player2.postion.x &&
      Player1.postion.x <= Player2.postion.x + Player2.width &&
      Player1.postion.y + Player1.weapon.height >= Player2.postion.y &&
      Player1.postion.y < Player2.postion.y + Player2.height &&
      Player1.isAttacing) {
      console.log("attack 1")
      Player2.health -= 10;
      player2Health.style.width = `${Player2.health}%`;
      console.log("health 2 = " + Player2.health)
      Player1.isAttacing = false;
   }
   
   if (Player2.postion.x + Player2.weapon.width - Player2.offset >= Player1.postion.x &&
      Player2.postion.x - Player2.offset <= Player1.postion.x + Player1.width &&
      Player2.postion.y + Player2.weapon.height >= Player1.postion.y &&
      Player2.postion.y < Player1.postion.y + Player1.height &&
      Player2.isAttacing) {
         
         console.log("attack 2")
         Player1.health -= 10;
         player1Health.style.width = `${Player1.health}%`;
         console.log("health 1 = " + Player1.health)
      Player2.isAttacing = false;
   }
}
var animateInterval =  setInterval(Animation, 10);

// Animation();

window.addEventListener("keydown", (e) => {
   // console.log(e.key);
   console.log(Player2.state);

   switch (e.key) {
      case 'a':
         Player1.velocity.x -= 4;
         Player1.state = 'move';
         break;
      case 'd':
         Player1.velocity.x += 4;
         Player1.state = 'move';
         break;
      case 'w':
         Player1.velocity.y -= 14;
         Player1.state = 'jump';
         break;
      case ' ':
         Attack(Player1);
         Player1.state = 'attack';
         break;
      default:
         break;
   }
   switch (e.key) {
      case 'ArrowLeft':
         Player2.velocity.x -= 4;
         Player2.state = 'move';
         break;
      case 'ArrowRight':
         Player2.velocity.x += 4;
         Player2.state = 'move';
         break;
      case 'ArrowUp':
         Player2.velocity.y -= 14;
         Player2.state = 'jump';
         break;
      case '0':
         Attack(Player2);
         Player2.state = 'attack';
         break;
      default:
         break;
   }
})

window.addEventListener("keyup", (e) => {
   // console.log(e.key);
   switch (e.key) {
      case 'a':
         Player1.velocity.x = 0;
         Player1.state = 'idle';
         break;
      case 'd':
         Player1.velocity.x = 0;
         Player1.state = 'idle';
         break;
      case 'w':
         // Player1.velocity.x = 0;
         Player1.state = 'idle';
         break;
      case ' ':
         // Player1.velocity.x = 0;
         Player1.state = 'idle';
         break;
      default:
         break;
   }
   switch (e.key) {
      case 'ArrowLeft':
         Player2.velocity.x = 0;
         Player2.state = 'idle';
         break;
      case 'ArrowRight':
         Player2.velocity.x = 0;
         Player2.state = 'idle';
         break;
      case 'ArrowUp':
         // Player2.velocity.x = 0;
         Player2.state = 'idle';
         break;
      case '0':
         // Player2.velocity.x = 0;
         Player2.state = 'idle';
         break;

      default:
         break;
   }
})


