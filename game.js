var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var start = false;
var level = 0;

$(document).keydown(function() {
    if (!start) {
        start = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
})

function nextSequence() {
    userClickPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $('#' + randomColor).fadeTo(200, 0).fadeTo(100, 100);
    playSound(randomColor);
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function() {
    var userColor = $(this).attr("id");
    userClickPattern.push(userColor);
    animatePress(userColor);
    if (!checkAnswer(userClickPattern.length)) {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    } else {
        playSound(userColor);
        if (userClickPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    for (var i = 0; i < currLevel; i++) {
        if (gamePattern[i] != userClickPattern[i]) {
            return false;
        }
    }
    return true;
}

function startOver() {
    start = false;
    level = 0;
    gamePattern = [];
}