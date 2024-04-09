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

let cards =[
    {
        id: 0,
        place: 'todo',
        category : 'js',
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
        priority : ''

    }
]

async function lodeBoard (){
    await Templates('board');
    updateCads()
}

let currentDraggedElement;

function updateCads() {
    let todo = cards.filter(t => t['place'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const card = todo[index];
        document.getElementById('todo').innerHTML += cardTemplate(card);
    }

    let progress = cards.filter(t => t['place'] == 'progress');

    document.getElementById('progress').innerHTML = '';

    for (let index = 0; index < progress.length; index++) {
        const card = progress[index];
        document.getElementById('progress').innerHTML += cardTemplate(card);
    }

    let feedback = cards.filter(t => t['place'] == 'feedback');

    document.getElementById('feedback').innerHTML = '';

    for (let index = 0; index < feedback.length; index++) {
        const card = feedback[index];
        document.getElementById('feedback').innerHTML += cardTemplate(card);
    }

    let done = cards.filter(t => t['place'] == 'done');

    document.getElementById('feedback').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const card = done[index];
        document.getElementById('done').innerHTML += cardTemplate(card);
    }
}

function startDraging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(event) {

}