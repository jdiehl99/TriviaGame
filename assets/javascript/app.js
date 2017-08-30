var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var delayButtonAlert;
var intervalId;
var countdownId;
var delayId;
var timerSet = 10;
var usedQ = 0;
var correctA = "";
var showCorrect = "";

// create object with questions, 4 possible answers, correct (a1, a2, etc)
var avengerQuestions = [{
        q: "Which actor plays Iron Man?",
        a1: "Robert Downey Jr",
        a2: "Chris Evans",
        a3: "Hugh Jackman",
        a4: "Ben Affleck",
        isright: "a1"
    },
    {
        q: "What realm does Thor call home?",
        a1: "Vanaheim",
        a2: "Valhalla",
        a3: "Alfheim",
        a4: "Asgard",
        isright: "a4"
    },
    {
        q: "What color is the hulk?",
        a1: "Black",
        a2: "Green",
        a3: "Red",
        a4: "Blue",
        isright: "a2"
    },
    {
        q: "What is Hawkeye's real name?",
        a1: "Cliff Norton",
        a2: "Jack Morton",
        a3: "Clint Barton",
        a4: "Chase Baker",
        isright: "a3"
    },
    {
        q: "Where was Black Widow born?",
        a1: "Berlin",
        a2: "Moscow",
        a3: "Leningrad",
        a4: "Stalingrad",
        isright: "a4"
    },
    {
        q: "Who played the voice of J.A.R.V.I.S.?",
        a1: "Paul Bettany",
        a2: "Jeremy Irons",
        a3: "Tim Curry",
        a4: "Sean Connery",
        isright: "a1"
    },
    {
        q: "What is Dr. Strange's profession?",
        a1: "Neurosurgeon",
        a2: "Plastic Surgeon",
        a3: "Librarian",
        a4: "Veterinarian",
        isright: "a1"
    },
    {
        q: "Loki is also known as what?",
        a1: "Thanos",
        a2: "Prince Odin",
        a3: "Sir Pranks a Lot",
        a4: "God of Mischief",
        isright: "a4"
    },
    {
        q: "What is the name of Spider-Man's girlfriend?",
        a1: "Mary-Jane",
        a2: "Princess",
        a3: "Jennifer",
        a4: "Sally Mae",
        isright: "a1"
    },
    {
        q: "What special power does the Scarlet Witch posess?",
        a1: "x-ray vision",
        a2: "super strength",
        a3: "telekinesis",
        a4: "invisibility",
        isright: "3"
    }
];


$(document).ready(function () {

    function runCountdown() {
        countdownId = setInterval(timeUp, 1000 * 10);
    }

    function stopCountdown() {
        clearInterval(countdownId);
    }

    function runTimer() {
        intervalId = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        clearInterval(intervalId);
        $('.timer').html('');
    }

    function runDelay() {
        stopDelay();
        delayId = setTimeout(grabQuestions, 1000 * 4);
    }

    function stopDelay() {
        clearTimeout(delayId);
    }

    function updateTimer() {
        timerSet--;
        if (timerSet < 0) {
            stopTimer();
        } else {
            $('.timer').html('<span class="timer-show">Time Remaining: ' + timerSet + '</span>');
        }
    }

    function grabQuestions() {
        stopTimer();
        stopDelay();
        $('.timer').html('<span class="timer-show">Time Remaining: ' + timerSet + '</span>');
        if (usedQ === avengerQuestions.length) {
            // there are no questions left, display results page
            endGame();
        } else {
            runTimer();
            runCountdown();
            // ask next questions from avengerQuestions and increase Q count
            $(".question-answer").html('<h2>' + avengerQuestions[usedQ].q + '</h2>')
                // answer 1
                .append('<button class="answer-div" value="a1"> ' + avengerQuestions[usedQ].a1 + '</button><br/>')
                // answer 2
                .append('<button class="answer-div" value="a2"> ' + avengerQuestions[usedQ].a2 + '</button><br/>')
                // answer 3
                .append('<button class="answer-div" value="a3"> ' + avengerQuestions[usedQ].a3 + '</button><br/>')
                // answer 4
                .append('<button class="answer-div" value="a4"> ' + avengerQuestions[usedQ].a4 + '</button><br/>');
            usedQ++;
            // answer was submitted
            $(".answer-div").click(function (ev2) {
                stopTimer();
                stopCountdown();
                var clickedA = $(this).val();
                chkAnswer(usedQ, clickedA);
                runDelay();
            });
        }
    }

    function chkAnswer(usedQ, clickedA) {
        tempQ = usedQ - 1;
        if (clickedA == avengerQuestions[tempQ].isright) { // answer is correct
            correctAnswers++;
            $(".question-answer").html('<h2>Correct!</h2>');
        } else { // answer is wrong
            incorrectAnswers++;
            // get correct answer from array
            var correctA = avengerQuestions[tempQ].isright;
            $.each(avengerQuestions[tempQ], function (key, value) {
                if (key == correctA) {
                    showCorrect = value;
                }
            });
            if (timerSet <= 0) {
                $(".question-answer").html('<h2>Sorry... time is up</h2>');
            } else {
                $(".question-answer").html('<h2>Sorry... that was not right</h2>');
            }
            $(".question-answer").append('The correct answer is ' + showCorrect + '<br/>');
        }
        $(".question-answer").append('<img src="assets/images/' + tempQ + '.jpg" alt="">');
        timerSet = 10;
    }

    function endGame() {
        $(".game-play").off("click", function (ev3) {
            $('.gameplay').html('');
        });
        $(".timer").empty();
        $(".question-answer").html("<h2>Game over! Here are your results</h2>");
        $(".question-answer").append("<p>Correct Answers: " + correctAnswers + "</p>");
        $(".question-answer").append("<p>Incorrect Answers: " + incorrectAnswers + "</p>");
        $(".question-answer").append("<p>Unanswered: " + unanswered + "</p>");
        $(".question-answer").append('<button type="button" class="btn btn-secondary game-play">Restart Game</button>');
    }


    // out of time, end the game & calculate results
    function timeUp() {
        stopTimer();
        stopCountdown();
        $('.timer').html('');
        unanswered++;
        chkAnswer(usedQ, "");
        runDelay();
    }

    // start button to begin game
    $(".game-play").on("click", function (ev1) {
        $('.gameplay').empty();
        grabQuestions();
    });

}); // end document ready