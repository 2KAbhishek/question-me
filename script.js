let questionsData;

var colors = [
    '#1688f0',
    '#0a0a0f',
    '#0DBC79',
    '#364554',
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224'
];
var currentQuestion = '',
    currentAuthor = '';

function getQuestions() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: 'https://raw.githubusercontent.com/2KAbhishek/question-me/main/data/questions.json',
        success: function (jsonQuestions) {
            if (typeof jsonQuestions === 'string') {
                questionsData = JSON.parse(jsonQuestions);
            }
        }
    });
}

function getRandomQuestion() {
    return questionsData[
        Math.floor(Math.random() * Object.keys(questionsData).length)
    ];
}

function getQuestion() {
    let randomQuestion = getRandomQuestion();
    console.log(randomQuestion);

    currentQuestion = randomQuestion;

    $('#tweet-question').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=QuestionMe&related=2KAbhishek&text=' +
            encodeURIComponent('"' + currentQuestion)
    );

    $('.question-text').animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $('#text').text(randomQuestion);
    });

    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuestions();
    $('#new-question').on('click', getQuestion);
});
