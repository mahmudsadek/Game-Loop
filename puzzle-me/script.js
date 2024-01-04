var rows = 4;
var columns = 4;
var moves = 30;
var original = ["me/16.jpg","me/15.jpg","me/14.jpg","me/13.jpg",
                "me/12.jpg","me/11.jpg","me/10.jpg","me/9.jpg",
                "me/8.jpg","me/7.jpg","me/6.jpg","me/5.jpg",
                "me/4.jpg","me/3.jpg","me/2.jpg","me/1.jpg"];
var check =0 ;
var popUp_winner = document.querySelector('.win');
var popUp_loser = document.querySelector('.lose');







for (var j = 0; j < columns * rows; j++) {
    var imgblank = document.createElement("img");
    imgblank.src = "me/blank.jpg";
    imgblank.draggable = true;

    imgblank.addEventListener("dragstart", handleDragStart);
    document.querySelectorAll('#game .row .col-3')[j].appendChild(imgblank);
    imgblank.addEventListener("dragover", handleDragOver);
    imgblank.addEventListener("drop", handleDrop);

}

var generatedNums = [];
for (var i = 0; i < columns * rows; i++) {
    var gameblank = document.createElement("img");
    var rndInt = Math.floor(Math.random() * 16)+1;
    for(var j  =0 ; j < generatedNums.length; j++) {
        while(rndInt == generatedNums[j]) {
            rndInt = Math.floor(Math.random() * 16)+1;
            j = 0;
        }
    }
    gameblank.src = "me/" + (rndInt) + ".jpg";
    generatedNums.push(rndInt);
    gameblank.draggable = true;

    gameblank.addEventListener("dragstart", handleDragStart);
    document.querySelectorAll('.slicesImg')[i].appendChild(gameblank);

    gameblank.addEventListener("dragover", handleDragOver);
    gameblank.addEventListener("drop", handleDrop);


}





var draggedImg;

function handleDragStart(e) {
    draggedImg = e.target;
    e.dataTransfer.setData("name", e.target.src);


}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    var draggedSrc = e.dataTransfer.getData("name");

    var targetSrc = e.target.src;
    draggedImg.src = targetSrc;


    e.target.src = draggedSrc;


    if (draggedSrc != targetSrc) {
        moves--;

    }




    updateMoves();

    document.getElementById("bubble").play();
    checkMoves();
}




function updateMoves() {


    document.getElementById("move").lastElementChild.textContent = moves;

}


var images = document.querySelectorAll(".slicesImg img");
var index = 0;


var played = document.querySelectorAll(".frame img");




var button = document.getElementById("btn");
button.addEventListener("click", function () {
    for (var L = 0; L <= 15; L++) {
        // console.log(original[L]  +  "   " + played[L].src);
       var converted= String(played[L].src)
        if ( converted.includes(original[L])) {

            check++;
        }



    }

    if (check >= 16) {
        document.getElementById("win").play();
        popUp_winner.classList.remove("d-none");

    } else {
        document.getElementById("lose").play();
         popUp_loser.classList.remove("d-none")

        
    }

})

var button = document.getElementById("btn2");
button.addEventListener("click", function () {
    for (var L = 0; L <= 15; L++) {
        // console.log(original[L]  +  "   " + played[L].src);
       var converted= String(played[L].src)
        if ( converted.includes(original[L])) {

            check++;
        }



    }

    if (check >= 16) {
        document.getElementById("win").play();
        popUp_winner.classList.remove("d-none");

    } else {
        document.getElementById("lose").play();
         popUp_loser.classList.remove("d-none")

        
    }

})




function checkMoves() {
    if (moves === 0) {
        if (check == 16) {
            document.getElementById("win").play();
            popUp_winner.classList.remove("d-none");

        } else {
            document.getElementById("lose").play();
            popUp_loser.classList.remove("d-none")

        }
    }
   
}


var close_winner = document.querySelector('.close-winner');
close_winner.addEventListener('click',()=> {
    popUp_winner.classList.add('d-none');
   location.reload();

})
var close_loser = document.querySelector('.close-loser');
close_loser.addEventListener('click',()=> {
    popUp_loser.classList.add('d-none');
   location.reload();

})
