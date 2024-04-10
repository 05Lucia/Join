function init() {
    //login page after start animation//
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
    includeHTML();
}

/**
 * this funktion ist to open a certain Template.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html"); // "includes/template.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * This funktion is to choes the right template for a certain button
 * 
 * @param {string} template - name of the template that should be used
 */
async function Templates(template) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <div include-html="./Templates/${template}.html"> </div>
    `;
    await includeHTML();
}

/**
 * Array to test card implement!!
 */
let cards = [
    {
        "id": 0,
        "place": 'todo',
        "category": 'js',
        "titel": 'Test',
        "description": 'irgend was ganz langes zu scheiben ist nervig so ich hofe ich habe langsam 2 zeilen ericht und bin jetzt auch langas mal drüber und schon bei der dritten die man hoffentlich nicht sieh!',
        "dueDate": '',
        "subtasks": [
            {
                "name": 'testing',
                "done": true
            },
            {
                "name": 'sonmthing',
                "done": false
            }
        ],
        "assigned": ['Alice Buchholz', 'Guest', 'Test Dummy'],
        "priority": './img/priorityMediumInactive.svg'
    },
    {
        "id": 1,
        "place": 'feedback',
        "category": 'HTML',
        "titel": 'Hallo Hallo',
        "description": 'irgend was ....',
        "dueDate": '',
        "subtasks": [
            {
                "name": 'testing',
                "done": true
            },
            {
                "name": 'sonmthing',
                "done": false
            },
            {
                "name": 'todo',
                "done": true
            }
        ],
        "assigned": ['Alice Buchholz', 'Guest'],
        "priority": './img/priorityHighInactive.svg'
    },
    {
        "id": 2,
        "place": 'progress',
        "category": 'CSS',
        "titel": 'test ohne Subtask',
        "description": 'test test 0 von 0!',
        "dueDate": '',
        "subtasks": [],
        "assigned": ['Alice Buchholz', 'Test Dummy', 'Someone Else'],
        "priority": './img/priorityHighInactive.svg'
    }
]

/**
 * to lode all the needet funktion for the bord in oder!
 */
async function lodeBoard() {
    await Templates('board');
    updateCads()
}

/**
 * a function to update/lode alle the cards on the board for eacht section!!
 */
function updateCads() {
    todoCardUpdate();
    progressCardUpdate();
    feedbackCardUpdate();
    doneCardUpdate();
}

/**
 * lode / update the cards for the todo section of the board
 */
function todoCardUpdate() {
    let todo = cards.filter(t => t['place'] == 'todo');
    let todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';

    if (todo.length > 0) {
        todoContainer.style.padding = '16px';

        for (let index = 0; index < todo.length; index++) {
            const card = todo[index];
            document.getElementById('todo').innerHTML += cardTemplate(card);
            assignedInitals(card);
        }
    }else {
        todoContainer.style.padding = '0px';
        todoContainer.innerHTML = '<div class="no-task-div">No tasks To do</div>';
    }
}

/**
 * lode / update the cards for the progress section of the board
 */
function progressCardUpdate() {
    let progress = cards.filter(t => t['place'] == 'progress');
    let progressContainer = document.getElementById('progress');
    progressContainer.innerHTML = '';

    if (progress.length > 0) {
        progressContainer.style.padding = '16px';

        for (let index = 0; index < progress.length; index++) {
            const card = progress[index];
            document.getElementById('progress').innerHTML += cardTemplate(card);
            assignedInitals(card)
        }
    }else {
        progressContainer.style.padding = '0px';
        progressContainer.innerHTML = '<div class="no-task-div">No tasks in progress</div>';
    }
}

/**
 * lode / update the cards for the feedback section of the board
 */
function feedbackCardUpdate() {
    let feedback = cards.filter(t => t['place'] == 'feedback');
    let feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';

    if (feedback.length > 0) {
        feedbackContainer.style.padding = '16px';

        for (let index = 0; index < feedback.length; index++) {
            const card = feedback[index];
            document.getElementById('feedback').innerHTML += cardTemplate(card);
            assignedInitals(card)
        }
    } else {
        feedbackContainer.style.padding = '0px';
        feedbackContainer.innerHTML = '<div class="no-task-div">No tasks feedback</div>';
    }
}

/**
 * lode / update the cards for the done section of the board
 */
function doneCardUpdate() {
    let done = cards.filter(t => t['place'] == 'done');
    let doneContainer = document.getElementById('done');
    doneContainer.innerHTML = '';

    if (done.length > 0) {
        doneContainer.style.padding = '16px';

        for (let index = 0; index < done.length; index++) {
            done
            const card = done[index];
            document.getElementById('done').innerHTML += cardTemplate(card);
            assignedInitals(card)
        }
    } else {
        doneContainer.style.padding = '0px';
        doneContainer.innerHTML = '<div class="no-task-div">No tasks done</div>';
    }
}

/**
 * It is to add the initals of the people that are assinged to the task.
 * 
 * @param {Array} card is the array part that belongst to the certen task.
 */
function assignedInitals(card) {
    let container = document.getElementById(`assigned-container${card.id}`)
    container.innerHTML = '';
    for (let i = 0; i < card.assigned.length; i++) {
        const user = card.assigned[i];
        let names = user.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }

        if (i === 0) {
            container.innerHTML += `<div class="user-initals-card">${initials} </div>`;
        } else {
            container.innerHTML += `<div class="user-initals-card overlap">${initials} </div>`;
        }
    }
}

/**
 * Pecentage for the progressbar.
 * 
 * @param {array} card the arry of the card for the needet task
 * @returns to the progress bat in oder to get the right prcenteg to fill it.
 */
function progressbarComplitaionRate(card) {
    let allSubtasks = card.subtasks.length
    let compleatSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);

    let precentProgress = Math.floor((compleatSubtask / allSubtasks) * 100);
    return precentProgress
}

let currentDraggedElement;

// drag an drop not funtions not done jet!!
function startDraging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(place) {
    cards[currentDraggedElement]['place'] = '';
    cards[currentDraggedElement]['place'] = place;
    updateCads();
}