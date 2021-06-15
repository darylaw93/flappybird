const title = $("<h1>").attr("id", "title").text("Flappy Bird");
const game = $("<div>").attr("id", "game");

$("body").append(game);
$("body").append(title);
$("body").append($("<button>").attr("id", "reset").text("Reset Game"));

game.append(
  $("<div>").attr("id", "pipes").addClass("pause").addClass("resume")
);
game.append($("<div>").attr("id", "hole").addClass("pause").addClass("resume"));
game.append($("<div>").attr("id", "char"));
game.append($("<div>").attr("id", "bird").addClass("img").addClass("bird"));

let block = $("#pipes");
let holes = $("#hole");
let bird = $("#bird");
let resetButton = $("#reset");
let jump = 0;
let score = 0;
let resume = $(".resume");
$("body").append(
  $("<h2>")
    .attr("id", "score")
    .text("Points: " + score)
);

// randomise the position of the hole
// it needs to be between -150px to -450px, the pipe is 500px
holes.on("animationiteration", () => {
  let random = -(Math.random() * 300 + 150);
  holes.css("top", random);
  score++;
  $("h2").text("Points: " + score);
});

//reset
resetButton.click(function () {
  bird.css("top", 250);
  resume.addClass("pause");
  bird.addClass("bird");
  $("h2").text("Points: " + 0);
});

///gravity
setInterval(function () {
  let birdHeight = parseInt($("#bird").css("top"));
  if (jump === 0) {
    bird.css("top", "+=3");
  }
  let left = parseInt($("#pipes").css("left"));
  let hole = parseInt($("#hole").css("top"));
  let birdTop = -(500 - birdHeight);
  // if((birdHeight > 500)||((birdHeight = left)&&(birdHeight = left -50)))
  //collision done with help from google.
  if (
    birdHeight > 500 ||
    (left < 20 && left > -50 && (birdTop < hole - 10 || birdTop > hole + 150))
  ) {
    // alert("Game Over! " + "You scored " + score)
    score = 0;
    resume.removeClass("pause");
    bird.removeClass("bird");
    // alert("Game Over! Your score is " + score)
  }
}, 10);

///////Jumping & Jumping
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
