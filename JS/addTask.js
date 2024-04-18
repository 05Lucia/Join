/**
 * Asynchronously loads "add task" templates and initializes functionalities.
 *
 * This function uses `async` to load templates via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Initializes "add task" functionalities with `addTaskInit`.
 *  - Updates navigation to show "Add Task" with `changeNavigationAddTask`.
 */
async function loadAddTasks() {
    await Templates('add_task');
    addTaskInit();
    changeNavigationAddTask()
}

/**
 * Initializes functionalities related to adding tasks.
 *
 * This function likely performs actions to prepare the "add task" functionality. 
 * It calls `changePriorityColor` (not provided) for potential default priority color setting.
 */
function addTaskInit() {
    changePriorityColor('mediumPriorityButton');
}

/**
 * Conditionally loads "add task" functionalities based on screen size.
 *
 * This function checks the screen width:
 *  - If the screen width is less than 800px (mobile view):
 *      - It calls `loadAddTasks` to potentially load templates and initialize adding tasks (place argument might be used for specific handling).
 *  - Otherwise (larger screens):
 *      - It calls `boardPopupAddTask` (not provided) to potentially handle adding tasks for larger screens (place argument might be used for specific handling).
 */
function openAddTaskSmallBtnBoard(place) {
    if (window.innerWidth < 800) {
        loadAddTasks(place);
    } else {
        boardPopupAddTask(place);
    }
}

/**
 * Updates navigation visuals to show the "Add Task" section.
 *
 * This function switches the visual selection to the "Add Task" navigation item.
 * Additionally, it adjusts element visibility based on screen size (potentially for mobile).
 */
function changeNavigationAddTask() {
    let addTask = document.getElementById('navAddTask');
    let board = document.getElementById('navBoard');

    board.classList.remove('navigation-item-clicked');
    addTask.classList.add('navigation-item-clicked');

    if (window.innerWidth < 800) {
        addTask.children[0].classList.add('d-none');
        addTask.children[1].classList.remove('d-none');

        board.children[1].classList.add('d-none');
        board.children[0].classList.remove('d-none');
    }
}

function errorMessageIfEmptyTitle() {
    let titleInput = document.getElementById('addTaskInputTitle');
    let errorMessage = document.querySelector('.errorMessageIfEmptyTitle');
    if (titleInput.value == "") {
        console.log('Fehler');
        errorMessage.style.visibility = 'visible';
        highlightErrorMessage(errorMessage);
    } else {
        errorMessage.style.visibility = 'hidden';
        return titleInput.value;
    }
}

function errorMessageIfEmptyDueDate() {
    let dueDateInput = document.getElementById('addTaskDueDateInput');
    let errorMessage = document.querySelector('.errorMessageIfEmptyDueDate');
    if (dueDateInput.value == "") {
        console.log('Fehler');
        errorMessage.style.visibility = 'visible';
        highlightErrorMessage(errorMessage);
    } else {
        errorMessage.style.visibility = 'hidden';
        return dueDateInput.value;
    }
}

let priorities = [];

function changePriorityColor(buttonId) {
    priorities = [];
    const button = document.getElementById(buttonId);
    const priority = button.getAttribute('data-priority');
    if (buttonId === 'urgentPriorityButton') {
        urgentPriorityButtonStylingWhenClicked(button);
    } else if (buttonId === 'mediumPriorityButton') {
        mediumPriorityButtonStylingWhenClicked(button);
    } else if (buttonId === 'lowPriorityButton') {
        lowPriorityButtonStylingWhenClicked(button);
    }
    console.log('Selected priority:', priority);
    priorities.push(priority);
}

function urgentPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('urgentPriorityButton');
    button.classList.add('clickedUrgentButton');
    document.getElementById('urgentIcon').classList.add('clickedButtonIcon');
    document.getElementById('mediumPriorityButton').classList.remove('clickedMediumButton');
    document.getElementById('mediumPriorityButton').classList.add('mediumPriorityButton');
    document.getElementById('mediumIcon').classList.remove('clickedButtonIcon');
    document.getElementById('lowPriorityButton').classList.remove('clickedLowButton');
    document.getElementById('lowPriorityButton').classList.add('lowPriorityButton');
    document.getElementById('lowIcon').classList.remove('clickedButtonIcon');
}

function mediumPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('mediumPriorityButton');
    button.classList.add('clickedMediumButton');
    document.getElementById('mediumIcon').classList.add('clickedButtonIcon');
    document.getElementById('urgentPriorityButton').classList.remove('clickedUrgentButton');
    document.getElementById('urgentPriorityButton').classList.add('urgentPriorityButton');
    document.getElementById('urgentIcon').classList.remove('clickedButtonIcon');
    document.getElementById('lowPriorityButton').classList.remove('clickedLowButton');
    document.getElementById('lowPriorityButton').classList.add('lowPriorityButton');
    document.getElementById('lowIcon').classList.remove('clickedButtonIcon');
}

function lowPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('lowPriorityButton');
    button.classList.add('clickedLowButton');
    document.getElementById('lowIcon').classList.add('clickedButtonIcon');
    document.getElementById('urgentPriorityButton').classList.remove('clickedUrgentButton');
    document.getElementById('urgentPriorityButton').classList.add('urgentPriorityButton');
    document.getElementById('urgentIcon').classList.remove('clickedButtonIcon');
    document.getElementById('mediumPriorityButton').classList.remove('clickedMediumButton');
    document.getElementById('mediumPriorityButton').classList.add('mediumPriorityButton');
    document.getElementById('mediumIcon').classList.remove('clickedButtonIcon');
}

let selectedAssignedContacts = []

function toggleAssignToDropdown() {
    var content = document.getElementById("dropdowncontacts");
    if (content.style.display == "none") {
        openAssignToDropdown();
    } else {
        closeAssignToDropdown();
    }
}

function openAssignToDropdown() {
    document.getElementById('dropdowncontacts').style.display = 'flex';
    document.getElementById('dropdowncontacts').innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let isAssigned = selectedAssignedContacts.some(item => item.name === `${contact.name} ${contact.surname}`);
        let backgroundColor = isAssigned ? "rgba(69, 137, 255, 1)" : "white";
        let textColor = isAssigned ? "white" : "black";
        let checkBoxSrc = isAssigned ? "./img/assignContactCheckChecked.svg" : "./img/assingContactCheckUnchecked.svg";

        document.getElementById('dropdowncontacts').innerHTML += /*html*/`
        <div class="dropdownEachContact" id="dropdownEachContact(${i})" style="background-color: ${backgroundColor}" onclick="assingContact(${i})">
            <div class="assignToContactAvatarAndName">
                <div class="assignToContactAvatar" style="background-color: ${contact['avatarColor']};">
                ${contact['initials']}
                </div>
                <div class="assignToContactName" id="assignToContactName(${i})" style="color: ${textColor}">
                ${contact.name} ${contact.surname}
                </div>
            </div>
            <div class="assignToCheckBox">
                <img id="assignContactCheckBox(${i})" src="${checkBoxSrc}">
            </div>
        </div>
    `;
    }
}

function closeAssignToDropdown() {
    document.getElementById('dropdowncontacts').style.display = 'none';
}

function changeCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assignContactCheckChecked.svg";
}

function changeBackCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assingContactCheckUnchecked.svg";
}


function assingContact(i) {
    let contact = contacts[i]; // Den ausgewählten Kontakt erhalten
    let fullName = `${contact.name} ${contact.surname}`; // Den kompletten Namen des Kontakts erstellen
    let initials = `${contact.name.charAt(0).toUpperCase()}${contact.surname.charAt(0).toUpperCase()}`; // Die Initialen erstellen
    let avatarColor = contact.avatarColor; // Die Avatarfarbe des Kontakts erhalten

    let contactIndex = selectedAssignedContacts.findIndex(item => item.name === fullName); // Überprüfen, ob der Kontakt bereits ausgewählt wurde

    if (contactIndex === -1) { // Wenn nicht ausgewählt wurde
        let selectedContact = { name: fullName, initials: initials, avatarColor: avatarColor }; // Ein Objekt mit Namen, Initialen und Avatarfarbe erstellen
        selectedAssignedContacts.push(selectedContact); // Kontakt zum Array hinzufügen
        checkAssignContact(i); // Die Darstellung aktualisieren
    } else { // Wenn bereits ausgewählt wurde
        selectedAssignedContacts.splice(contactIndex, 1); // Kontakt aus dem Array entfernen
        uncheckAssignContact(i); // Die Darstellung aktualisieren
    }

    console.log(selectedAssignedContacts); // Zur Überprüfung in der Konsole ausgeben
}

function checkAssignContact(i) {
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "rgba(69, 137, 255, 1)";
    document.getElementById(`assignToContactName(${i})`).style.color = "white";
    changeCheckBoxStyle(i);
    showAvatarsOfSelectedContacts();
}

function uncheckAssignContact(i) {
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "white";
    document.getElementById(`assignToContactName(${i})`).style.color = "black";
    changeBackCheckBoxStyle(i);
    showAvatarsOfSelectedContacts();
}

function showAvatarsOfSelectedContacts() {
    selectedAssignedContacts.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    document.getElementById('avatarsOfSelectedContacts').style.display = "flex";
    document.getElementById('avatarsOfSelectedContacts').innerHTML = "";
    for (let i = 0; i < selectedAssignedContacts.length; i++) {
        const contact = selectedAssignedContacts[i];
        document.getElementById('avatarsOfSelectedContacts').innerHTML += `
    <div class="assignToContactAvatar" style="background-color: ${contact['avatarColor']};">
    ${contact['initials']}
    </div>
    `;
    }
}

let taskCategories = ['Technical Task', 'User Story'];

function toggleSelectTaskCategoryDropdown() {
    var content = document.getElementById("dropdownSelectTasksCategory");
    if (content.style.display == "none") {
        openTaskCategoryDropdown();
    } else {
        closeTaskCategoryDropdown();
        errorMessageIfEmptyCategory();
    }
}

function openTaskCategoryDropdown() {
    document.getElementById('dropdownSelectTasksCategory').style.display = 'flex';
    document.getElementById('dropdownSelectTasksCategory').innerHTML = '';
    for (let i = 0; i < taskCategories.length; i++) {
        const taskCategory = taskCategories[i];
        document.getElementById('dropdownSelectTasksCategory').innerHTML += /*html*/`
        <div class="dropdownEachTaskCategory" id="dropdownEachTaskCategory(${i})" onclick="selectTaskCategory(${i})">
            ${taskCategory}
        </div>
    `;
    }
}

function closeTaskCategoryDropdown() {
    document.getElementById('dropdownSelectTasksCategory').style.display = 'none';
}

function selectTaskCategory(i) {
    let taskCategory = taskCategories[i];
    document.getElementById('selectTaskCategoryTextField').innerHTML = taskCategory;
    closeTaskCategoryDropdown();
    errorMessageIfEmptyCategory();
}

function errorMessageIfEmptyCategory() {
    let selectedCategory = document.getElementById('selectTaskCategoryTextField').textContent;
    let errorMessage = document.querySelector('.errorMessageIfEmptyCategory');
    if (selectedCategory === 'Select task category') { // Überprüfe, ob eine gültige Kategorie ausgewählt wurde
        errorMessage.style.visibility = 'visible';
        highlightErrorMessage(errorMessage);
    } else {
        errorMessage.style.visibility = 'hidden';
    }
}

function highlightErrorMessage(errorMessage) {
    errorMessage.style.animation = 'highlight 1s';
    setTimeout(() => {
        errorMessage.style.animation = '';
    }, 125);
}

let createdSubtasks = [];

function showSubtaskInputMenu() {
    document.getElementById('addTaskSubtasksIcons').innerHTML = `
<img src="./img/cancelCreateSubtask.svg" onclick="clearSubtaskInputField()">
<div class="addTaskSubtasksIconsSeperator"></div>
<img src="./img/saveCreateSubtask.svg" onclick="saveSubtaskInput()">
`;
}

function clearSubtaskInputField() {
    document.getElementById('addTaskSubtasksInput').value = '';
}

function saveSubtaskInput() {
    let createdSubtask = document.getElementById('addTaskSubtasksInput');
    createdSubtask = createdSubtask.value;
    createdSubtasks.push(createdSubtask)
    openCreatedSubtaskBox();
}

function openCreatedSubtaskBox() {
    document.getElementById('createdSubTasksBox').style.display = 'flex';
    document.getElementById('createdSubTasksBox').innerHTML = '';
    for (let i = 0; i < createdSubtasks.length; i++) {
        const subtask = createdSubtasks[i];
        document.getElementById('createdSubTasksBox').innerHTML += /*html*/`
        <div class="eachSubtask" id="eachSubtask(${i})" onclick="">
           <li>${subtask}</li>
         
           <div class="createdSubtasksIcons" id="createdSubtasksIcons">
                <img src="./img/edit.svg" onclick="">
                <div class="addTaskSubtasksIconsSeperator"></div>
                <img src="./img/deleteContactIcon.svg" onclick="deleteCreatedSubtask(${i})">
            </div>
        </div>
    `;
    }
    console.log('array', createdSubtasks);
    clearSubtaskInputField();
}

function deleteCreatedSubtask(subTastIndex) {
    createdSubtasks.splice(subTastIndex, 1);
    openCreatedSubtaskBox();
}


function resetAddTaskForm() {
    document.getElementById('addTaskInputTitle').value = '';
    document.getElementById('addTaskDescriptionInput').value = '';
    document.getElementById('addTaskDueDateInput').value = '';
    changePriorityColor('mediumPriorityButton');
    document.getElementById('avatarsOfSelectedContacts').innerHTML = "";
    selectedAssignedContacts = [];
    document.getElementById('selectTaskCategoryTextField').innerHTML = "Select task category";
    createdSubtasks = [];
    document.querySelector('.errorMessageIfEmptyTitle').style.visibility = 'hidden';
    document.querySelector('.errorMessageIfEmptyDueDate').style.visibility = 'hidden';
    document.querySelector('.errorMessageIfEmptyCategory').style.visibility = 'hidden';
}

function createTask() {
    let title = errorMessageIfEmptyTitle(); // Titel überprüfen und abrufen
    let dueDate = errorMessageIfEmptyDueDate(); // Fälligkeitsdatum überprüfen und abrufen
    let priority = priorities[0]; // Priorität abrufen
    let category = document.getElementById('selectTaskCategoryTextField').innerText.trim(); // Kategorie abrufen
    let assigned = selectedAssignedContacts; // Zugeordnete Personen abrufen
    let description = document.getElementById('addTaskDescriptionInput').value.trim(); // Beschreibung abrufen
    let subtasks = createdSubtasks.map(subtask => ({ text: subtask, done: false })); // Subtasks erstellen
    let id = cards.length > 0 ? cards[cards.length - 1].id + 1 : 0; // ID erstellen
    let place = 'todo'; // Place festlegen


    if (title == null && dueDate == null && !taskCategories.includes(category)) {
        errorMessageIfEmptyTitle();
        errorMessageIfEmptyDueDate();
        errorMessageIfEmptyCategory();
    } else if (title == null && dueDate == null) {
        errorMessageIfEmptyTitle();
        errorMessageIfEmptyDueDate();
    } else if (title == null && !taskCategories.includes(category)) {
        errorMessageIfEmptyTitle();
        errorMessageIfEmptyCategory();
    } else if (dueDate == null && !taskCategories.includes(category)) {
        errorMessageIfEmptyDueDate();
        errorMessageIfEmptyCategory();
    } else if (title == null) {
        errorMessageIfEmptyTitle();
    } else if (dueDate == null) {
        errorMessageIfEmptyDueDate();
    } else if (!taskCategories.includes(category)) {
        errorMessageIfEmptyCategory();
    } else {

        // Priorität Bildpfad festlegen
        let priorityImg;
        if (priority == 'Urgent') {
            priorityImg = './img/priorityHighInactive.svg';
        } else if (priority == 'Medium') {
            priorityImg = './img/priorityMediumInactive.svg';
        } else {
            priorityImg = './img/priorityLowInactive.svg';
        }

        // Neues Kartenobjekt erstellen
        let newCard = {
            id: id,
            place: place,
            category: {
                name: category,
                color: ''
            },
            titel: title,
            description: description,
            dueDate: dueDate,
            subtasks: subtasks,
            assigned: assigned,
            priority: {
                urgency: priority,
                img: priorityImg
            }
        };

        // Karte zum Array hinzufügen
        cards.push(newCard);

        // Zur Überprüfung in der Konsole ausgeben
        console.log('Neue Karte erstellt:', newCard);

        priorities = [];
        selectedAssignedContacts = [];
        createdSubtasks = [];
    }
}



