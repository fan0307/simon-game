var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);    
    
    level++;
    $("#level-title").text("Level " + level);

    setTimeout(function(){
    //play the sound
    playSound(randomChosenColour);    
    //animate a flash
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    },1000);
    


}

$(".btn").click(function(){
    // var userChosenColour = this.id;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    annimatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");    
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        startOver();
        
    }
}
function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function annimatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}


    



