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
        id: 0,
        place: 'todo',
        category: 'js',
        titel: 'Test',
        description: 'irgend was ....',
        dueDate: '',
        subtasks: {
            1: {
                name: 'testing',
                done: true
            },
            2: {
                name: 'sonmthing',
                done: false
            }
        },
        assigned: {
            users: ['Alice Buchholz', 'Guest', 'Test Dummy']
        },
        priority: ''

    }
]

/**
 * to lode all the needet funktion for the bord in oder!
 */
async function lodeBoard() {
    await Templates('board');
    updateCads()
}

let currentDraggedElement;

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

    if (todo.length > 0) {
        let todoContainer =document.getElementById('todo');
        todoContainer.innerHTML = ''
        todoContainer.style.padding = '16px';

        for (let index = 0; index < todo.length; index++) {
            const card = todo[index];
            document.getElementById('todo').innerHTML += cardTemplate(card);
        }
    }
}

/**
 * lode / update the cards for the progress section of the board
 */
function progressCardUpdate() {
    let progress = cards.filter(t => t['place'] == 'progress');

    if (progress.length > 0) {
        let progressContainer = document.getElementById('progress');
        progressContainer.innerHTML = '';
        progressContainer.style.padding = '16px';

        for (let index = 0; index < progress.length; index++) {
            const card = progress[index];
            document.getElementById('progress').innerHTML += cardTemplate(card);
        }
    }
}

/**
 * lode / update the cards for the feedback section of the board
 */
function feedbackCardUpdate() {
    let feedback = cards.filter(t => t['place'] == 'feedback');

    if (feedback.length > 0) {
        let feedbackContainer = document.getElementById('feedback');
        feedbackContainer.innerHTML = '';
        feedbackContainer.style.padding ='16px';

        for (let index = 0; index < feedback.length; index++) {
            const card = feedback[index];
            document.getElementById('feedback').innerHTML += cardTemplate(card);
        }
    }
}

/**
 * lode / update the cards for the done section of the board
 */
function doneCardUpdate() {
    let done = cards.filter(t => t['place'] == 'done');

    if (done.length > 0) {
        let doneContainer = document.getElementById('done');
        doneContainer.innerHTML = '';
        doneContainer.style.padding ='16px';

        for (let index = 0; index < done.length; index++) {done
            const card = done[index];
            document.getElementById('done').innerHTML += cardTemplate(card);
        }
    }
}

// drag an drop not funtions not done jet!!
function startDraging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(event) {

}