// create variables for results: correct / incorrect / unanswered
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

// create object with questions, 4 possible answers, correct (a1, a2, etc)
var avengerQuestions = [
    { q: "Which actor plays Iron Man?", a1: "Robert Downey Jr", a2: "Chris Evans", a3: "Hugh Jackman", a4: "Ben Affleck", isright: "a1" },
    { q: "What realm does Thor call home?", a1: "Vanaheim", a2: "Valhalla", a3: "Alfheim", a4: "Asgard", isright: "a4" }
];


// create function to do for loop to display Q&A on screen
function grabQuestions() {
    $.each(avengerQuestions, function (index, value) {
        console.log(name, value);
        $(".question-answer")
            .append('<h2>' + value.q + '</h2>')
            // answer 1
            .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a1">'+value.a1+' ')
            // answer 2
            .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a2">'+value.a2+' ')
            // answer 3
            .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a3">'+value.a3+' ')
            // answer 4
            .append('<input id="radio' + index + '" type="radio" name="q' + index + '" value="a4">'+value.a4+' ');
    });
}



// have answers as radio buttons beneath question
// click done to submit answers


$(document).ready(function () {

    // set timer for 120 seconds
    setTimeout(timeUp, 1000 * 120);

    // out of time, end the game & calculate results
    function timeUp() {
        console.log("time is up");
        alert("time is up");
    }

    // start button to begin game
    $(".game-play").on("click", function () {
        $(".gameplay").hide();
        grabQuestions();

    }); // end start game was clicked

}); // end document ready