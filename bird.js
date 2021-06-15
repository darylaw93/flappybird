const title = $("<h1>").attr("id", "title").text("Flappy Bird");
$("body").append(title);

const game = $("<div>").attr("id", "game");
$("body").append(game);

game.append($("<div>").attr("id", "pipes").addClass("pipes"));
game.append($("<div>").attr("id", "hole").addClass("hole"));
game.append($("<div>").attr("id", "char"));
game.append($("<div>").attr("id", "bird"));

game.hide();
game.show();

let block = $("#pipe");
let holes = $("#hole");
let bird = $("#bird");
let birdTop = parseInt($("#bird").css("top"));
let jump = 0;
let score = 0;

console.log(birdTop);

// randomise the position of the hole
// it needs to be between -150px to -450px, the pipe is 500px
holes.on("animationiteration", () => {
  let random = -(Math.random() * 300 + 150);
  holes.css("top", random);
  score++;
});

///gravity
setInterval(function () {
  if (jump === 0) {
    bird.css("top", "+=3");
    let left = block.css("left");
    let hole = holes.css("top");

    }
  }, 15);

///////Jumping & Jumping
game.on("click", () => {
  jump = 1; //temporarily disables the gravity.
  let jumpCount = 0; //counter for "delay"
  let jumpDelay = setInterval(function () {
    if (birdTop > 5 && jumpCount < 15) {
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

console.log(score);
