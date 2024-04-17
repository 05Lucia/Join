
/**
 * Array to test card implement!!
 */
let cards = [
    {
        "id": 0,
        "place": 'todo',
        "category": {
            "name": 'JS',
            "color": '#FFA800'
        },
        "titel": 'Test',
        "description": 'irgend was ganz langes zu scheiben ist nervig so ich hofe ich habe langsam 2 zeilen ericht und bin jetzt auch langas mal drüber und schon bei der dritten die man hoffentlich nicht sieh! Auser das ist die Große Karte.',
        "dueDate": '17.04.2024',
        "subtasks": [
            {
                "text": 'testing extra lang',
                "done": true
            },
            {
                "text": 'sonmthing',
                "done": false
            }
        ],
        "assigned": [
            {
                "name": 'Alice Buchholz',
                "color": '#7AE229'
            },
            {
                "name": 'guest',
                "color": '#FFA800'
            },
        ],
        "priority": {
            "urgency": 'Medium',
            "img": './img/priorityMediumInactive.svg'
        }
    },
    {
        "id": 1,
        "place": 'feedback',
        "category": {
            "name": 'HTML',
            "color": '#FF3D00'
        },
        "titel": 'Hallo Hallo',
        "description": 'irgend was ....',
        "dueDate": '20.04.2024',
        "subtasks": [
            {
                "text": 'testing',
                "done": true
            },
            {
                "text": 'sonmthing',
                "done": false
            },
            {
                "text": 'todo',
                "done": true
            }
        ],
        "assigned": [],
        "priority": {
            "urgency": 'Urgent',
            "img": './img/priorityHighInactive.svg'
        }
    },
    {
        "id": 2,
        "place": 'progress',
        "category": {
            "name": 'CSS',
            "color": '#005DFF'
        },
        "titel": 'test ohne Subtask',
        "description": 'test test 0 von 0!',
        "dueDate": '',
        "subtasks": [],
        "assigned": [
            {
                "name": 'Alice Buchholz',
                "color": '#7AE229'
            },
            {
                "name": 'Test Dummy',
                "color": '#005DFF'
            },
            {
                "name": 'Someone Else',
                "color": '#005DFF'
            }
        ],
        "priority": {
            "urgency": 'low',
            "img": './img/priorityLowInactive.svg'
        }
    }
]

/**
 * Asynchronously loads all necessary functions for the board in the correct order.
 */
async function lodeBoard() {
    await Templates('board');
    updateCads()
}

/**
 * Updates all card sections on the board by calling individual update functions for each section ("todo", "progress", etc.).
 */
function updateCads() {
    todoCardUpdate();
    progressCardUpdate();
    feedbackCardUpdate();
    doneCardUpdate();
}

/**
 * Updates the cards in the specified section of the board ("todo", "progress", etc.).
 * @param {string} todo The name of the board section to update.
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
    } else {
        todoContainer.style.padding = '0px';
        todoContainer.innerHTML = '<div class="no-task-div">No tasks To do</div>';
    }
}

/**
 * Updates the cards in the specified section of the board ("todo", "progress", etc.).
 * @param {string} progress The name of the board section to update.
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
    } else {
        progressContainer.style.padding = '0px';
        progressContainer.innerHTML = '<div class="no-task-div">No tasks in progress</div>';
    }
}

/**
 * Updates the cards in the specified section of the board ("todo", "progress", etc.).
 * @param {string} feedback The name of the board section to update.
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
 * Updates the cards in the specified section of the board ("todo", "progress", etc.).
 * @param {string} done The name of the board section to update.
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
 * Initializes the assigned user initials display for a given card.
 *
 * @param {object} card - A card object containing an `assigned` array with user information.
 *        - The card object is expected to have an `assigned` property which is an array of objects.
 *        - Each object in the `assigned` array should have a `name` property (string) and a `color` property (string).
 */
function assignedInitals(card) {
    let container = document.getElementById(`assigned-container${card.id}`)
    container.innerHTML = '';
    if (card.assigned.length != 0) {
        for (let i = 0; i < card.assigned.length; i++) {
            const user = card.assigned[i];
            let names = user.name.split(' ');
            let initials = names[0].substring(0, 1).toUpperCase();

            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }

            if (i === 0) {
                container.innerHTML += `<div style="background-color:${user.color};" class="user-initals-card">${initials} </div>`;
            } else {
                container.innerHTML += `<div style="background-color:${user.color};" class="user-initals-card overlap">${initials} </div>`;
            }
        }
    }
}

/**
 * Calculates the completion percentage for a card's progress bar based on the number of completed subtasks.
 * @param {object} card The card object containing the subtasks list.
 * @returns {number} The percentage of completed subtasks (0-100).
 */
function progressbarComplitaionRate(card) {
    let allSubtasks = card.subtasks.length;
    let compleatSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);

    let precentProgress = Math.floor((compleatSubtask / allSubtasks) * 100);
    return precentProgress;
}

/**
 * A global variable to store the ID of the currently dragged card element.
 * @type {number}
 */
let currentDraggedElement;

/**
 * Sets the `currentDraggedElement` variable to the ID of the card being dragged.
 * @param {number} id The ID of the dragged card element.
 */
function startDraging(id) {
    currentDraggedElement = id;
}

/**
 * Allows dropping an element onto a designated target.
 * @param {DragEvent} ev The drag event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Updates the card's "place" property in the cards array based on the drop target.
 * @param {string} place The name of the drop target area (e.g., "todo", "progress").
 */
function drop(place) {
    cards[currentDraggedElement]['place'] = '';
    cards[currentDraggedElement]['place'] = place;
    updateCads();
}

/**
 * Opens a big card modal for a specific card based on its ID.
 * @param {number} id The ID of the card to display.
 */
function bigCard(id) {
    // Find the card object by ID in the cards array
    const card = cards.find(card => card.id === id);

    if (card) {
        // Card found, proceed with big card logic
        let container = document.getElementById('borad-card-popup');

        document.getElementById('borad-card-overlay').classList.remove('d-none');
        document.getElementById('borad-card-popup').classList.remove('d-none');
        document.body.classList.add('body-noscroll-class');

        container.innerHTML = TaskCadBigTemplate(card, id);
        bigCardAssigned(card);
        bigCardSubtasksCheck(card);
    } else {
        console.error("Card with ID", id, "not found in the cards array");
    }
}

/**
 * Closes the Popup modal.
 */
function closeCard() {
    let container = document.getElementById('borad-card-overlay');
    container.classList.add('d-none');
    container.style.justifyContent = "center";
    container.innerHTML = `<div class="borad-card-popup d-none" id="borad-card-popup" onclick="doNotClose(event)"></div>`
    document.body.classList.remove('body-noscroll-class');
}

/**
 * Prevents the close event from bubbling up when clicking inside the big card modal.
 * @param {Event} event The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Initializes the assigned user list display for the big card view based on the provided card data.
 * If the card has no assigned users, hides the container.
 *
 * @param {object} card - A card object containing an `assigned` array with user information.
 *        - The card object is expected to have an `assigned` property which is an array of objects.
 *        - Each object in the `assigned` array should have a `name` property (string) and a `color` property (string).
 */
function bigCardAssigned(card) {
    if (card.assigned.length > 0) {
        let container = document.getElementById(`assigned-container`)
        container.innerHTML = '<h2>Assigned To:</h2>';
        for (let i = 0; i < card.assigned.length; i++) {
            const user = card.assigned[i];
            let names = user.name.split(' ');
            let initials = names[0].substring(0, 1).toUpperCase();

            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }
            container.innerHTML += bigCardAssignedTemplate(user, initials);
        }
    } else {
        document.getElementById(`assigned-container`).classList.add('d-none')
    }
}

/**
 * Checks for subtasks and conditionally hides the subtasks area of the big card modal.
 * @param {object} card The card object containing the subtasks array.
 */
function bigCardSubtasksCheck(card) {
    if (card.subtasks.length > 0) {
        bigCardSubtasks(card);
    } else {
        document.getElementById('board-card-big-subtasks-arear').classList.add('d-none');
    }
}

/**
 * Populates the subtasks section of the big card modal with individual subtask details.
 * @param {object} card The card object containing the subtasks array.
 */
function bigCardSubtasks(card) {
    let container = document.getElementById('board-task-subtasks-container');
    let id = card.id
    for (let i = 0; i < card.subtasks.length; i++) {
        const subtask = card.subtasks[i];

        let taskText = subtask.text;
        let done = subtask.done;
        let img;

        if (done === true) {
            img = './img/Check button.svg';
        } else {
            img = './img/Check button unchecked.svg';
        }
        container.innerHTML += bigCardSubtaskTemplate(taskText, img, done, i, id);
    }
}

/**
 * Removes a card from the cards array and the board based on its ID.
 * @param {number} cardId The ID of the card to be deleted.
 */
function deleteTask(cardId) {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].id === cardId) {
            cards.splice(i, 1);
            updateCads()
            closeCard();
            return;
        }
    }
    console.error("Card with ID", cardId, "not found in the cards array");
}

/**
 * Updates the visual state (image) and internal completion status of a subtask.
 * Triggers UI updates and opens the big card modal for the associated card.
 *
 * @param {boolean} done - Indicates whether the subtask is marked as completed.
 * @param {number} i - The index of the subtask within the card's subtasks array.
 * @param {number} id - The ID of the card containing the subtask.
 */
function SubtaskStatus(done, i, id) {
    if (done === true) {
        subtaskNotCompleted(i, id);
    } else {
        subtaskCompleted(i, id);
    }
    updateCads();
    bigCard(id);
}

/**
 * Updates the image of a subtask to show incompletion and marks it as incomplete internally.
 *
 * @param {number} index - The index of the subtask within the card's subtasks array.
 * @param {number} cardId - The ID of the card containing the subtask.
 */
function subtaskNotCompleted(i, id) {
    document.getElementById(`subtask${i}`).src = "./img/Check button unchecked.svg";
    const card = cards.find(card => card.id === id)
    for (let index = 0; index < card.subtasks.length; index++) {
        const task = card.subtasks[index];
        if (index === i) {
            task.done = false;
        }
    }
}

/**
 * Updates the image of a subtask to show completion and marks it as completed internally.
 *
 * @param {number} index - The index of the subtask within the card's subtasks array.
 * @param {number} cardId - The ID of the card containing the subtask.
 */
function subtaskCompleted(i, id) {
    document.getElementById(`subtask${i}`).src = "./img/Check button.svg";
    const card = cards.find(card => card.id === id)
    for (let index = 0; index < card.subtasks.length; index++) {
        const task = card.subtasks[index];
        if (index === i) {
            task.done = true;
        }
    }
}

/**
 * Opens the modal for adding a new task to the board.
 * Fetches the add task template using the 'include-AddTask' attribute and injects it into the modal content.
 */
function boardPopupAddTask() {
    let container = document.getElementById('borad-card-overlay');

    container.innerHTML = boardPopupAddTaskWindow();

    document.getElementById('borad-card-overlay').classList.remove('d-none');
    document.body.classList.add('body-noscroll-class');
    container.style.justifyContent = "flex-end"
    container.style.alignItems = "flex-start"

    document.getElementById('addTask-popup-container').innerHTML = '<div include-AddTask="./Templates/add_task.html"> </div>';
    includeAddTask()
}

/**
 * Fetches and includes the content of external HTML templates marked with the 'include-AddTask' attribute.
 *
 * @async
 */
async function includeAddTask() {
    let includeElements = document.querySelectorAll('[include-AddTask]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-AddTask"); // "includes/template.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Filters and displays cards within designated containers based on a search query.
 * Searches for matches in both the card title and description.
 *
 * Handles scenarios where no cards match the search criteria.
 */
function search() {
    let query = document.getElementById('search').value.toLowerCase();
    let hasMatch = false; // Flag to track if any match is found 
    const containers = [document.getElementById('todo'), document.getElementById('progress'), document.getElementById('feedback'), document.getElementById('done')];

    for (const container of containers) {
        for (const card of container.querySelectorAll('.board-card-small')) {
            const titleText = card.querySelector('.card-title').textContent.toLowerCase();
            const descriptionText = card.querySelector('.card-description')?.textContent.toLowerCase() || ""; // Optional description handling

            const combinedText = `${titleText} ${descriptionText}`;

            if (combinedText.includes(query)) {
                card.classList.remove('d-none'); // Show matching card
                hasMatch = true;
            } else {
                card.classList.add('d-none'); // Hide non-matching card
            }
        }
    }
    // Handle no matches scenario 
    if (!hasMatch) {
        console.log("No task cards found matching the search query.");
    }
}