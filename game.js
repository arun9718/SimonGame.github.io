var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level  "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(index){
  if(gamePattern[index]===userClickedPattern[index]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
      $("#level-title").text("Game Over! Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level  "+level);
  var randomNumber= Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function playSound(colour){
  var playAudio = new Audio("sounds/" +colour+".mp3");
  playAudio.play();
}
function animatePress(id){
  $("#"+id).addClass("pressed");
  setTimeout(function(){
      $("#"+id).removeClass("pressed");
  },100);
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
