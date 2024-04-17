async function init() {
    //login page after start animation//
    startAnimation();
    loadUsers();
    includeHTML();
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
 * Loads the legal notice template and closes the navigation overlay dropdown menu.
 */
function dropdowenLegalNotice() {
    Templates('legal_notice');
    closeDropdowen();
}

/**
 * Loads the privacy policy template and closes the navigation overlay dropdown menu.
 */
function dropdowenPrivacyPolicy() {
    Templates('privacy_policy');
    closeDropdowen();
}

/**
 * Loads the help template and closes the navigation overlay dropdown menu.
 */
function dropdowenHelp() {
    Templates('help');
    closeDropdowen();
}

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

// summary -------------------------------------------------------------------------------------------------------
/**
 * Loads and displays the summary template and then retrieves task counts for each list.
 *
 * @async
 */
async function summaryLode() {
    await Templates('summary');
    summaryLodeNumbers();
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
    Deadline();
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

//not functioning just jet may have to do with date in array.
function Deadline() {

}


