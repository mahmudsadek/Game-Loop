const ball = document.querySelector('.ball');
const container = document.querySelector('.game-container');
let keyDown = false;
let interval;
let ballPos;
let hitBar;

let img = document.getElementsByTagName("img");

const containerWidth = document.querySelector('.game-container').clientWidth;

let keyPressed = document.addEventListener("keydown", (event) => {
    // if (hitBar) {
    //     this.removeEventListener("keydown", keyPressed)

    // }
    if (!keyDown) {
        if (event.key == "ArrowLeft") {
            interval = setInterval(function () {
                ballPos = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
                if (ballPos > 0) {
                    ball.style.left = ballPos - 2 + "px";
                }
                else {
                    clearInterval(interval); // Stop interval if ball reaches left boundary
                }
            }, 1);
        }
        else if (event.key == "ArrowRight") {
            interval = setInterval(function () {
                ballPos = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
                if (ballPos < (containerWidth - 20)) {
                    ball.style.left = ballPos + 2 + "px";
                }
                else {
                    clearInterval(interval); // Stop interval if ball reaches right boundary
                }
            }, 1);
        }
        keyDown = true;
    }
});

document.addEventListener("keyup", () => {
    clearInterval(interval);
    keyDown = false;
});

let generateObstacles = () => {
    let bar = document.createElement("div")
    let hole = document.createElement("div")

    bar.setAttribute("class", "bars")
    hole.setAttribute("class", "hole")

    let randHolePos = Math.floor(Math.random() * (containerWidth - 100))
    hole.style.left = randHolePos + "px";
    ball.before(bar)
    ball.before(hole)


    // To save memory from leaking and make program efficient
    // We should remove elements after animation end and reach the end of co
    bar.addEventListener("animationend", () => {
        bar.remove();
    })

    hole.addEventListener("animationend", () => {
        hole.remove();
    })

}
let timerInterval;
let timing = 0;


const play = document.getElementsByTagName("button")[0];
const arrows = document.querySelector(".arrows");


let obstaclesInterval;

function playBtn() {
    // if(hitBar)
    // {
    //     hitBar = false;
    // } else if (document.querySelector(".end").style.display == "block")
    // {
    //     document.querySelector(".end").style.display == "none";
    // }
    play.style.display = "none";
    document.getElementById("btn-audio").play();
    ball.style.display = "block";

    timerInterval = setInterval(function () {
    timing++;
    document.getElementsByTagName("span")[0].textContent = "Your score: " + timing;
    }, 1000)
    obstaclesInterval = setInterval(generateObstacles, 2000);
}

play.addEventListener("click", () => {
    playBtn(); 
})




img[0].addEventListener('touchstart', (event) => {
    img[0].style.transform = "translateY(5px)";
    interval = setInterval(function () {
        ballPos = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
        if (ballPos > 0) {
            ball.style.left = ballPos - 2 + "px";
        }
        // else {
        //     clearInterval(interval); // Stop interval if ball reaches left boundary
        // }
    }, 1);

});

img[1].addEventListener('touchstart', (event) => {
    img[1].style.transform = "translateY(5px)"
    interval = setInterval(function () {
        ballPos = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
        if (ballPos < (containerWidth - 20)) {
            ball.style.left = ballPos + 2 + "px";
        }
        // else {
        //     clearInterval(interval); // Stop interval if ball reaches right boundary
        // }
    }, 1);
})


img[0].addEventListener('touchend', () => {
    clearInterval(interval);
    img[0].style.transform = "translateY(0)"
    
});

img[1].addEventListener('touchend', () => {
    clearInterval(interval);
    img[1].style.transform = "translateY(0)"
    

});


function collision(a, b) {
    let a_top = parseInt(window.getComputedStyle(a).getPropertyValue("top"));

    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        a_top + 20 > b_top && a_top < b_top + 20
    );
}


// Check Hole Collisions
function holeCollision(h, b) {
    let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left"));
    let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top"));

    let b_left = parseInt(window.getComputedStyle(b).getPropertyValue("left"));
    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        b_left > h_left && b_left < h_left + 50 &&
        h_top + 20 > b_top && h_top < b_top + 20
    );
}


let clearAllIntervals = () => {

    clearInterval(timerInterval);
    clearInterval(obstaclesInterval);
    clearInterval(collisionsInterval);
}



const checkCollisions = () => {
    const allBars = document.querySelectorAll(".bars");
    const allHoles = document.querySelectorAll(".hole");

    allBars.forEach(a => {
        let hitBar = false;

        if (collision(a, ball)) {
            hitBar = true;

            allHoles.forEach(h => {
                if (holeCollision(h, ball)) {
                    hitBar = false;
                }
            })
        }

        if (hitBar) {
            // alert("Game Over!!!");

            document.querySelectorAll(".bars").forEach(b => {
                b.remove();
            });

            document.querySelectorAll(".hole").forEach(h => {
                h.remove();
            })
            document.querySelector(".ball").remove();
            
            
            if (localStorage.getItem("highestScore") < timing || localStorage.getItem("highestScore") == undefined) {
                localStorage.setItem("highestScore", timing);
                document.getElementById("new-score-audio").play();
                document.querySelector(".end").style.display = "block";
                document.querySelector("#score").textContent += timing;
                document.querySelector("#highest").textContent = "You made a new record ✨";
                clearAllIntervals();
            }

            else {
            document.getElementById("score-audio").play();
            document.querySelector(".end").style.display = "block";
            document.querySelector("#score").textContent += timing;
            document.querySelector("#highest").textContent += (localStorage.getItem("highestScore"));
            clearAllIntervals();
            }

        }
    })

};


let collisionsInterval = setInterval(checkCollisions, 1);
