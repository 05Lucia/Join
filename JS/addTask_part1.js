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
    addTaskInit();
    changeNavigationAddTask()
    getCurrentDate();
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
 * This function checks if the title input field is empty or contains only whitespace characters.
 * @returns {string|boolean} Returns the valid title if it's not empty or whitespace, otherwise returns false.
 */
function errorMessageIfEmptyTitle() {
    let titleInput = document.getElementById('addTaskInputTitle');
    let errorMessage = document.querySelector('.errorMessageIfEmptyTitle');
    let title = titleInput.value.trim();
    if (title === "" || /^\s+$/.test(title)) {
        errorMessage.style.visibility = 'visible';
        document.getElementById('addTaskInputTitle').value = '';
        highlightErrorMessage(errorMessage);
        return false;
    } else {
        errorMessage.style.visibility = 'hidden';
        return title;
    }
}

/**
 * This function sets the minimum date value for a specified date input field to the current date.
 */
function getCurrentDate(){
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; 
    let day = today.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    document.getElementById('addTaskDueDateInput').min = `${year}-${month}-${day}`;
    return `${year}-${month}-${day}`;
}

/**
 * This function checks if the "Add Task" due date input field is empty and displays an error message if so.
 * It also handles hiding the error message if the field is filled or contains a valid date.
 *
 * @returns {string|undefined} If the due date field is not empty and contains a valid date,
 *                             the function returns its value. Otherwise, it returns undefined.
 */
function errorMessageIfEmptyDueDate() {
    const dueDateInput = document.getElementById('addTaskDueDateInput');
    const errorMessage = document.querySelector('.errorMessageIfEmptyDueDate');
    const currentDate = getCurrentDate();

    if (dueDateInput.value === "") {
        displayErrorMessage(errorMessage, 'This field is required');
    } else if (dueDateInput.value < currentDate) {
        displayErrorMessage(errorMessage, 'Past date! Please select a date from today and onwards.');
    } else {
        hideErrorMessage(errorMessage);
        return dueDateInput.value;
    }
}

/**
 * Displays an error message with the provided message.
 *
 * @param {HTMLElement} errorMessage - The HTML element to display the error message in.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(errorMessage, message) {
    errorMessage.innerHTML = message;
    errorMessage.style.visibility = 'visible';
    highlightErrorMessage(errorMessage);
}

/**
 * Hides the error message element.
 *
 * @param {HTMLElement} errorMessage - The HTML element representing the error message to hide.
 */
function hideErrorMessage(errorMessage) {
    errorMessage.style.visibility = 'hidden';
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
    searchIndexAssinged();
}

/**
 * This function checks if a click event occurred outside a specific element and performs an action.
 * @param {MouseEvent} event - The click event that was triggered.
 */
function closeOnClickOutside(event) {
    const assignedToBox = document.getElementById('assignedToBox');
    const targetElement = event.target;
    if (!assignedToBox.contains(targetElement)) {
        closeAssignToDropdown();
    }
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

let filteredContacts = [];

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
    filteredContacts = localContacts.filter(contact =>
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
 * @param {number} i - The index of the contact in the list.
 */
function assingContact(i) {
    let search = document.getElementById('assignContactsDropdown').value.toLowerCase();
    let contact = getSelectedContact(i, search);
    let { fullName, initials, avatarColor, contactIndex } = getContactRelatedInfo(contact);
    handleContactAssignment(contactIndex, fullName, initials, avatarColor, i);
}

/**
 * This function retrieves the correct contact based on the search value.
 * @param {number} i - The index of the contact in the list.
 * @param {string} search - The search value from the assignContactsDropdown input.
 * @returns {Object} The selected contact object.
 */
function getSelectedContact(i, search) {
    if (search === "") {
        return localContacts[i];
    } else {
        return filteredContacts[i];
    }
}

/**
 * This function retrieves contact-related information such as full name, initials, avatar color, and index in the selected assigned contacts array.
 * @param {Object} contact - The contact object.
 * @returns {Object} An object containing full name, initials, avatar color, and index.
 */
function getContactRelatedInfo(contact) {
    let fullName = `${contact.name} ${contact.surname}`;
    let initials = `${contact.name.charAt(0).toUpperCase()}${contact.surname.charAt(0).toUpperCase()}`;
    let avatarColor = contact.avatarColor;
    let contactIndex = selectedAssignedContacts.findIndex(item => item.name === fullName);
    return { fullName, initials, avatarColor, contactIndex };
}