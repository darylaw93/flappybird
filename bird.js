const title = $("<h1>").attr("id", "title").text("Flappy Bird");
const game = $("<div>").attr("id", "game");
let button = $("<button>").attr("id", "reset").text("Reset Game");

$("body").append(game);
$("body").append(title);

game.append(
  $("<div>").attr("id", "pipes").addClass("pause").addClass("resume")
);
game.append($("<div>").attr("id", "hole").addClass("pause").addClass("resume"));
game.append($("<div>").attr("id", "char"));
game.append($("<div>").attr("id", "bird").addClass("img").addClass("bird"));
let score = 0;
$("body").append($("<h2>").attr("id", "score").text("Points: " + score));
$("body").append($("<h3>").attr("id", "controls").text("Mouse 1 - Jump"));
$("body").append($("<div>").attr("id", "divButton").append(button));

let block = $("#pipes");
let holes = $("#hole");
let bird = $("#bird");
let resetButton = $("#reset");
let jump = 0;
let resume = $(".resume");

// randomise the position of the hole
// it needs to be between -150px to -450px, the pipe is 500px
//set numbers to a variable etc 300, 150
holes.on("animationiteration", () => {
  let holeHeight = 300;
  let random = -(Math.random() * holeHeight + 150);
  holes.css("top", random);
  score++;
  $("h2").text("Points: " + score);
});

//reset button
resetButton.click(function () {
  bird.css("top", 250);
  resume.addClass("pause");
  bird.addClass("bird");
  score = 0;
  $("h2").text("Points: " + 0);
  startGame();
});

///gravity
const startGame = () => {
  let gravity = setInterval(function () {
    if (jump === 0) {
      bird.css("top", "+=3");
    }

    ////collision
    let birdHeight = parseInt($("#bird").css("top"));
    let left = parseInt($("#pipes").css("left"));
    let hole = parseInt($("#hole").css("top"));
    let maxHeight = 500;
    let birdVal = -(maxHeight - birdHeight); // negative value due to the "hole" value being negative
    // if((birdHeight > 500)||((birdHeight = left)&&(birdHeight = left -50)))
    //collision done with help from google & friend.
    if (
      birdHeight > maxHeight ||
      (left < 20 && left > -50 && (birdVal < hole - 10 || birdVal > hole + 150))
    ) {
      resume.removeClass("pause");
      bird.removeClass("bird");
      clearInterval(gravity);
      $("h2").text("Game Over! Your score is " + score);
    }
  }, 10);
};

/////Jumping
game.on("click", () => {
  let birdHeight = parseInt($("#bird").css("top"));
  jump = 1; //temporarily disables the gravity.
  let jumpCount = 0; //counter for "delay"
  let jumpDelay = setInterval(function () {
    if (birdHeight > 15 && jumpCount < 15) {
      //if the css "top" value of #bird is more than 5px or
      //jumpCount is less than 15, the jump will be called.
      $("#bird").css("top", "-=5");
    } //jumps up by -5px from the top value of #bird
    if (jumpCount > 20) {
      //once 21 inputs are registered,
      //it'll have a short delay followed by a reset to 0
      clearInterval(jumpDelay);
      jump = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10); //jump function will be called every 10ms
});

startGame();
