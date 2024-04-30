/**
 * Asynchronously loads "add task" templates and initializes functionalities.
 *
 * This function uses `async` to load templates via `Templates`.
 * After successful loading, it:
 *  - Initializes "add task" functionalities with `addTaskInit`.
 *  - Updates navigation to show "Add Task" with `changeNavigationAddTask`.
 */
async function loadAddTasks() {
    await Templates('add_task');
    await loadRemoteContactsOfLoggedInUser();
    addTaskInit();
    changeNavigationAddTask()
}

/**
 * Initializes functionalities related to adding tasks.
 *
 * This function likely performs actions to prepare the "add task" functionality.
 * It calls `changePriorityColor` for potential default priority color setting.
 */
function addTaskInit() {
    changePriorityColor('mediumPriorityButton');
    selectedAssignedContacts = [];
    createdSubtasks = [];
}

/**
 * Updates navigation visuals to show the "Add Task" section.
 *
 * This function switches the visual selection to the "Add Task" navigation item.
 * Additionally, it adjusts element visibility based on screen size for mobile.
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

/**
 * This function conditionally opens the "Add Task" functionality based on screen size.
 * - For small screens (less than 800px width), it calls the `loadAddTasks` function to handle adding tasks in a compact format.
 * - For larger screens, it calls the `boardPopupAddTask` function to display a popup for adding tasks).
 *
 * @param {string} place The place associated with the task.
 */
let boardPlace = "";
function openAddTaskSmallBtnBoard(place) {
    boardPlace = place;
    if (window.innerWidth < 800) {
        loadAddTasks(boardPlace);
    } else {
        boardPopupAddTask(boardPlace);
    }
}

/**
 * This function checks if the "Add Task" title input field is empty and displays an error message if so.
 * It also handles hiding the error message if the field is filled.
 *
 * @returns {string|undefined} If the title field is not empty, the function returns its value.
 *                              Otherwise, it returns for error cases is needed).
 */
function errorMessageIfEmptyTitle() {
    let titleInput = document.getElementById('addTaskInputTitle');
    let errorMessage = document.querySelector('.errorMessageIfEmptyTitle');
    if (titleInput.value == "") {
        errorMessage.style.visibility = 'visible';
        highlightErrorMessage(errorMessage);
    } else {
        errorMessage.style.visibility = 'hidden';
        return titleInput.value;
    }
}

/**
 * This function checks if the "Add Task" due date input field is empty and displays an error message if so.
 * It also handles hiding the error message if the field is filled.
 *
 * @returns {string|undefined} If the due date field is not empty, the function returns its value.
 *                              Otherwise, it returns for error cases is needed).
 */
function errorMessageIfEmptyDueDate() {
    let dueDateInput = document.getElementById('addTaskDueDateInput');
    let errorMessage = document.querySelector('.errorMessageIfEmptyDueDate');
    if (dueDateInput.value == "") {
        errorMessage.style.visibility = 'visible';
        highlightErrorMessage(errorMessage);
    } else {
        errorMessage.style.visibility = 'hidden';
        return dueDateInput.value;
    }
}

let priorities = [];

/**
 * This function handles priority selection based on the clicked button's ID.
 * It resets the `priorities` array, retrieves the priority value from the button's data attribute,
 * and calls the appropriate styling function based on the button ID.
 *
 * @param {string} buttonId The ID of the clicked priority button (e.g., "urgentPriorityButton").
 */
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
    priorities.push(priority);
}

/**
 * This function applies styling for the clicked urgent priority button,
 * highlighting it and resetting styles for other priority buttons.
 *
 * @param {Element} button The clicked urgent priority button element.
 */
function urgentPriorityButtonStylingWhenClicked(button) {
    button.classList.replace('urgentPriorityButton', 'clickedUrgentButton');
    document.getElementById('urgentIcon').classList.add('clickedButtonIcon');
    resetOtherPriorityButtonStyles('mediumPriorityButton', 'mediumIcon');
    resetOtherPriorityButtonStyles('lowPriorityButton', 'lowIcon');
}

/**
 * This function applies styling for the clicked medium priority button,
 * highlighting it and resetting styles for other priority buttons.
 *
 * @param {Element} button The clicked medium priority button element.
 */
function mediumPriorityButtonStylingWhenClicked(button) {
    button.classList.replace('mediumPriorityButton', 'clickedMediumButton');
    document.getElementById('mediumIcon').classList.add('clickedButtonIcon');
    resetOtherPriorityButtonStyles('urgentPriorityButton', 'urgentIcon');
    resetOtherPriorityButtonStyles('lowPriorityButton', 'lowIcon');
}

/**
 * This function applies styling for the clicked low priority button,
 * highlighting it and resetting styles for other priority buttons.
 *
 * @param {Element} button The clicked low priority button element.
 */
function lowPriorityButtonStylingWhenClicked(button) {
    button.classList.replace('lowPriorityButton', 'clickedLowButton');
    document.getElementById('lowIcon').classList.add('clickedButtonIcon');
    resetOtherPriorityButtonStyles('urgentPriorityButton', 'urgentIcon');
    resetOtherPriorityButtonStyles('mediumPriorityButton', 'mediumIcon');
}

/**
 * This function resets styling for a specified priority button and its icon.
 *
 * @param {string} buttonId The ID of the button to reset styles for.
 * @param {string} iconId The ID of the icon element associated with the button.
 */
function resetOtherPriorityButtonStyles(buttonId, iconId) {
    document.getElementById(buttonId).classList.remove('clickedMediumButton', 'clickedLowButton', 'clickedUrgentButton');
    document.getElementById(buttonId).classList.add(buttonId);
    document.getElementById(iconId).classList.remove('clickedButtonIcon');
}

let selectedAssignedContacts = []

/**
 * This function toggles the visibility of the "Assign To" dropdown menu.
 * If the dropdown is currently hidden, it will be opened. Otherwise, it will be closed.
 */
function toggleAssignToDropdown() {
    var content = document.getElementById("dropdowncontacts");
    if (content.style.display == "none") {
        openAssignToDropdown();
    } else {
        closeAssignToDropdown();
    }
}

/**
 * This function opens the "Assign To" dropdown menu.
 * It clears the placeholder text, sets the display to flex, clears the inner HTML, scrolls down the container to ensure visibility, and renders all contacts.
 */
function openAssignToDropdown() {
    document.getElementById("assignContactsDropdown").placeholder = "";
    document.getElementById('dropdowncontacts').style.display = 'flex';
    document.getElementById('dropdowncontacts').innerHTML = '';
    scrollDown();
    renderAllContacts();
}

/**
 * This function scrolls the element with the ID "addTaskContainer" down by 120 pixels.
 */
function scrollDown() {
    var meineDiv = document.getElementById('addTaskContainer');
    meineDiv.scrollTop += 120;
}

/**
 * This function renders all contacts from the `contacts` array in the "Assign To" dropdown menu.
 * It first sorts the contacts by first name and then loops through each contact.
 * For each contact, it checks if it's already assigned (based on `selectedAssignedContacts`).
 * It then sets the background color, text color, and checkbox source based on the assigned status.
 * Finally, it adds the contact HTML template to the dropdown container.
 */
function renderAllContacts() {
    sortByFirstName();
    document.getElementById('dropdowncontacts').innerHTML = "";
    for (let i = 0; i < localContacts.length; i++) {
        const contact = localContacts[i];
        let isAssigned = selectedAssignedContacts.some(item => item.name === `${contact.name} ${contact.surname}`);
        let backgroundColor = isAssigned ? "rgba(69, 137, 255, 1)" : "white";
        let textColor = isAssigned ? "white" : "black";
        let checkBoxSrc = isAssigned ? "./img/assignContactCheckChecked.svg" : "./img/assingContactCheckUnchecked.svg";
        document.getElementById('dropdowncontacts').innerHTML += renderAllContactsHTMLTemplate(i, backgroundColor, contact, textColor, checkBoxSrc);
    }
}

/**
 * This function closes the "Assign To" dropdown menu.
 * It sets the placeholder text back to "Select contacts to assign" and hides the dropdown container.
 */
function closeAssignToDropdown() {
    document.getElementById("assignContactsDropdown").placeholder = "Select contacts to assign";
    document.getElementById('dropdowncontacts').style.display = 'none';
}

/**
 * This function changes the source attribute of a checkbox element with a dynamic ID constructed using `assignContactCheckBox(i)`.
 * The new source points to the "checked" checkbox image.
 * 
 * @param {number} i - The index of the contact in the list.
 */
function changeCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assignContactCheckChecked.svg";
}

/**
 * This function changes the source attribute of a checkbox element with a dynamic ID constructed using `assignContactCheckBox(i)`.
 * The new source points to the "unchecked" checkbox image.
 * 
 * @param {number} i - The index of the contact in the list.
 */
function changeBackCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assingContactCheckUnchecked.svg";
}

/**
 * This function handles searching for contacts within the "Assign To" dropdown menu.
 * It retrieves the search term from the "assignContactsDropdown" element and converts it to lowercase.
 * If the search term is empty, it renders all contacts again. Otherwise, it filters the `contacts` array based on whether the name or surname (lowercase) starts with the search term.
 * Finally, it renders the filtered contacts using the `renderFilteredContacts` function.
 */
function searchContactToAssign() {
    let search = document.getElementById('assignContactsDropdown').value.toLowerCase();
    if (search === '') {
        renderAllContacts();
        return;
    }
    const filteredContacts = localContacts.filter(contact =>
        contact.name.toLowerCase().startsWith(search) ||
        contact.surname.toLowerCase().startsWith(search)
    );
    renderFilteredContacts(filteredContacts);
}

/**
 * This function renders a list of filtered contacts in the "Assign To" dropdown menu.
 * It takes an array of filtered contacts as input.
 * It shows the dropdown container, clears its inner HTML, and loops through each filtered contact.
 * Similar to `renderAllContacts`, it checks the assignment status, sets styles, and adds the contact HTML template (presumably generated by another function `renderFilteredContactsHTMLTemplate`) to the dropdown container.
 * 
 * @param {array} filteredContacts - An array of contacts matching the search criteria.
 */
function renderFilteredContacts(filteredContacts) {
    const dropdownContainer = document.getElementById('dropdowncontacts');
    dropdownContainer.style.display = 'flex';
    dropdownContainer.innerHTML = '';
    filteredContacts.forEach((contact, i) => {
        let isAssigned = selectedAssignedContacts.some(item => item.name === `${contact.name} ${contact.surname}`);
        let backgroundColor = isAssigned ? "rgba(69, 137, 255, 1)" : "white";
        let textColor = isAssigned ? "white" : "black";
        let checkBoxSrc = isAssigned ? "./img/assignContactCheckChecked.svg" : "./img/assingContactCheckUnchecked.svg";

        dropdownContainer.innerHTML += renderFilteredContactsHTMLTemplate(i, backgroundColor, contact, textColor, checkBoxSrc)
    });
}

/**
 * This function handles assigning or unassigning a contact based on the provided index.
 * It retrieves the contact information from the `contacts` array and constructs the full name.
 * It then checks if the contact is already assigned by finding its index in the `selectedAssignedContacts` array.
 * If not assigned, it creates a new contact object with name, initials, and avatar color and pushes it to the `selectedAssignedContacts` array. It also calls `checkAssignContact` to update the visual representation.
 * If already assigned, it removes the contact from the `selectedAssignedContacts` array by its index and calls `uncheckAssignContact` to update the visual representation.
 * 
 * @param {number} i - The index of the contact in the list.
 */
function assingContact(i) {
    let contact = localContacts[i];
    let fullName = `${contact.name} ${contact.surname}`;
    let initials = `${contact.name.charAt(0).toUpperCase()}${contact.surname.charAt(0).toUpperCase()}`;
    let avatarColor = contact.avatarColor;
    let contactIndex = selectedAssignedContacts.findIndex(item => item.name === fullName);
    if (contactIndex === -1) {
        let selectedContact = { name: fullName, initials: initials, avatarColor: avatarColor };
        selectedAssignedContacts.push(selectedContact);
        checkAssignContact(i);
    } else {
        selectedAssignedContacts.splice(contactIndex, 1);
        uncheckAssignContact(i);
    }
}

/**
 * This function updates the visual representation of a contact in the "Assign To" dropdown menu to reflect its assigned state (selected).
 * It targets specific elements based on dynamic IDs constructed using `dropdownEachContact(i)` and `assignToContactName(i)`.
 * It sets the background color of the contact container, text color of the contact name, and calls `changeCheckBoxStyle` to update the checkbox image (likely to checked).
 * Finally, it calls `showAvatarsOfSelectedContacts` to potentially update the assigned contacts avatar list.
 * 
 * @param {number} i - The index of the contact in the list.
 */
function checkAssignContact(i) {
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "rgba(69, 137, 255, 1)";
    document.getElementById(`assignToContactName(${i})`).style.color = "white";
    changeCheckBoxStyle(i);
    showAvatarsOfSelectedContacts();
}

/**
 * This function updates the visual representation of a contact in the "Assign To" dropdown menu to reflect its unassigned state (unselected).
 * It targets specific elements based on dynamic IDs constructed using `dropdownEachContact(i)` and `assignToContactName(i)`.
 * It sets the background color of the contact container and text color of the contact name back to defaults.
 * It calls `changeBackCheckBoxStyle` to update the checkbox image (likely to unchecked).
 * Finally, it calls `showAvatarsOfSelectedContacts` to potentially update the assigned contacts avatar list.
 * 
 * @param {number} i - The index of the contact in the list.
 */
function uncheckAssignContact(i) {
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "white";
    document.getElementById(`assignToContactName(${i})`).style.color = "black";
    changeBackCheckBoxStyle(i);
    showAvatarsOfSelectedContacts();
}

/**
 * This function updates the list of assigned contacts' avatars displayed below the dropdown menu.
 * It first sorts the `selectedAssignedContacts` array by name in ascending order using `localeCompare`.
 * It then shows the container for the avatar list, clears its inner HTML, and loops through each assigned contact.
 * For each contact, it constructs the avatar HTML element with the contact's initials and background color set to the contact's avatar color.
 * Finally, it adds the avatar HTML to the container.
 */
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

/**
 * An array containing task category objects. Each object has properties for name and category color.
 * 
 * @typedef {object} TaskCategory
 * @property {string} name - The name of the task category.
 * @property {string} categoryColor - The color of the task category represented in RGB format.
 */
let taskCategories = [{
    name: "Technical Task",
    categoryColor: "rgb(0,56,255)"
},
{
    name: 'User Story',
    categoryColor: "rgb(255,122,0)"
}
];

/**
 * This function toggles the visibility of the "Select Task Category" dropdown menu.
 * If the dropdown is currently hidden, it will be opened and `openTaskCategoryDropdown` is called. Otherwise, it will be closed and `errorMessageIfEmptyCategory` is called to check for an empty selection.
 */
function toggleSelectTaskCategoryDropdown() {
    var content = document.getElementById("dropdownSelectTasksCategory");
    if (content.style.display == "none") {
        openTaskCategoryDropdown();
    } else {
        closeTaskCategoryDropdown();
        errorMessageIfEmptyCategory();
    }
}

/**
 * This function opens the "Select Task Category" dropdown menu.
 * It shows the dropdown container, clears its inner HTML, and loops through each task category.
 * For each category, it constructs the dropdown entry HTML with the category name and sets an onclick event listener to call `selectTaskCategory` when clicked.
 * Finally, it calls `scrollDown` (presumably to ensure visibility).
 */
function openTaskCategoryDropdown() {
    document.getElementById('dropdownSelectTasksCategory').style.display = 'flex';
    document.getElementById('dropdownSelectTasksCategory').innerHTML = '';
    for (let i = 0; i < taskCategories.length; i++) {
        const taskCategory = taskCategories[i];
        document.getElementById('dropdownSelectTasksCategory').innerHTML += /*html*/`
        <div class="dropdownEachTaskCategory" id="dropdownEachTaskCategory(${i})" onclick="selectTaskCategory(${i})">
            ${taskCategory.name}
        </div>
    `;
    }
    scrollDown();
}

/**
 * This function closes the "Select Task Category" dropdown menu.
 * It hides the dropdown container.
 */
function closeTaskCategoryDropdown() {
    document.getElementById('dropdownSelectTasksCategory').style.display = 'none';
}

/**
 * This function handles selecting a task category from the dropdown menu.
 * It retrieves the selected task category object based on the provided index.
 * It updates the text content of the "selectTaskCategoryTextField" element with the selected category name.
 * It then closes the dropdown and calls `errorMessageIfEmptyCategory` to check for an empty selection.
 * 
 * @param {number} i - The index of the selected task category in the `taskCategories` array.
 */
function selectTaskCategory(i) {
    let taskCategory = taskCategories[i];
    document.getElementById('selectTaskCategoryTextField').innerHTML = taskCategory.name;
    closeTaskCategoryDropdown();
    errorMessageIfEmptyCategory();
}

/**
 * This function checks if a task category has been selected and displays an error message if not.
 * It retrieves the text content of the "selectTaskCategoryTextField" element (presumably showing the selected category name).
 * It selects the error message element using a query selector.
 * If the text content is still "Select task category" (indicating no selection), it shows the error message and calls `highlightErrorMessage` for an animation effect.
 * Otherwise, it hides the error message.
 */
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

/**
 * This function animates the error message element to highlight it briefly.
 * It sets an animation style for 1 second and then removes the animation style after a short delay.
 * 
 * @param {HTMLElement} errorMessage - The error message element to animate.
 */
function highlightErrorMessage(errorMessage) {
    errorMessage.style.animation = 'highlight 1s';
    setTimeout(() => {
        errorMessage.style.animation = '';
    }, 125);
}

/**
 * An array containing objects representing created subtasks.
 * Each object has properties for "text" (the subtask description) and "done" (a boolean indicating completion status).
 * 
 * @typedef {object} CreatedSubtask
 * @property {string} text - The description of the subtask.
 * @property {boolean} done - Whether the subtask is marked as completed.
 */
let createdSubtasks = [];

/**
 * This function checks the value entered in the "Add Subtask" input field.
 * It retrieves the trimmed value from the input field element.
 * If the input value is empty, it calls `showDefaultInputMenu` (presumably to hide subtask options).
 * Otherwise, it calls `showSubtaskInputMenu` (presumably to show options for subtasks).
 */
function checkInputValue() {
    const inputValue = document.getElementById('addTaskSubtasksInput').value.trim();
    if (inputValue === "") {
        showDefaultInputMenu();
    } else {
        showSubtaskInputMenu();
    }
}

/**
 * This function clears the value from the "Add Subtask" input field.
 * It sets the value of the input field element to an empty string.
 * It also calls `showDefaultInputMenu` (presumably to hide subtask options).
 */
function clearSubtaskInputField() {
    document.getElementById('addTaskSubtasksInput').value = '';
    showDefaultInputMenu();
}

/**
 * This function saves the entered subtask from the "Add Subtask" input field.
 * It retrieves the trimmed value from the input field element.
 * If the input value is not empty, it creates a new subtask object with the text and sets its "done" status to false.
 * It then pushes the new subtask object to the `createdSubtasks` array.
 * Finally, it calls `openCreatedSubtaskBox` to display the created subtasks and `scrollDown` (presumably to ensure visibility).
 */
function saveSubtaskInput() {
    let createdSubtask = document.getElementById('addTaskSubtasksInput').value.trim();
    if (createdSubtask !== "") {
        let createdSubtasksJson = { text: createdSubtask, done: false };
        createdSubtasks.push(createdSubtasksJson)
        openCreatedSubtaskBox();
        scrollDown();
    }
}

/**
 * This function opens the box that displays the created subtasks.
 * It shows the container element for the created subtasks and clears its inner HTML.
 * It then loops through each created subtask in the `createdSubtasks` array.
 * For each subtask, it calls `openCreatedSubtaskBoxHTMLTemplate` (presumably to generate the HTML for the subtask) and adds it to the container's inner HTML.
 * Finally, it calls `clearSubtaskInputField` to clear the input field.
 */
function openCreatedSubtaskBox() {
    document.getElementById('createdSubTasksBox').style.display = 'flex';
    document.getElementById('createdSubTasksBox').innerHTML = '';
    for (let i = 0; i < createdSubtasks.length; i++) {
        const subtask = createdSubtasks[i];
        document.getElementById('createdSubTasksBox').innerHTML += openCreatedSubtaskBoxHTMLTemplate(i, subtask);
    }
    clearSubtaskInputField();
}

/**
 * This function edits a created subtask when its corresponding element is clicked.
 * It adds a class "eachSubtaskFocused" to the clicked subtask element (likely for styling).
 * It retrieves the current subtask text from the `createdSubtasks` array based on the provided index.
 * It updates the inner HTML of the clicked subtask element with the `editCreatedSubtaskHTMLTemplate` (presumably to show an edit input field).
 * It then focuses the edit input field and selects all its content.
 * 
 * @param {number} i - The index of the subtask in the `createdSubtasks` array.
 */
function editCreatedSubtask(i) {
    document.getElementById(`eachSubtask(${i})`).classList.add('eachSubtaskFocused');
    let currentSubtaskText = createdSubtasks[i];
    document.getElementById(`eachSubtask(${i})`).innerHTML = editCreatedSubtaskHTMLTemplate(i, currentSubtaskText);
    let inputField = document.getElementById(`editTaskSubtasksInput`);
    inputField.focus();
    inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
}

/**
 * This function saves the edited subtask when the user confirms changes in the edit input field.
 * It removes the "eachSubtaskFocused" class from the edited subtask element (likely for styling).
 * It retrieves the trimmed value from the edit input field element.
 * If the edited value is not empty, it updates the inner HTML of the edited subtask element with the `saveEditSubtaskInputHTMLTemplate` (presumably to show the updated text).
 * It then updates the corresponding subtask object in the `createdSubtasks` array with the edited text and sets its "done" status to false (assuming it wasn't changed).
 * Otherwise, if the edited value is empty, it calls `deleteCreatedSubtask` to remove the subtask.
 * 
 * @param {number} i - The index of the subtask in the `createdSubtasks` array.
 */
function saveEditSubtaskInput(i) {
    document.getElementById(`eachSubtask(${i})`).classList.remove('eachSubtaskFocused');
    let editedSubtask = document.getElementById('editTaskSubtasksInput').value.trim();
    if (editedSubtask !== "") {
        document.getElementById(`eachSubtask(${i})`).innerHTML = saveEditSubtaskInputHTMLTemplate(i, editedSubtask);
        createdSubtasks[i] = { text: editedSubtask, done: false };
    } else if (editedSubtask == "") {
        deleteCreatedSubtask(i);
    }
}

/**
 * This function removes a created subtask from the list.
 * It removes the subtask at the provided index from the `createdSubtasks` array using the `splice` method.
 * It then calls `openCreatedSubtaskBox` to refresh the displayed list of subtasks.
 * 
 * @param {number} subTastIndex - The index of the subtask to delete in the `createdSubtasks` array.
 */
function deleteCreatedSubtask(subTastIndex) {
    createdSubtasks.splice(subTastIndex, 1);
    openCreatedSubtaskBox();
}

/**
 * This function resets the form fields for creating a new task.
 * It clears the values of the following input elements:
 *   - addTaskInputTitle (presumably for the task title)
 *   - addTaskDescriptionInput (presumably for the task description)
 *   - addTaskDueDateInput (presumably for the task due date)
 * It calls `changePriorityColor` to reset the priority color selection (presumably to a default value like 'mediumPriorityButton').
 * It clears the inner HTML of the element with the ID 'avatarsOfSelectedContacts' (likely to remove any displayed assigned contacts).
 * It resets the `selectedAssignedContacts` array to an empty array.
 * It updates the text content of the element with the ID 'selectTaskCategoryTextField' to "Select task category" (presumably to reset the selected category).
 * It resets the `createdSubtasks` array to an empty array (presumably to remove any created subtasks).
 * Finally, it hides any error messages related to empty title, due date, or category selection using query selectors.
 */
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

/**
 * This function is the main entry point for creating a new task.
 * It gathers data from the form, validates it, and builds a new task object.
 * If validation fails, it displays error messages and exits.
 * Otherwise, it adds the new task to the board, resets the form, and displays a success popup.
 */
function createTask() {
    let taskData = getTaskData();
    let id = cards.length > 0 ? cards[cards.length - 1].id + 1 : 0;
    let place = boardPlace === "" ? 'todo' : boardPlace;
    if (!validateTaskData(taskData)) {
        return;
    }
    let priorityImg = getPriorityImagePath(taskData.priority);
    let categoryColor = getCategoryColor(taskData.category);
    let newCard = buildTemplateForArrayInput(id, place, taskData.category, categoryColor, taskData.title, taskData.description, taskData.dueDate, taskData.subtasks, taskData.assigned, taskData.priority, priorityImg);
    addTaskToBoard(newCard);
    resetCreateTaskFormInputs();
    showTaskCreatedPopUp();
}

/**
 * This function gathers data from the create task form and returns an object containing the task details.
 * It retrieves title, due date, category, assigned contacts, description, and subtasks using relevant functions.
 */
function getTaskData() {
    return {
        title: errorMessageIfEmptyTitle(),
        dueDate: errorMessageIfEmptyDueDate(),
        priority: priorities[0],
        category: document.getElementById('selectTaskCategoryTextField').innerText.trim(),
        assigned: selectedAssignedContacts,
        description: document.getElementById('addTaskDescriptionInput').value.trim(),
        subtasks: createdSubtasks,
    }
}

/**
 * This function validates the provided task data.
 * It checks for missing title, due date, or invalid category.
 * If any are missing, it displays corresponding error messages and returns false.
 * Otherwise, it returns true.
 */
function validateTaskData(taskData) {
    if (!taskData.title || !taskData.dueDate || !taskCategories.some(categoryObj => categoryObj.name === taskData.category)) {
        errorMessageIfEmptyTitle();
        errorMessageIfEmptyDueDate();
        errorMessageIfEmptyCategory();
        return false;
    }
    return true;
}

/**
 * This function takes the priority urgency level (e.g., 'Urgent', 'Medium', 'Low') and returns the corresponding image path for the priority icon.
 */
function getPriorityImagePath(priority) {
    if (priority == 'Urgent') {
        return './img/priorityHighInactive.svg';
    } else if (priority == 'Medium') {
        return './img/priorityMediumInactive.svg';
    } else {
        return './img/priorityLowInactive.svg';
    }
}

/**
 * This function takes the selected category name and finds the corresponding category object from the `taskCategories` array.
 * If a match is found, it returns the category color. Otherwise, it logs an error message.
 */
function getCategoryColor(category) {
    let matchingCategory = taskCategories.find(categoryObj => categoryObj.name === category);
    if (matchingCategory) {
        return matchingCategory.categoryColor;
    } else {
        console.error("Error: Category color not found");
    }
}

/**
 * This function builds a new task object with the provided details.
 * It constructs the object with properties like `id`, `place`, `category` (including name and color), `title`, `description`, `dueDate`, `subtasks`, `assigned contacts`, and `priority` (including urgency and image path).
 */
function buildTemplateForArrayInput(id, place, category, categoryColor, title, description, dueDate, subtasks, assigned, priority, priorityImg) {
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
    }
}

/**
 * This function adds the provided new task object (presumably containing task details) to the `cards` array.
 * The `cards` array likely represents the collection of tasks displayed on the board.
 * Additionally, it calls the `UpdateTaskInRemote` function (assumed to be defined elsewhere) to potentially update the task data remotely.
 * 
 * @param {Object} newCard - The new task object to be added to the board.
 */
function addTaskToBoard(newCard) {
    cards.push(newCard);
    UpdateTaskInRemote();
}

/**
 * This function resets the input fields and state of the create task form.
 * It clears the `boardPlace` variable (presumably holding the selected board location),
 * resets the `priorities` array (likely containing available priorities),
 * clears the `selectedAssignedContacts` array (presumably holding selected contacts),
 * and empties the `createdSubtasks` array (likely containing created subtasks).
 */
function resetCreateTaskFormInputs() {
    boardPlace = "";
    priorities = [];
    selectedAssignedContacts = [];
    createdSubtasks = [];
}

/**
 * This function displays a popup notification for successfully creating a new task.
 * It manipulates the styles of DOM elements with specific IDs to achieve the visual effect.
 * - Sets the display of the container element (`taskCreatedButtonContainer`) to "flex".
 * - Uses `setTimeout` to schedule adding the 'showTaskCreatedButtonContainer' class to the button element (`taskCreatedButton`) with a 20ms delay.
 * - Uses another `setTimeout` to schedule removing the class and hiding the container element after 800ms.
 * - Finally, it calls the `loadBoard` function (assumed to be defined elsewhere) with another 20ms delay, potentially to refresh the board view.
 */
function showTaskCreatedPopUp() {
    document.getElementById('taskCreatedButtonContainer').style.display = "flex";
    setTimeout(() => {
        document.getElementById('taskCreatedButton').classList.add('showTaskCreatedButtonContainer');
    }, 20);
    setTimeout(() => {
        document.getElementById('taskCreatedButton').classList.remove('showTaskCreatedButtonContainer');
        document.getElementById('taskCreatedButtonContainer').style.display = "none";
    }, 800);
    setTimeout(() => {
        loadBoard();
    }, 820);
}