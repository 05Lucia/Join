
/**
 * Array to test card implement!!
 */
let cards = []

async function loadTasks() {
    try {
        let result = await getItem('cards');
        if (result) {
            cards = JSON.parse(result);
            return cards;
        } else {
            console.log("No cards found in storage, returning empty array.");
            return [];
        }
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}

async function UpdateTaskInRemote() {
    await setItem('cards', cards);
    console.log("cards saved to storage", cards);
}

/**
 * Asynchronously loads all necessary functions for the board in the correct order.
 */
async function loadBoard() {
    await Templates('board');
    updateCards();
    changeNavigation()
}

/**
 * Updates navigation visuals to show the board section.
 *
 * This function removes the "clicked" class from summary and add task elements, 
 * and adds it to the board element, visually marking it as selected.
 * Additionally, it adjusts element visibility based on screen size (potentially for mobile).
 */
function changeNavigation() {
    let summary = document.getElementById('navSummary');
    let addTask = document.getElementById('navAddTask');
    let board = document.getElementById('navBoard');
    summary.classList.remove('navigation-item-clicked');
    board.classList.add('navigation-item-clicked');
    addTask.classList.remove('navigation-item-clicked');

    if (window.innerWidth < 800) {
        summary.children[1].classList.add('d-none');
        summary.children[0].classList.remove('d-none');

        board.children[0].classList.add('d-none');
        board.children[1].classList.remove('d-none');

        addTask.children[1].classList.add('d-none');
        addTask.children[0].classList.remove('d-none');
    }
}

/**
 * Updates all card sections on the board by calling individual update functions for each section ("todo", "progress", etc.).
 */
function updateCards() {
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
            let initials = user.initials;

            if (i === 0) {
                container.innerHTML += `<div style="background-color:${user.avatarColor};" class="user-initals-card">${initials} </div>`;
            } else {
                container.innerHTML += `<div style="background-color:${user.avatarColor};" class="user-initals-card overlap">${initials} </div>`;
            }
        }
    }
}

/**
 * Calculates the completion percentage for a card's progress bar based on the number of completed subtasks.
 * @param {object} card The card object containing the subtasks list.
 * @returns {number} The percentage of completed subtasks (0-100).
 */
function progressbarCompetedRate(card) {
    let allSubtasks = card.subtasks.length;
    let completeSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);

    let precentProgress = Math.floor((completeSubtask / allSubtasks) * 100);
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
function startDragging(id) {
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
    let card = cards.find(card => card.id === currentDraggedElement);
    card['place'] = '';
    card['place'] = place;
    updateCards();
    UpdateTaskInRemote();
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
        dueDateConvert(card);
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
    container.style.alignItems = "center"
    container.innerHTML = `<div class="borad-card-popup d-none" id="borad-card-popup" onclick="doNotClose(event)"></div>`
    document.body.classList.remove('body-noscroll-class');

    priorities = [];
    selectedAssignedContacts = [];
    createdSubtasks = [];
    updateCards();
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
            let initials = user.initials
            container.innerHTML += bigCardAssignedTemplate(user, initials);
        }
    } else {
        document.getElementById(`assigned-container`).classList.add('d-none')
    }
}

function dueDateConvert(card) {
    let dueDateContainer = document.getElementById('due-date');

    // Check if dueDate exists and is a string (optional safety check)
    if (!card.dueDate || typeof card.dueDate !== 'string') {
        dueDateContainer.innerText = "No due date";
        return; // Exit the function if no due date or not a string
    }

    // Split the date string into year, month, and day components
    const [year, month, day] = card.dueDate.split('-');

    // Create the formatted date string in DD.MM.YYYY format
    const formattedDueDate = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;

    dueDateContainer.innerText = formattedDueDate;
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
            updateCards();
            closeCard();
            UpdateTaskInRemote();
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
    updateCards();
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
async function boardPopupAddTask() {
    let container = document.getElementById('borad-card-overlay');

    container.innerHTML = boardPopupAddTaskWindow();


    document.getElementById('borad-card-overlay').classList.remove('d-none');
    document.body.classList.add('body-noscroll-class');
    container.style.justifyContent = "flex-end"
    container.style.alignItems = "flex-start"

    document.getElementById('addTask-popup-container').innerHTML = '<div class="fullHeight" include-AddTask="./Templates/add_task-popup.html"> </div>';
    await includeAddTask();
    changePriorityColor('mediumPriorityButton');
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
 * Searches cards based on user input, hiding unmatched & showing matches.
 * Calls NoMatchFound for empty search or no results.
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
    NoMatchFound(hasMatch, query);
}

/**
 * Handles no search results: shows message if no match, clears if query is empty or has matches.
 * @param {boolean} hasMatch - Flag indicating if any matches were found.
 * @param {string} query - The search query string.
 */
function NoMatchFound(hasMatch, query) {
    // Handle no matches scenario 
    if (!hasMatch) {
        let container = document.getElementById('no-search-results')
        container.innerText = 'No matching task found.';
    }
    if (query === '' || hasMatch) {
        document.getElementById('no-search-results').innerText = '';
    }
}

/**
 * Opens edit task popup, loads edit template, handles OK button and sets edit mode for "finish" button.
 * Calls functions to pre-fill edit form data based on provided task ID.
 *
 * @param {string} id - The ID of the task to edit.
 */
async function editTask(id) {
    const container = document.getElementById('borad-card-popup');
    container.innerHTML = EditTemplate();
    await includeAddTask();
    await templateOkBtn(id);
    const editTaskBnt = document.getElementById('finish-btn');
    editTaskBnt.classList.add('editTaskButton');
    TaskTextInEdit(id)
}

/**
 * Pre-fills edit form fields with data from the task object based on its ID.
 *
 * @param {string} id - The ID of the task to edit.
 */
function TaskTextInEdit(id) {
    // Find the card object by ID in the cards array
    const card = cards.find(card => card.id === id);

    document.getElementById('addTaskInputTitle').value = card.title;
    document.getElementById('addTaskDescriptionInput').value = card.description;
    document.getElementById('addTaskDueDateInput').value = card.dueDate;
    priorityEdit(card);
    isAssignedEdit(card);
    document.getElementById('selectTaskCategoryTextField').innerHTML = card.category.name;
    subtaskEdit(card);
}

/**
 * Sets the priority button color based on the provided card's urgency level.
 *
 * @param {object} card - The task object containing urgency information.
 */
function priorityEdit(card) {
    if (card.priority.urgency === 'Urgent') {
        changePriorityColor('urgentPriorityButton');
    } if (card.priority.urgency === 'Medium') {
        changePriorityColor('mediumPriorityButton');
    } if (card.priority.urgency === 'Low') {
        changePriorityColor('lowPriorityButton');
    }
}

/**
 * Pre-fills assigned contact information based on the provided card's assigned contacts.
 *
 * @param {object} card - The task object containing assigned contact information.
 */
function isAssignedEdit(card) {
    selectedAssignedContacts = [];
    for (let i = 0; i < card.assigned.length; i++) {
        const contact = card.assigned[i];
        let selectedContact = { name: contact.name, initials: contact.initials, avatarColor: contact.avatarColor }; // Ein Objekt mit Namen, Initialen und Avatarfarbe erstellen
        selectedAssignedContacts.push(selectedContact); // Kontakt zum Array hinzufügen
    }
    showAvatarsOfSelectedContacts();
}

/**
 * Handles pre-filling subtask data based on the provided card's subtasks.
 * (Specific details depend on your subtask implementation)
 *
 * @param {object} card - The task object containing subtask information.
 */
function subtaskEdit(card) {
    for (let i = 0; i < card.subtasks.length; i++) {
        const subtask = card.subtasks[i];
        let createdSubtasksJson = { text: subtask.text, done: subtask.done };
        createdSubtasks.push(createdSubtasksJson);
    }
    openCreatedSubtaskBox();
}

/**
 * Edits a task with the given ID.
 * 
 * @param {number} id - The ID of the task to edit.
 * 
 * @returns {void} (nothing returned)
 */
function editTaskDone(id) {
    const card = cards.find(card => card.id === id);
    let place = card.place;
    deleteUneditTask(id);

    let title = errorMessageIfEmptyTitle(); // Titel überprüfen und abrufen
    let dueDate = errorMessageIfEmptyDueDate(); // Fälligkeitsdatum überprüfen und abrufen
    let priority = priorities[0]; // Priorität abrufen
    let category = document.getElementById('selectTaskCategoryTextField').innerText.trim(); // Kategorie abrufen
    let assigned = selectedAssignedContacts; // Zugeordnete Personen abrufen
    let description = document.getElementById('addTaskDescriptionInput').value.trim(); // Beschreibung abrufen
    let subtasks = createdSubtasks; // Subtasks erstellen

    if (!checkErrors(title, dueDate, category)) {
        return; // Early exit on validation failure
    }
    const priorityImg = priorityImgCheck(priority);
    
    let matchingCategory = taskCategories.find(categoryObj => categoryObj.name === category);
    let categoryColor = matchingCategoryCheck(matchingCategory);// Farben für Kategorie abrufen

    const newCard = createCardObject(id, place, category, categoryColor, title, description, dueDate, subtasks, assigned, priority, priorityImg);

    cards.push(newCard);// Karte zum Array hinzufügen
    UpdateTaskInRemote();

    console.log('Neue Karte erstellt:', newCard); // Zur Überprüfung in der Konsole ausgeben

    emptyArrays();
    bigCard(id);
    updateCards();
}

/**
 * Checks for empty title, due date or invalid category.
 * 
 * @param {string} title - The task title.
 * @param {string} dueDate - The task due date.
 * @param {string} category - The task category.
 * 
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function checkErrors(title, dueDate, category) {
    if (!title || !dueDate || !taskCategories.some(categoryObj => categoryObj.name === category)) {
        errorMessageIfEmptyTitle(!title);
        errorMessageIfEmptyDueDate(!dueDate);
        errorMessageIfEmptyCategory(!taskCategories.some(categoryObj => categoryObj.name === category));
        return false; // Indicate validation failure
    }
    return true; // Indicate validation success
}

/**
 * Maps priority level to corresponding image path.
 * 
 * @param {string} priority - The task priority (Urgent, Medium, Low).
 * 
 * @returns {string} The image path for the priority level.
 */
function priorityImgCheck(priority) {
    if (priority == 'Urgent') {
        return './img/priorityHighInactive.svg';
    } else if (priority == 'Medium') {
        return './img/priorityMediumInactive.svg';
    } else if (priority == 'Low') {
        return './img/priorityLowInactive.svg';
    }
}

/**
 * Retrieves category color based on matching category object.
 * 
 * @param {object|null} matchingCategory - The matching category object (if found).
 * 
 * @returns {string} The category color (if match found), otherwise logs an error.
 */
function matchingCategoryCheck(matchingCategory) {
    if (matchingCategory) {
        return matchingCategory.categoryColor; // Return the color value
    } else {
        // Fall, wenn keine Übereinstimmung gefunden wurde
        console.error("Keine Übereinstimmung für die Kategorie gefunden");
    }
}

/**
 * Empties the priority, assigned contacts, and created subtasks arrays.
 * 
 * @returns {void} (nothing returned)
 */
function emptyArrays() {
    priorities = [];
    selectedAssignedContacts = [];
    createdSubtasks = [];
}

/**
 * Removes a task from the cards array by its ID.
 * 
 * @param {number} id - The ID of the task to remove.
 * 
 * @returns {void} (nothing returned)
 */
function deleteUneditTask(id) {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].id === id) {
            cards.splice(i, 1);
        }
    }
}

/**
 * Creates a new card object with specified properties.
 * 
 * @param {number} id - The task ID.
 * @param {string} place - The task placement.
 * @param {string} category - The task category name.
 * @param {string} categoryColor - The task category color.
 * @param {string} title - The task title.
 * @param {string} description - The task description.
 * @param {string} dueDate - The task due date.
 * @param {array} subtasks - An array of subtasks.
 * @param {array} assigned - An array of assigned contacts.
 * @param {string} priority - The task priority level (Urgent, Medium, Low).
 * @param {string} priorityImg - The image path for the priority level.
 * 
 * @returns {object} The newly created card object.
 */
function createCardObject(id, place, category, categoryColor, title, description, dueDate, subtasks, assigned, priority, priorityImg) {
    return {
        id: id,
        place: place,
        category: {
            name: category,
            color: categoryColor
        },
        title: title,
        description: description,
        dueDate: dueDate,
        subtasks: subtasks,
        assigned: assigned,
        priority: {
            urgency: priority,
            img: priorityImg
        }
    };
  }