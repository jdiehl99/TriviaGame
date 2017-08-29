// create variables for results: correct / incorrect / unanswered
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var delayButtonAlert;
var timerSet = 120; // set timer to 10 seconds

// create object with questions, 4 possible answers, correct (a1, a2, etc)
var avengerQuestions = [
    { q: "Which actor plays Iron Man?", a1: "Robert Downey Jr", a2: "Chris Evans", a3: "Hugh Jackman", a4: "Ben Affleck", isright: "a1" },
    { q: "What realm does Thor call home?", a1: "Vanaheim", a2: "Valhalla", a3: "Alfheim", a4: "Asgard", isright: "a4" }
];


$(document).ready(function () {

    // set timer for 120 seconds
    setTimeout(timeUp, 1000 * timerSet);
    setInterval(updateTimer, 1000);

    // start timer display code
    function updateTimer() {
        timerSet--;
        if (timerSet < 0) {
            clearInterval();
        } else {
            $('.timer').html('<span class="timer-show">Time Remaining: '+timerSet+'</span>');
        }
    }
    // end timer code

    // create function to do for loop to display Q&A on screen
    // have answers as radio buttons beneath question
    function grabQuestions() {
        $.each(avengerQuestions, function (index, value) {
            console.log(name, value);
            $(".question-answer")
                .append('<h2>' + value.q + '</h2>')
                // answer 1
                .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a1"> ' + value.a1)
                // answer 2
                .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a2"> ' + value.a2)
                // answer 3
                .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a3"> ' + value.a3)
                // answer 4
                .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a4"> ' + value.a4);
        });
        // click done to submit answers
        $(".question-answer").append('<div class="container"><button type="submit" class="btn btn-primary game-done">Submit Answers</button></div>');
    }

    function chkAnswer() {
        $(".question-answer").html("<h2>Game over! Here are your results</h2>");
        $(".question-answer").append("<p>Correct Answers: " + correctAnswers + "</p>");
        $(".question-answer").append("<p>Incorrect Answers: " + incorrectAnswers + "</p>");
        $(".question-answer").append("<p>Unanswered: " + unanswered + "</p>");
    }

    // start button to begin game
    $(".game-play").on("click", function (ev1) {
        $(".gameplay").hide();
        grabQuestions();
    }); // end start game was clicked

    // submit button was clicked
    $("#alldone").submit(function (ev2) {
        event.preventDefault();
        console.log("submit button was clicked");
        chkAnswer();
    }); // end submit button

    // out of time, end the game & calculate results
    function timeUp() {
        chkAnswer();
    }

}); // end document ready