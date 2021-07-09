questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
}, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
}, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
}, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
}, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
}];
var que = document.getElementById('question');
var cntNext = 0;
var cntPrev = 0;
var dNext = document.getElementById('next');
var dPrev = document.getElementById('prev');
var dFinish = document.getElementById('Finish');
var dict = [];
var stuChoice = {};

function display() {
    if (dict.includes('cnt' + cntNext)) {
        document.getElementById('cnt' + (cntNext - 1)).style.display = 'none';
        document.getElementById('cnt' + (cntNext)).style.display = 'block';
        cntNext++;
        cntPrev = cntNext - 1;
    } else if (cntNext < questions.length) {
        if (cntNext > 0) {
            document.getElementById('cnt' + (cntNext - 1)).style.display = 'none';
        }
        var div = document.createElement('div');
        div.setAttribute('id', 'cnt' + cntNext);
        div.setAttribute('class', 'cnt');
        div.style.display = 'block';
        var Head2 = document.createElement('h2');
        Head2.innerText = 'Question ' + (cntNext + 1);
        var pque = document.createElement('p');
        pque.innerText = questions[cntNext].question;
        div.appendChild(Head2);
        div.appendChild(pque);
        for (i = 0; i < 5; i++) {
            var divi = document.createElement('div');
            divi.setAttribute('class', 'option');
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', 'html');
            input.setAttribute('name', 'fav_language');
            input.setAttribute('value', questions[cntNext].choices[i]);
            // input.innerText = questions[cntNext].choices[i];
            var label = document.createElement('label');
            label.innerText = questions[cntNext].choices[i];
            divi.appendChild(input);
            divi.appendChild(label);
            div.appendChild(divi);
        }
        que.appendChild(div);
        cntNext++;
        cntPrev = cntNext - 1;
        dict.push('cnt' + (cntNext - 1));
    }
    displayPrevious();
    checked();
    if (cntNext == 5) {
        Finish();
    }

}

function checked() {
    var check = document.querySelectorAll('input[id="html"]');
    for (const c of check) {
        if (c.checked) {
            console.log(c.value);
            stuChoice[c.parentElement.parentElement.id] = c.value;
        }
    }
}
dNext.addEventListener('click', function() {
    if (cntNext == 5) {
        checked();
        FinishTest();
    } else {
        display();
    }
});
dPrev.addEventListener('click', function() {
    if (cntPrev > 0) {
        checked();
        document.getElementById('cnt' + (cntPrev)).style.display = 'none';
        cntPrev -= 1;
        document.getElementById('cnt' + (cntPrev)).style.display = 'block';
        cntNext = cntPrev + 1;
    }
    displayPrevious();
});

dFinish.addEventListener('click', function() {
    checked();
    allDivs = document.querySelectorAll('.cnt');
    for (const div of allDivs) {
        if (div.style.display == 'block') {
            div.style.display = 'none';
        }
    }
    correct = 0;
    for (i = 0; i < questions.length; i++) {
        console.log(stuChoice['cnt' + i]);
        console.log(questions[i].correctAnswer);
        ca = questions[i].correctAnswer
        if (questions[i].choices[ca] == stuChoice['cnt' + i]) {
            correct++;
        }
    }
    que = document.getElementById('question');
    h2 = document.createElement('h2');
    h2.innerText = correct + " out of 5 questions are correct!";
    que.appendChild(h2);
    document.getElementById('prev').style.visibility = 'hidden';
    document.getElementById('next').style.visibility = 'hidden';
    document.getElementById('Finish').style.visibility = 'hidden';
})

function displayPrevious() {
    var prev = document.getElementById('prev');
    if (document.getElementById('cnt0').style.display == 'block') {
        prev.style.visibility = 'hidden';
    } else {
        prev.style.visibility = 'visible';
    }
}

function Finish() {
    document.getElementById('Finish').style.visibility = 'visible';
}

function allButtons() {
    document.getElementById('prev').style.visibility = 'hidden'
    document.getElementById('next').style.visibility = 'visible';
    document.getElementById('Finish').style.visibility = 'hidden';
}

function render() {
    display();
    allButtons();
}
render();