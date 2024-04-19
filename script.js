async function init() {
    //login page after start animation//
    if (!localStorage.getItem('isLoggedIn')) {
        startAnimation();
    }
    await loadUsers();
    handleGuestLogin();
    await summaryLode();
    greetUser();
}

function startAnimation() {
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
}

// naviagtion ---------------------------------------------------------------------------------------------------

/**
 * Fetches and includes the content of external HTML templates marked with the 'include-html' attribute.
 *
 * @async
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
    if (document.getElementById('greeting')) {
        greetUser();
    }
}

/**
 * Loads the specified template file and includes its content in the designated container.
 *
 * @param {string} template - The name of the template file to load (without the extension).
 * @async
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
 * Opens the navigation overlay dropdown menu.
 *
 * This function removes the 'd-none' class from the container element, likely making it visible.
 */
function openDropdowen() {
    let container = document.getElementById('navigation-overlay');
    container.classList.remove('d-none');
}

/**
 * Closes the navigation overlay dropdown menu.
 *
 * This function adds the 'd-none' class to the container element, likely hiding it.
 */
function closeDropdowen() {
    let container = document.getElementById('navigation-overlay');
    container.classList.add('d-none');
}

/**
 * Loads the help template and closes the navigation overlay dropdown menu.
 */
function dropdowenHelp() {
    Templates('help');
    closeDropdowen();
}

/**
 * Sets up event listeners for navigation functionality after the DOM content is loaded.
 *
 * This code snippet waits for the DOM content to be fully loaded using the `DOMContentLoaded` event.
 * Once loaded, it calls the following functions to establish the navigation behavior:
 *  - `naviagtionClick`: Attaches click event listeners to all main navigation items.
 *  - `clickedLegalPart`: Attaches click event listeners to legal section navigation elements within the ".navigation-legal" container.
 *  - `removeNaviagtionClick`: Attempts to remove click event listeners from all main navigation items (might not always be successful).
 *  - `removeClickedLegalPart`: Attaches click listeners to main navigation items to remove the "navigation-legal-clicked" class from any legal section element when clicked.
 */
document.addEventListener('DOMContentLoaded', () => {
    naviagtionClick(); // Call your function to set up event listeners
    clickedLegalPart();
    removeNaviagtionClick();
    removeClickedLegalPart();
    removeNavHigliteOnDropdowen();
    removeNavHigliteLegalPartOnDropdowen();
    removeNavHigliteOnHelp();
    removeNavHigliteLegalPartOnHelp();
});

/**
 * Attaches click event listeners to all navigation items (.navigation-item class).
 *
 * When a navigation item is clicked:
 *  - The previously clicked item (if any) loses the "navigation-item-clicked" class.
 *  - The clicked item gains the "navigation-item-clicked" class for visual selection.
 *  - All navigation items are reset (hidden clicked images, shown unclicked images).
 *  - The `navigationClickImg` function is called to potentially change the clicked item's image (if screen is below 800px).
 */
function naviagtionClick() {
    const btnElList = document.querySelectorAll('.navigation-item');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            btnEl.classList.add('navigation-item-clicked');
            resetNavigationItems();
            navigationClickImg();
            removeClickedLegalPart();
        })
    })
}

/**
 * Resets all navigation items to their initial state.
 *
 * This function loops through all elements with the class ".navigation-item".
 * Within each item, it:
 *  - Hides any previously shown "clicked" image (adds the "d-none" class).
 *  - Shows any previously hidden "unclicked" image (removes the "d-none" class).
 */
function resetNavigationItems() {
    document.querySelectorAll('.navigation-item').forEach(item => {
        item.querySelector('.clicked')?.classList.add('d-none');
        item.querySelector('.unclicked')?.classList.remove('d-none');
    });
}

/**
* Handles potential image change for the currently clicked navigation item (if screen is below 800px).
*
* This function retrieves the element with the class "navigation-item-clicked" (the clicked item).
* If the clicked item exists and the screen width is less than 800px:
*  - It finds the "unclicked" and "clicked.d-none" images within the clicked item.
*  - It hides the "unclicked" image using `classList.add('d-none')`.
*  - It shows the "clicked" image using `classList.remove('d-none')`.
*/
function navigationClickImg() {
    const clickedItem = document.querySelector('.navigation-item-clicked');

    // Then handle image change for the clicked item (if screen is below 800px)
    if (window.innerWidth < 800) {
        const unclickedImage = clickedItem.querySelector('.unclicked');
        const clickedImage = clickedItem.querySelector('.clicked.d-none');

        if (unclickedImage && clickedImage) {
            unclickedImage.classList.add('d-none'); // Hide unclicked image
            clickedImage.classList.remove('d-none'); // Show clicked image
        }
    }
}

/**
 * Attaches click event listeners to all legal section navigation elements within the ".navigation-legal" container.
 *
 * When a legal section navigation element is clicked:
 *  - The previously clicked legal section element (if any) loses the "navigation-legal-clicked" class.
 *  - The clicked element gains the "navigation-legal-clicked" class for visual selection.
 *  - **Additionally:** The function calls `removeNaviagtionClick` to potentially remove click listeners from the main navigation items.
 *  (This behavior might need adjustment depending on your specific requirements.)
 */
function clickedLegalPart() {
    const btnElList = document.querySelectorAll('.navigation-legal div');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            btnEl.classList.add('navigation-legal-clicked');
            removeNaviagtionClick();
        })
    })
}

/**
 * Attempts to remove click event listeners from all navigation items (.navigation-item class).
 *
 * This function loops through all elements with the class ".navigation-item". It attempts to remove any existing click event listeners from these elements.
 *  - Note that this function might not always successfully remove listeners depending on how they were previously attached.
 */
function removeNaviagtionClick() {
    const btnElList = document.querySelectorAll('.navigation-legal div');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
        })
    })
}

/**
 * Attaches click event listeners to all navigation items (.navigation-item class).
 *
 * When a navigation item is clicked, this function removes the "navigation-legal-clicked" class from any legal section element that might have it.
 *  - This ensures clicking a main navigation item clears the "clicked" state for legal section elements.
 */
function removeClickedLegalPart() {
    const btnElList = document.querySelectorAll('.navigation-item');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
        })
    })
}

/**
 * Removes highlight from the navigation summary section.
 *
 * This function removes the "navigation-item-clicked" class from the element with ID "navSummary", likely deselecting it visually.
 */
function changeNavigationPrivacyPolicy() {
    let summary = document.getElementById('navSummary');

    summary.classList.remove('navigation-item-clicked');

}

/**
 * Removes highlight from any clicked navigation item on dropdown click.
 *
 * This function attaches click event listeners to all anchor tags within elements with the class "dropdowen-container".
 * When a dropdown anchor is clicked, it removes the "navigation-item-clicked" class from any currently highlighted navigation item (if any).
 */
function removeNavHigliteOnDropdowen() {
    const btnElList = document.querySelectorAll('.dropdowen-container a');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            resetNavigationItems();
        })
    })
}

/**
 * Removes highlight from any clicked legal section element on dropdown click.
 *
 * This function is similar to `removeNavHigliteOnDropdowen` but targets elements with the "navigation-legal-clicked" class.
 * When a dropdown anchor is clicked, it removes the "navigation-legal-clicked" class from any currently highlighted legal section element (if any).
 */
function removeNavHigliteLegalPartOnDropdowen() {
    const btnElList = document.querySelectorAll('.dropdowen-container a');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            resetNavigationItems();
        })
    })
}

function removeNavHigliteLegalPartOnHelp() {
    const btnElList = document.querySelectorAll('.help');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            resetNavigationItems();
        })
    })
}

function removeNavHigliteOnHelp() {
    const btnElList = document.querySelectorAll('.help');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            resetNavigationItems();
        })
    })
}

// leagalnotes / privacy Policy Navigation---------------------------------------------------------------
/**
 * Loads legal notice template and highlights the legal notice section.
 *
 * This function uses `async` to load the legal notice template via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Closes the dropdown (implementation in `closeDropdowen` not provided).
 *  - Highlights the legal notice section with `legalNoticeHiglite`.
 */
async function dropdowenLegalNotice() {
    await Templates('legal_notice');
    await closeDropdowen();
    legalNoticeHiglite();
}

/**
 * Highlights the legal notice navigation element.
 *
 * This function adds the "navigation-legal-clicked" class to the element with ID "navLegalNotice", visually marking it as selected.
 */
function legalNoticeHiglite() {
    let legalNotice = document.getElementById('navLegalNotice');
    legalNotice.classList.add('navigation-legal-clicked');
}

/**
 * Loads privacy policy template and highlights the privacy policy section.
 *
 * This function uses `async` to load the privacy policy template via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Closes the dropdown (implementation in `closeDropdowen` not provided).
 *  - Highlights the privacy policy section with `privacyPolicyHiglite`.
 * Loads the legal notice template and closes the navigation overlay dropdown menu.
 */
async function dropdowenPrivacyPolicy() {
    await Templates('privacy_policy');
    await closeDropdowen();
    privacyPolicyHiglite();
}

/**
 * Highlights the privacy policy navigation element.
 *
 * This function adds the "navigation-legal-clicked" class to the element with ID "navPrivacyPolicy", visually marking it as selected.
 * Loads the privacy policy template and closes the navigation overlay dropdown menu.
 */
function privacyPolicyHiglite() {
    let privacyPolicy = document.getElementById('navPrivacyPolicy');
    privacyPolicy.classList.add('navigation-legal-clicked');
}

// summary -------------------------------------------------------------------------------------------------------

/**
 * Loads summary template, updates summary numbers, and highlights summary navigation.
 * Loads and displays the summary template and then retrieves task counts for each list.
 *
 * This function uses `async` to load the summary template via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Updates summary numbers with `summaryLodeNumbers` (implementation not provided).
 *  - Highlights the summary navigation section with `changeNavigationHigliteSummary`.
 * @async
 */
async function summaryLode() {
    await Templates('summary');
    changeNavigationHigliteSummary();
    summaryLodeNumbers();
}

/**
 * Highlights the summary navigation element and removes highlights from legal sections.
 *
 * This function adds the "navigation-item-clicked" class to the element with ID "navSummary", visually marking it as selected.
 * It also removes the "navigation-legal-clicked" class from both legal notice and privacy policy elements.
 * Additionally, it adjusts element visibility based on screen size (potentially for mobile).
 */
function changeNavigationHigliteSummary() {
    let summary = document.getElementById('navSummary');
    let privacyPolicy = document.getElementById('navPrivacyPolicy');
    let legalNotice = document.getElementById('navLegalNotice');
    summary.classList.add('navigation-item-clicked');
    legalNotice.classList.remove('navigation-legal-clicked');
    privacyPolicy.classList.remove('navigation-legal-clicked');

    if (window.innerWidth < 800) {
        summary.children[0].classList.add('d-none');
        summary.children[1].classList.remove('d-none');
    }
}

/**
 * Calls functions to retrieve and display the number of tasks in each list ("todo", "progress", "feedback", "done").
 */
function summaryLodeNumbers() {
    todoNumber();
    progressNumber();
    feedbackNumber();
    doneNumber();
    boradTaskNumber();
    urgentNumber();
    displayClosestDueDate();
}

/**
 * Calculates and displays the number of tasks in the "todo" list.
 * Performs error handling if the container element with ID 'to-do-number' is not found.
 */
function todoNumber() {
    let todoCount = 0;
    const container = document.getElementById('to-do-number');

    if (!container) {
        console.error("Element with ID 'to-do-number' not found!");
        return;
    }

    for (const card of cards) {
        if (card.place === 'todo') {
            todoCount++;
        }
    }
    container.textContent = todoCount;
}

/**
* Calculates and displays the number of tasks in the "progress" list.
* Performs error handling if the container element with ID 'progress-task-number' is not found.
*/
function progressNumber() {
    let progressCount = 0;
    const container = document.getElementById('progess-task-number');

    if (!container) {
        console.error("Element with ID 'progress-task-number' not found!");
        return;
    }

    for (const card of cards) {
        if (card.place === 'progress') {
            progressCount++;
        }
    }
    container.textContent = progressCount;
}

/**
* Calculates and displays the number of tasks in the "feedback" list.
* Performs error handling if the container element with ID 'feedback-number' is not found.
*/
function feedbackNumber() {
    let feedbackCount = 0;
    const container = document.getElementById('feedback-number');

    if (!container) {
        console.error("Element with ID 'feedback-number' not found!");
        return;
    }

    for (const card of cards) {
        if (card.place === 'feedback') {
            feedbackCount++;
        }
    }
    container.textContent = feedbackCount;
}

/**
 * Calculates and displays the number of tasks in the "done" list.
 * Performs error handling if the container element with ID 'done-number' is not found.
 */
function doneNumber() {
    let doneCount = 0;
    const container = document.getElementById('done-number');

    if (!container) {
        console.error("Element with ID 'done-number' not found!");
        return;
    }

    for (const card of cards) {
        if (card.place === 'done') {
            doneCount++;
        }
    }
    container.textContent = doneCount;
}

/**
 * Calculates and displays the total number of tasks in the board using the 'cards' array length.
 * Performs error handling if the container element with ID 'bord-tasks-number' is not found.
 */
function boradTaskNumber() {
    const container = document.getElementById('bord-tasks-number');

    if (!container) {
        console.error("Element with ID 'bord-tasks-number' not found!");
        return;
    }
    container.textContent = cards.length;
}

/**
 * Calculates and displays the number of tasks marked as "Urgent" based on the 'priority.urgency' property within each card object.
 * Performs error handling if the container element with ID 'urgent-number' is not found.
 */
function urgentNumber() {
    let urgentCount = 0;
    const container = document.getElementById('urgent-number');

    if (!container) {
        console.error("Element with ID 'urgent-number' not found!");
        return;
    }

    for (const card of cards) {
        if (card.priority && card.priority.urgency === 'Urgent') {
            urgentCount++;
        }
    }
    container.textContent = urgentCount;
}

/**
 * Finds and displays the closest upcoming due date or overdue cards.
 *
 * This function:
 *  - Creates arrays for overdue and upcoming cards.
 *  - Calls `separateCards` to separate cards based on due dates and current date.
 *  - Calls `sortUpcomingCards` to sort upcoming cards by due date (if any).
 *  - Calls `updateDueDateContainers` to update the UI with the closest upcoming due date or overdue cards information.
 */
function displayClosestDueDate() {
    const currentDate = new Date();
    let overdueCards = [];
    let upcomingCards = [];

    separateCards(overdueCards, upcomingCards, currentDate);
    sortUpcomingCards(upcomingCards);
    updateDueDateContainers(overdueCards, upcomingCards);
}

/**
 * Separates cards into overdue and upcoming categories based on due dates.
 *
 * This function iterates through the `cards` array (assumed to be an array of card objects).
 * For each card with a place other than "done":
 *  - It parses the `dueDate` string into a Date object (if it exists).
 *  - If the due date exists and is earlier than `currentDate`, it adds the card to `overdueCards`.
 *  - If the due date exists and is later than or equal to `currentDate`, it adds the card to `upcomingCards`.
 *
 * @param {array} overdueCards - An array to store overdue cards.
 * @param {array} upcomingCards - An array to store upcoming cards.
 * @param {Date} currentDate - The current date object.
 */
function separateCards(overdueCards, upcomingCards, currentDate) {
    // Loop through cards and separate overdue and upcoming cards
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (card.place !== 'done') {
            const dueDate = card.dueDate ? new Date(card.dueDate.split('-').reverse().join('-')) : null;
            if (dueDate && dueDate < currentDate) {
                overdueCards.push(card);
            } else if (dueDate && dueDate >= currentDate) {
                upcomingCards.push(card);
            }
        }
    }
}

/**
 * Sorts upcoming cards by their due date in ascending order.
 *
 * This function uses the `sort` method with a custom compare function to sort the `upcomingCards` array.
 * The compare function parses the due date strings into Date objects and returns the difference between them.
 * This effectively sorts the cards with the earliest due date first.
 *
 * @param {array} upcomingCards - The array of upcoming card objects.
 * @returns {array} - The sorted array of upcoming cards.
 */
function sortUpcomingCards(upcomingCards) {
    return upcomingCards.sort((a, b) => {
        const dateA = a.dueDate ? new Date(`${a.dueDate.split('-')[1]}/${a.dueDate.split('-')[0]}/${a.dueDate.split('-')[2]}`) : new Date(8640000000000000);
        const dateB = b.dueDate ? new Date(`${b.dueDate.split('-')[1]}/${b.dueDate.split('-')[0]}/${b.dueDate.split('-')[2]}`) : new Date(8640000000000000);
        return dateA - dateB;
    });
}

/**
 * Formats the due date as a localized string.
 * @param {string} dueDate - The due date string in the format "DD-MM-YYYY".
 * @returns {string} - The formatted due date as a localized string.
 */
function formatDueDate(dueDate) {
    const formattedDate = new Date(`${dueDate.split('-')[1]}/${dueDate.split('-')[0]}/${dueDate.split('-')[2]}`);
    return formattedDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Updates UI with overdue/upcoming due date or "No upcoming due dates found" message.
 *
 * This function checks for overdue cards:
 *  - If overdue cards exist, it sets "Missed Deadline" text and iterates to format due dates.
 *  - If no overdue cards exist, it checks for upcoming cards:
 *      - If upcoming cards exist, it formats the closest upcoming due date.
 *      - Otherwise, it sets the message to "No upcoming due dates found".
 * Finally, it calls functions to update the UI elements with the formatted output and deadline text/button styling.
 *
 * @param {array} overdueCards - Array of overdue card objects.
 * @param {array} upcomingCards - Array of upcoming card objects.
 */
function updateDueDateContainers(overdueCards, upcomingCards) {
    let output = '';
    let deadlineText = 'Upcoming Deadline';
    let urgentButtonClass = '';

    if (overdueCards.length > 0) {
        deadlineText = 'Missed Deadline';
        urgentButtonClass = 'missed-deadline';
        for (let i = 0; i < overdueCards.length; i++) {
            const card = overdueCards[i];
            output += formatDueDate(card.dueDate);
        }
    } else if (upcomingCards.length > 0) {
        const closestUpcomingDueDate = upcomingCards[0].dueDate;
        output = formatDueDate(closestUpcomingDueDate);
    } else {
        output = "No upcoming due dates found.";
    }
    outputDueDate(output);
    outputDeadlineText(deadlineText);
    urgentButtonColor(urgentButtonClass);
}

/**
 * Updates the "due-date" element text content (if it exists).
 *
 * This function retrieves the DOM element with ID "due-date" and updates its text content with the provided `output` string.
 * 
 * @param {string} output - The text to display in the "due-date" element.
 */
function outputDueDate(output) {
    const dueDateContainer = document.getElementById('due-date');
    if (dueDateContainer) {
        dueDateContainer.textContent = output;
    }
}

/**
 * Updates the "deadline" element text content (if it exists).
 *
 * This function retrieves the DOM element with ID "deadline" and updates its text content with the provided `deadlineText` string.
 * 
 * @param {string} deadlineText - The text to display in the "deadline" element.
 */
function outputDeadlineText(deadlineText) {
    const deadlineContainer = document.getElementById('deadline');
    if (deadlineContainer) {
        deadlineContainer.textContent = deadlineText;
    }
}

/**
 * Updates the ".urgent-button" element class list for urgency (if it exists).
 *
 * This function retrieves the element with class ".urgent-button".
 * - It removes the "missed-deadline" class (if present).
 * - If `urgentButtonClass` is provided, it adds that class to the element.
 * 
 * @param {string} urgentButtonClass - Class name to add for urgency indication.
 */
function urgentButtonColor(urgentButtonClass) {
    const urgentButton = document.querySelector('.urgent-button');
    if (urgentButton) {
        urgentButton.classList.remove('missed-deadline');
        if (urgentButtonClass) {
            urgentButton.classList.add(urgentButtonClass);
        }
    }
}
