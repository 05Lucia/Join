let avatarColors = ["rgb(255,122,0)", "rgb(255,70,70)", "rgb(147,39,255)", "rgb(110,82,255)", "rgb(252,113,255)", "rgb(255,187,43)", "rgb(31,215,193)", "rgb(70,47,138)"]

let contacts = [
    {
        "name": "Anton",
        "surname": "Mayer",
        "initials": "AM",
        "avatarColor": "rgb(255,122,0)",
        "email": "anton@gmail.com",
        "phone": "+49 1111 111 11 1",
        "category": "A"
    },
    {
        "name": "Albert",
        "surname": "Gerdes",
        "initials": "AG",
        "avatarColor": "rgb(255,70,70)",
        "email": "albert@gmail.com",
        "phone": "+49 2222 222 22 2",
        "category": "A"
    },
    {
        "name": "Aaron",
        "surname": "Brier",
        "initials": "AB",
        "avatarColor": "rgb(147,39,255)",
        "email": "aaron@gmail.com",
        "phone": "+49 3333 333 33 3",
        "category": "A"
    },
    {
        "name": "Britta",
        "surname": "Zielke",
        "initials": "BZ",
        "avatarColor": "rgb(110,82,255)",
        "email": "b.zielke@gmail.com",
        "phone": "+49 4444 444 44 4",
        "category": "B"
    },
    {
        "name": "Carsten",
        "surname": "Schmidt",
        "initials": "CS",
        "avatarColor": "rgb(252,113,255)",
        "email": "carsten.schmidt@gmail.com",
        "phone": "+49 5555 555 55 5",
        "category": "C"
    },
    {
        "name": "Bernt",
        "surname": "Saathoff",
        "initials": "BS",
        "avatarColor": "rgb(255,187,43)",
        "email": "bernt.s@gmail.com",
        "phone": "+49 6666 666 66 6",
        "category": "B"
    },
    {
        "name": "Caroline",
        "surname": "Tabeling",
        "initials": "CT",
        "avatarColor": "rgb(31,215,193)",
        "email": "caroline@gmail.com",
        "phone": "+49 7777 777 77 7",
        "category": "C"
    },
    {
        "name": "Diana",
        "surname": "König",
        "initials": "DK",
        "avatarColor": "rgb(255,70,70)",
        "email": "diana.koenig@gmail.com",
        "phone": "+49 8888 888 88 8",
        "category": "D"
    },
    {
        "name": "Erik",
        "surname": "Wagner",
        "initials": "EW",
        "avatarColor": "rgb(255,0,191)",
        "email": "erik.wagner@gmail.com",
        "phone": "+49 9999 999 99 9",
        "category": "E"
    },
    {
        "name": "Fiona",
        "surname": "Müller",
        "initials": "FM",
        "avatarColor": "rgb(255,122,0)",
        "email": "fiona.mueller@gmail.com",
        "phone": "+49 1010 101 01 0",
        "category": "F"
    }
]

let localContacts = [];
let allUsers = [];
let currentUser = localStorage.getItem('currentUserName');
let userEmail = "";

/**
 * Loads contacts by rendering templates, fetching remote contacts,
 * checking if the user is added, and initializing the display.
 *
 * @returns {Promise<void>} A promise that resolves when all contacts are loaded and displayed.
 */
async function loadContacts() {
    await Templates('contacts');
    await loadRemoteContactsOfLoggedInUser();
    await checkIfUserIsAddedAsContact();
    await initContacts();
}

/**
 * Fetches remote contacts for the logged-in user from storage.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of contact objects, or an empty array if no contacts are found.
 */
async function loadRemoteContactsOfLoggedInUser() {
    try {
        let result = await getItem('users');
        if (result) {
            allUsers = JSON.parse(result);
            let thisUser = allUsers.find(entry => entry.name === currentUser);
            localContacts = thisUser.userContacts;
            userEmail = thisUser.email;
            return localContacts;
        } else {
            return [];
        }
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}

/**
 * Checks if the current user is already added as a contact in the local contacts list.
 *
 * @returns {Promise<boolean>} A promise that resolves with true if the user is a contact, or false otherwise.
 */
async function checkIfUserIsAddedAsContact() {
    for (let i = 0; i < localContacts.length; i++) {
        if (localContacts[i].email === userEmail) {
            return true;
        }
    }
    createUserAsContact();
}

/**
 * Creates a new contact object for the current user if they are not already added.
 *
 * @returns {Promise<void>} A promise that resolves when the user is added as a contact.
 */
async function createUserAsContact() {
    let name = currentUser;
    let email = userEmail;
    let phone = "+49";
    let dataSet = newContactDataSetForArray(name, email, phone);
    localContacts.push(dataSet.newContact);
    await updateUserContactsInRemote();
    clearAddContactForm();
}

/**
 * Updates the remote storage with the current list of user contacts.
 *
 * @returns {Promise<void>} A promise that resolves when the remote storage is updated.
 */
async function updateUserContactsInRemote() {
    await setItem('users', allUsers);
    await initContacts();
}

/**
 * Initializes the contact display by performing the following steps:
 * 1. Sorts contacts by first name.
 * 2. Creates categories for contacts based on their first letter.
 * 3. Renders the contact list with categories and individual contacts.
 *
 * @returns {Promise<void>} A promise that resolves when the contact list is initialized.
 */
async function initContacts() {
    await sortByFirstName();
    let categorizedContacts = await createCategories();
    await renderContactList(categorizedContacts);
}

/**
 * Sorts the `localContacts` array in ascending order by the first name of each contact.
 *
 * @returns {Promise<void>} A promise that resolves when sorting is complete.
 */
async function sortByFirstName() {
    localContacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Creates categories for contacts based on the first letter of their names.
 *
 * @returns {Promise<Object>} A promise that resolves with an object where keys are category initials (uppercase letters)
 * and values are arrays of contacts belonging to that category.
 */
async function createCategories() {
    let categories = {};
    localContacts.forEach(contact => {
        let initial = contact.name.charAt(0).toUpperCase();
        if (!categories[initial]) {
            categories[initial] = [];
        }
        categories[initial].push(contact);
    });
    return categories;
}

/**
 * Renders the HTML structure for the contact list with categories and individual contacts.
 *
 * @param {Object} categories An object containing contact categories (initials as keys, contact arrays as values).
 * @returns {Promise<void>} A promise that resolves when the contact list is rendered.
 */
async function renderContactList(categories) {
    let contactListHTML = '';
    let index = 0;
    contactListHTML = renderContactCategoryAndEachContact(categories, contactListHTML, index);
    document.getElementById("contactList").innerHTML = `
            <div class="contactBoxForEachLetter">
                ${contactListHTML}
            </div>
        `;
}

/**
 * Recursively renders the HTML for contact categories and individual contacts within those categories.
 *
 * @param {Object} categories An object containing contact categories (initials as keys, contact arrays as values).
 * @param {string} contactListHTML The accumulated HTML string for the contact list.
 * @param {number} index A counter to keep track of unique IDs for each contact.
 * @returns {string} The updated `contactListHTML` string with rendered categories and contacts.
 */
function renderContactCategoryAndEachContact(categories, contactListHTML, index) {
    for (let initial in categories) {
        contactListHTML += renderContactCategory(initial);
        categories[initial].forEach(contact => {
            contactListHTML += renderEachContact(contact, index);
            index++;
        });
    }
    return contactListHTML;
}

/**
 * Renders the HTML structure for a single contact category (e.g., "A").
 *
 * @param {string} initial The first letter (uppercase) representing the category.
 * @returns {string} The HTML string for the contact category.
 */
function renderContactCategory(initial) {
    return `
            <div class="sectionByFirstLetter">
                ${initial}
            </div>
            <div class="contactsSeparator">
            </div>
        `;
}

/**
 * Renders the HTML structure for a single contact with its details.
 *
 * @param {Object} contact A contact object containing properties like name, surname, email, avatarColor, and initials.
 * @param {number} index A unique identifier for the contact.
 * @returns {string} The HTML string for the individual contact.
 */
function renderEachContact(contact, index) {
    return `
    <div class="contact" id="contact(${index})" onclick="changeContactButtonColorAsClicked(${index})"> <!-- Index übergeben -->
        <div class="contactAvatar" style="background-color: ${contact.avatarColor};">
            ${contact.initials}
        </div>
        <div class="contactNameAndEmail">
            <div class="contactName">
                ${contact.name} ${contact.surname}
            </div>
            <div class="contactEmail" id="contactEmail(${index})">
                ${contact.email}
            </div>
        </div>
    </div>
`;
}

/**
 * Shows the "Add Contact" card by:
 * 1. Unhiding the container element.
 * 2. An animating the card entrance with a slight delay.
 * 3. Rendering the initial layout for adding a contact.
 * 4. Preventing event bubbling on the card itself.
 */
function showAddContactCard() {
    document.getElementById('addEditContact').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('addEditContactCard').classList.add('showAddEditContactContainer');
    }, 25);
    renderAddContactLayout();
    document.getElementById('addEditContactCard').onclick = function (event) {
        event.stopPropagation();
    };
}

/**
 * Renders the initial layout for adding a contact within the card.
 * - Sets the headline to "Add contact".
 * - Shows the subheadline element.
 * - Sets the avatar icon background color and adds an "Add Contact" image.
 * - Clears the input fields for name, email, and phone.
 * - Updates the buttons section with the HTML template for cancel and create buttons.
 */
function renderAddContactLayout() {
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Add contact';
    document.getElementById('addContactSubheadline').style.display = 'flex';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(209, 209, 209, 1)';
    document.getElementById('avatarIcon').innerHTML = '<img src="./img/addContactAvatar.svg">';
    document.getElementById('editContactName').value = '';
    document.getElementById('editContactEmail').value = '';
    document.getElementById('editContactPhone').value = '';
    document.getElementById('addEditContactButtons').innerHTML = addContactButtonsCancelAndCreateButtonsHTMLTemplate();
}

/**
 * Generates the HTML template for the cancel and create buttons used in the "Add Contact" card.
 *
 * @returns {string} The HTML string containing the button elements.
 */
function addContactButtonsCancelAndCreateButtonsHTMLTemplate() {
    return /*html*/`
            <button type="button" class="cancelCreateContactButton" id="cancelCreateContactButton" onclick="hideAddContactCard()">
                <p>Cancel</p>
                <img src="./img/clearTaskX.svg">
            </button>
            <button type="submit" class="createContactButton" id="createContactButton">
                <p>Create contact</p>
                <img src="./img/createTaskCheckIcon.svg">
            </button>
            `;
}

/**
 * Hides the "Add Contact" card by:
 * 1. Animating the card exit with a slight delay.
 * 2. Hiding the container element after the animation.
 */
function hideAddContactCard() {
    document.getElementById('addEditContactCard').classList.remove('showAddEditContactContainer');
    setTimeout(() => {
        document.getElementById('addEditContact').style.display = 'none';
    }, 125);
}

/**
 * This function creates a new contact, checks for duplicate emails, and performs
 * subsequent actions such as updating storage, initializing the contact list,
 * and opening the created contact's info.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if a duplicate email
 * is found, preventing further processing.
 */
async function createContact() {
    let dataSet = newContactDataSetForArray();
    if (checkForDuplicateEmail(dataSet.contactData.email)) {
        return true;
      }
    localContacts.push(dataSet.newContact);
    await updateUserContactsInRemote();
    await initContacts();
    let contactIndex = getIndexByNameSurname(localContacts, dataSet.formattedName.firstName, dataSet.formattedName.lastName);
    openContactInfo(contactIndex);
    showContactCreatedPopUp();
    clearAddContactForm();
    hideAddContactCard();
    scrollToAnchor(`contact(${toggleIndex})`);
}

/**
 * This function creates a new contact data set object by:
 * 1. Extracting contact data (name, email, phone) from input fields or provided defaults.
 * 2. Formatting the contact name by capitalizing the first letter of each word.
 * 3. Creating a new contact data set with formatted name, initials, email, phone, category, and avatar color.
 *
 * @param {string} name (optional) The name to use. If omitted, retrieves from the editContactName field.
 * @param {string} email (optional) The email address to use. If omitted, retrieves from the editContactEmail field.
 * @param {string} phone (optional) The phone number to use. If omitted, retrieves from the editContactPhone field.
 * @returns {Object} An object containing the contact data set with formatted name, initials, email, phone, category, and avatar color.
 */
function newContactDataSetForArray(name, email, phone) {
    let contactData = getContactData(name, email, phone);
    let formattedName = formatContactName(contactData);
    let newContact = createNewContactDataSet(contactData, formattedName);
    return {
        contactData,
        formattedName,
        newContact,
    };
}

/**
 * This function extracts contact data (name, email, phone) from input fields or provided defaults.
 * 
 * @param {string} name (optional) The name to use. If omitted, retrieves from the editContactName field.
 * @param {string} email (optional) The email address to use. If omitted, retrieves from the editContactEmail field.
 * @param {string} phone (optional) The phone number to use. If omitted, retrieves from the editContactPhone field.
 * @returns {Object} An object containing the extracted name, email, and phone data.
 */
function getContactData(name = "", email = "", phone = "") {
    if (name === "") {
        name = document.getElementById("editContactName").value;
    }
    if (email === "") {
        email = document.getElementById("editContactEmail").value;
    }
    if (phone === "") {
        phone = document.getElementById("editContactPhone").value;
    }
    return {
        name,
        email,
        phone,
    };
}

/**
 * This function formats a contact name by capitalizing the first letter of each word.
 *
 * @param {Object} contactData An object containing the name property to be formatted.
 * @returns {Object} An object containing the formatted firstName and lastName properties.
 */
function formatContactName(contactData) {
    let [firstName, lastName] = contactData.name.split(" ");
    if (!firstName) {
        firstName = "";
    }
    if (!lastName) {
        lastName = "";
    }
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    return {
        firstName,
        lastName,
    };
}

/**
 * This function capitalizes the first letter of a string.
 *
 * @param {string} name The string to be capitalized.
 * @returns {string} The string with the first letter capitalized.
 */
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * This function creates a new contact data set object containing formatted name, initials,
 * email, phone, category, and avatar color.
 *
 * @param {Object} contactData An object containing name, email, and phone properties.
 * @param {Object} formattedName An object containing firstName and lastName properties.
 * @param {Object} existingContact (optional) An existing contact object to inherit avatar color from.
 * @returns {Object} The newly created contact data set object.
 */
function createNewContactDataSet(contactData, formattedName, existingContact = null) {
    let avatarColor;
    if (existingContact) {
        avatarColor = existingContact.avatarColor;
    } else {
        avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    }
    const initials = formattedName.firstName.charAt(0).toUpperCase() + formattedName.lastName.charAt(0).toUpperCase();
    const category = formattedName.firstName.charAt(0).toUpperCase();
    return {
        name: formattedName.firstName,
        surname: formattedName.lastName,
        initials,
        email: contactData.email,
        phone: contactData.phone,
        category,
        avatarColor,
    };
}

/**
 * This function checks if a contact with the provided email already exists in the
 * `localContacts` array.
 *
 * @param {string} email The email address to check for duplication.
 * @returns {boolean} `true` if a duplicate email is found, `false` otherwise.
 */
function checkForDuplicateEmail(email) {
    for (let i = 0; i < localContacts.length; i++) {
      if (localContacts[i].email === email) {
        alert('A contact with the same email address already exists in your list.');
        return true;
      }
    }
    return false;
  }

/**
 * This function finds the index of a contact in the `localContacts` array by name (first and last).
 *
 * @param {Array} localContacts The array of contact objects.
 * @param {string} firstName The first name of the contact to find.
 * @param {string} lastName The last name of the contact to find.
 * @returns {number} The index of the contact in the array, or -1 if not found.
 */
function getIndexByNameSurname(localContacts, firstName, lastName) {
    for (let i = 0; i < localContacts.length; i++) {
        if (localContacts[i].name === firstName && localContacts[i].surname === lastName) {
            return i;
        }
    }
    return -1;
}

/**
 * This function opens the contact info card and populates it with the contact at the specified index.
 *
 * @param {number} index The index of the contact to open.
 */
   function openContactInfo(index) {
    if (window.innerWidth >= 800) {
        highlightCreatedContact(index);
    }
    document.getElementById('contactInfo').classList.add('showContactDetailsContainer');
    openContactInfoHTMLTemplate(index);
}

/**
 * This function visually highlights the newly created contact in the contact list.
 *
 * @param {number} index The index of the newly created contact.
 */
function highlightCreatedContact(index) {
    document.getElementById(`contact(${index})`).classList.add('contactClicked');
    document.getElementById(`contactEmail(${index})`).style.color = "white";
    toggleIndex = index;
}

/**
 * This function displays a temporary "Contact Created" pop-up notification.
 */
function showContactCreatedPopUp() {
    document.getElementById('contactCreatedButtonContainer').classList.add('showContactCreatedButtonContainer');
    setTimeout(() => {
        document.getElementById('contactCreatedButtonContainer').classList.remove('showContactCreatedButtonContainer');
    }, 800);
}

/**
 * This function clears the input fields in the "Add Contact" form.
 */
function clearAddContactForm() {
    document.getElementById("editContactName").value = "";
    document.getElementById("editContactEmail").value = "";
    document.getElementById("editContactPhone").value = "";
}

/**
 * This function smooth-scrolls the webpage to the element with the specified anchor ID.
 *
 * @param {string} anchorId The ID of the anchor element to scroll to.
 */
function scrollToAnchor(anchorId) {
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
}

/**
* This variable stores an array of IDs for buttons that have been clicked on the contact list.
* Used to keep track of clicked contacts for styling purposes.
* @type {string[]}
*/
let clickedButtons = [];

/**
 * This variable stores an array of IDs for email elements within clicked contacts.
 * Used to keep track of clicked contact email colors for styling purposes.
 * @type {string[]}
 */
let clickedButtonEmailColors = [];

/**
 * This function handles clicks on contact buttons in the contact list.
 * It checks the screen size and performs different actions based on the width.
 *   - For screens wider than 800px:
 *     - Unclicks any previously clicked contact.
     - Gets the ID of the clicked button and its DOM element.
     - Toggles the clicked button's color and style.
     - Changes the email color of the clicked contact to white.
   - For screens smaller than 800px:
     - Opens the contact info for the clicked contact.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function changeContactButtonColorAsClicked(index) {
    if (window.innerWidth >= 800) {
        unclickCreatedContact(toggleIndex);
        const buttonId = `contact(${index})`;
        const buttonElement = document.getElementById(buttonId);
        toggleContactButtonColor(buttonId, buttonElement, index);
        changeContactButtonEmailColorToWhite(index);
    } else if (window.innerWidth < 800) {
        openContactInfo(index);
    }
}

/**
 * This function toggles the color and style of a clicked contact button.
 * It checks if the button has already been clicked.
 *   - If clicked:
 *     - Resets the button's color and style to its original state.
     - Closes the contact info.
   - If not clicked:
 *     - Sets the button's color and style to indicate it's clicked.
     - Opens the contact info.
     - Adds the button's ID to the `clickedButtons` array.
     - Resets the color of the previously clicked contact button (if any).
 * @param {string} buttonId - The ID of the clicked button.
 * @param {HTMLElement} buttonElement - The DOM element of the clicked button.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function toggleContactButtonColor(buttonId, buttonElement, index) {
    if (clickedButtons.includes(buttonId)) {
        resetContactButtonColor(buttonElement, buttonId);
        closeContactInfo();
    } else {
        setButtonColorAsClicked(buttonElement);
        openContactInfo(index);
        clickedButtons.push(buttonId);
        resetLastClickedContactButtonColor();
    }
}

/**
 * This function resets the color and style of a clicked contact button to its original state.
 * It also removes the button's ID from the `clickedButtons` array.
 * @param {HTMLElement} buttonElement - The DOM element of the button to reset.
 * @param {string} buttonId - The ID of the button to reset.
 */
function resetContactButtonColor(buttonElement, buttonId) {
    buttonElement.classList.remove('contactClicked');
    clickedButtons = clickedButtons.filter(id => id !== buttonId);
}

/**
 * This function sets the color and style of a contact button to indicate it's clicked.
 * @param {HTMLElement} buttonElement - The DOM element of the button to style.
 */
function setButtonColorAsClicked(buttonElement) {
    buttonElement.classList.add('contactClicked');
}

/**
 * This function resets the color of the previously clicked contact button (if any).
 * It retrieves the ID of the last clicked button from the `clickedButtons` array and removes it from the DOM styles.
 */
function resetLastClickedContactButtonColor() {
    const lastClickedButtonId = clickedButtons[clickedButtons.length - 2];
    if (lastClickedButtonId) {
        document.getElementById(lastClickedButtonId).classList.remove('contactClicked');
        clickedButtons = clickedButtons.filter(id => id !== lastClickedButtonId);
    }
}

/**
 * This function closes the contact info panel by removing the corresponding class from the DOM element.
 */
function closeContactInfo() {
    document.getElementById('contactInfo').classList.remove('showContactDetailsContainer');
}

/**
 * This function changes the email color of a clicked contact to white (for screens wider than 800px).
 * It retrieves the email element's ID and DOM element based on the clicked contact index.
 * Then, it calls the `toggleContactButtonEmailColor` function to handle the color change logic.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function changeContactButtonEmailColorToWhite(index) {
    if (window.innerWidth >= 800) {
        const emailId = `contactEmail(${index})`;
        const emailElement = document.getElementById(emailId);
        toggleContactButtonEmailColor(emailId, emailElement, index);
    }
}

/**
 * This function toggles the color of the email element within a clicked contact button.
 * It checks if the email element has already been clicked.
 *   - If clicked:
 *     - Resets the email element's color to its original state.
   - If not clicked:
 *     - Sets the email element's color to white.
     - Adds the email element's ID to the `clickedButtonEmailColors` array.
     - Resets the color of the previously clicked contact's email element (if any).
 * @param {string} emailId - The ID of the email element within the clicked contact button.
 * @param {HTMLElement} emailElement - The DOM element of the email element.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function toggleContactButtonEmailColor(emailId, emailElement, index) {
    if (clickedButtonEmailColors.includes(emailId)) {
        resetContactButtonEmailColor(emailElement, emailId);
    } else {
        setEmailColorAsClicked(emailElement);
        clickedButtonEmailColors.push(emailId);
        resetLastClickedContactButtonEmailColor();
    }
}

/**
 * This function resets the color of a clicked contact's email element to its original state.
 * It also removes the email element's ID from the `clickedButtonEmailColors` array.
 * @param {HTMLElement} emailElement - The DOM element of the email element to reset.
 * @param {string} emailId - The ID of the email element to reset.
 */
function resetContactButtonEmailColor(emailElement, emailId) {
    emailElement.style.color = "rgba(69, 137, 255, 1)";
    clickedButtonEmailColors = clickedButtonEmailColors.filter(id => id !== emailId);
}

/**
 * This function sets the color of a contact's email element to white.
 * @param {HTMLElement} emailElement - The DOM element of the email element to style.
 */
function setEmailColorAsClicked(emailElement) {
    emailElement.style.color = "white";
}

/**
 * This function resets the color of the previously clicked contact's email element (if any).
 * It retrieves the ID of the last clicked email element from the `clickedButtonEmailColors` array and removes it from the DOM styles.
 */
function resetLastClickedContactButtonEmailColor() {
    const lastClickedEmailId = clickedButtonEmailColors[clickedButtonEmailColors.length - 2];
    if (lastClickedEmailId) {
        document.getElementById(lastClickedEmailId).style.color = "rgba(69, 137, 255, 1)";
        clickedButtonEmailColors = clickedButtonEmailColors.filter(id => id !== lastClickedEmailId);
    }
}

/**
* This variable stores the index of the currently highlighted contact (for screens wider than 800px).
* Used to keep track of which contact is visually selected.
* @type {number}
*/
let toggleIndex = 0;

/**
* This function removes the visual highlight from the previously highlighted contact (for screens wider than 800px).
* It uses the `toggleIndex` variable to identify the contact that was previously highlighted.
* It removes the "contactClicked" class from the button and resets the email color to its original state.
* @param {number} toggleIndex - The index of the previously highlighted contact (should be the same value stored in the `toggleIndex` variable).
*/
function unclickCreatedContact(toggleIndex) {
    document.getElementById(`contact(${toggleIndex})`).classList.remove('contactClicked');
    document.getElementById(`contactEmail(${toggleIndex})`).style.color = "rgba(69, 137, 255, 1)";
}

/**
 * This function opens the edit contact card to modify the details of the clicked contact.
 * It shows the card container, sets a timeout to add the "show" class with animation, and calls other functions to handle additional functionalities.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function showEditContact(index) {
    document.getElementById('addEditContact').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('addEditContactCard').classList.add('showAddEditContactContainer');
    }, 25);
    showEditAndDeleteMenuOnMobile();
    redesignAddContactCardToEditContactCard();
    showCurrentContactDetails(index);
    editContactDeleteAndSaveButtonLayoutHTMLTemplate(index);
    if (window.innerWidth < 800) {
        document.getElementById('editContactMenuContainer').style.display = 'flex';
    }
    document.getElementById('addEditContactCard').onclick = function (event) {
        event.stopPropagation();
    };
}

/**
 * This function hides the edit and delete menu on mobile screens (less than 800px wide) when the edit contact card is opened.
 */
function showEditAndDeleteMenuOnMobile() {
    if (window.innerWidth < 800) {
        document.getElementById('editContactMenuContainer').style.display = 'none';
        hideContactEditDeleteMenu();
    }
}

/**
 * This function visually changes the add contact card to the edit contact card layout.
 * It adds the "show" class for animation, changes the title to "Edit contact", and hides the subtitle.
 */
function redesignAddContactCardToEditContactCard() {
    document.getElementById('addEditContact').classList.add('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Edit contact';
    document.getElementById('addContactSubheadline').style.display = 'none';
}

/**
 * This function populates the edit contact card with the details of the clicked contact.
 * It sets the avatar background color and initials, fills the name, email, and phone input fields with the contact's data, 
 * and sets focus on the name field after a short delay.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function showCurrentContactDetails(index) {
    document.getElementById('avatarIcon').style.backgroundColor = `${localContacts[index]['avatarColor']}`;
    document.getElementById('avatarIcon').innerHTML = `${localContacts[index]['initials']}`;
    var inputNameField = document.getElementById('editContactName');
    var nameToShow = `${localContacts[index]['name']} ${localContacts[index]['surname']}`;
    inputNameField.value = nameToShow;
    inputNameField.setSelectionRange(nameToShow.length, nameToShow.length);
    document.getElementById('editContactEmail').value = localContacts[index]['email'];
    document.getElementById('editContactPhone').value = localContacts[index]['phone'];
    setTimeout(function () {
        inputNameField.focus();
    }, 125);
}

/**
 * This function attempts to delete a contact at the specified index. Deletion is prevented
 * if the contact's email matches the user's email.
 *
 * @param {number} index The index of the contact to delete in the `localContacts` array.
 * @returns {Promise<void>} A promise that resolves when the deletion process is complete.
 */
async function deleteContact(index) {
    if (localContacts[index].email === userEmail) {
        alert('The user cannot delete themselves from their own contact list.');
    } else {
        localContacts.splice(index, 1);
        await updateUserContactsInRemote();
        hideAddContactCard();
        await initContacts();
        hideContactEditDeleteMenu();
        closeContactInfo();
    }
}

/**
 * This function hides the edit and delete menu container by removing the corresponding class.
 */
function hideContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.remove('showEditContactMenu');
}

/**
 * This function updates an existing contact at the specified index. It checks if all required
 * fields (name, email, phone) are filled before updating.
 *
 * @param {number} index The index of the contact to update in the `localContacts` array.
 * @returns {Promise<void>} A promise that resolves when the update process is complete.
 */
async function updateContact(index) {
    let contactData = getContactData();
    if (contactData.name && contactData.email && contactData.phone) {
        let formattedName = formatContactName(contactData);
        let existingContact = localContacts[index];
        localContacts[index] = createNewContactDataSet(contactData, formattedName, existingContact);
        hideAddContactCard();
        await initContacts();
        let contactIndex = getIndexByNameSurname(localContacts, formattedName.firstName, formattedName.lastName);
        openContactInfo(contactIndex);
        clearAddContactForm();
    } else {
        alert("Please fill out every input field.");
    }
    await updateUserContactsInRemote();
}