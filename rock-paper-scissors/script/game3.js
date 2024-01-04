var userPlace = document.getElementById("userPlace");
var userPlaceCol = document.getElementById("userPlaceCol");

var machinePlace = document.getElementById("machinePlace");
var machinePlaceCol = document.getElementById("machinePlaceCol");

var fistTag = document.getElementById("fist");
var handTag = document.getElementById("hand");
var scissorsTag = document.getElementById("scissors");

var resultRow = document.getElementById("resultRow");
var chooseRow = document.getElementById("chooseRow");
var optionImages = document.querySelectorAll(".optionImages");

var allTags;

var machineChild;
var userChild;

var winsound = document.getElementById("winSound");
var losesound = document.getElementById("loseSound");
var waitSound = document.getElementById("waitSound");

var userScorePlace = document.getElementById("userScore");
var machineScorePlace = document.getElementById("machineScore");

var userSCoreCount = 0 ;
var machineScoreCount = 0 ; 

var resultStatment = document.getElementById("resultStatment");

for (let i = 0; i < optionImages.length; i++) {
  optionImages[i].addEventListener("click", function () {
    optionImages[i].classList.add("active");

    for (let j = 0; j < optionImages.length; j++) {
      if (i !== j) {
        optionImages[j].classList.remove("active");
      }
    }

    allTags = [fistTag, handTag, scissorsTag];

    var randomNumber = Math.floor(Math.random() * 3);
    if (machineChild) {
      machineChild.remove();
      machinePlaceCol.appendChild(machinePlace).cloneNode(true);
    }

    if (userChild) {
      userChild.remove();
      userPlaceCol.appendChild(userPlace).cloneNode(true);
    }

    machinePlace.classList.add("rightShakeAnimation");
    userPlace.classList.add("leftShakeAnimation");
    resultStatment.innerHTML = "wait ...";
    waitSound.play();

    setTimeout(function () {
      machinePlace.remove();
      machineChild = allTags[randomNumber].cloneNode(true);
      machinePlaceCol.appendChild(machineChild);

      userPlace.remove();
      userChild = allTags[i].cloneNode(true);
      userPlaceCol.appendChild(userChild);

      displayResult();
    }, 2000);

    function displayResult() {
      var userChoice = document.querySelector("#userPlaceCol i");
      var machineChoice = document.querySelector("#machinePlaceCol i");

      if (userChoice.id == machineChoice.id) {
        resultStatment.innerHTML = "";
        resultStatment.innerHTML = "Draw ...";
        losesound.play();
      } else if (userChoice.id == "fist") {
        switch (machineChoice.id) {
          case "hand":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you lose ... ";
            machineScoreCount++ ; 
            machineScorePlace.innerHTML=machineScoreCount ; 
            losesound.play();
            break;

          case "scissors":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you Won !";
            userSCoreCount++ ; 
            userScorePlace.innerHTML=userSCoreCount ; 
            winsound.play();
            break;
        }
      } else if (userChoice.id == "hand") {
        switch (machineChoice.id) {
          case "fist":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you won ! ";
            userSCoreCount++ ; 
            userScorePlace.innerHTML=userSCoreCount ; 
            winsound.play();
            break;

          case "scissors":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you loose ...";
            machineScoreCount++ ; 
            machineScorePlace.innerHTML=machineScoreCount ; 
            losesound.play();
            break;
        }
      } else if (userChoice.id == "scissors") {
        switch (machineChoice.id) {
          case "hand":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you won ! ";
            userSCoreCount++ ; 
            userScorePlace.innerHTML=userSCoreCount ; 
            winsound.play();
            break;

          case "fist":
            resultStatment.innerHTML = "";
            resultStatment.innerHTML = "you loose ...";
            machineScoreCount++ ; 
            machineScorePlace.innerHTML=machineScoreCount ; 
            losesound.play();
            break;
        }
      }
    }
  });
}
