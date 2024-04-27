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
async function loadRemoteContactsOfLoggedInUser() {
    try {
        let result = await getItem('users');
        if (result) {
            allUsers = JSON.parse(result);
            let thisUser = allUsers.find(entry => entry.name === currentUser);
            localContacts = thisUser.userContacts;
            console.log('localContacts beim Laden aus remote Storage (unsortiert)', localContacts);
            return localContacts;
        } else {
            console.log("No users contacts found in storage, returning empty array.");
            return [];
        }
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}

async function updateUserContactsInRemote() {
    console.log("localContacts BEFORE SAVING to storage", allUsers);
    await setItem('users', allUsers);
    console.log("localContacts saved to storage", allUsers);
    await initContacts();
}

async function loadContacts() {
    await Templates('contacts');
    console.log("Im Init vor dem Laden");
    await loadRemoteContactsOfLoggedInUser();
    console.log("Im Init NACH dem Laden");
    await initContacts();
}



async function initContacts() {
    await sortByFirstName();
    let categorizedContacts = await createCategories();
    await renderContactList(categorizedContacts);
}

/**
 * This function sorts all contacts in the `contacts` array alphabetically according to their first names.
 */
async function sortByFirstName() {
    localContacts.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Sortierte localContacts', localContacts);
}


// let userContacts = [];
// let sortedUserContacts = [];
// async function sortByFirstName() {
//     // // Daten aus dem Remote-Speicher abrufen
//     // let usersData = await getItem('users');
//     // console.log('userData', usersData);

//     // // Parsen der JSON-Daten
//     // let users = JSON.parse(usersData);
//     // console.log('userData2', usersData);



//     // Kontakte von Max Mustermann filtern
//     userContacts = users.find(entry => entry.name === currentUser).userContacts;

//     // Funktion zur Sortierung nach dem Vornamen
//     function sortContactsByFirstName(localContacts) {
//         return localContacts.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     // Kontakte von Max Mustermann sortieren
//     sortedUserContacts = sortContactsByFirstName(userContacts);
//     localContacts = sortedUserContacts;
//     console.log('Sortierte localContacts', localContacts);

//     // Ausgabe der sortierten Kontakte von Max Mustermann
//     console.log('sortierte Kontakte von Max', sortedUserContacts);

//     console.log('current User ist: ', currentUser);
// }


/**
 * This function creates categories for contacts based on the first letter of their first names.
 * It returns a new object where each property is a category letter (uppercase) and its value is an array
 * of `Contact` objects belonging to that category.
 *
 * @returns {CategoryContacts} An object containing categories and their associated contacts.
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
 * This function renders the HTML for the contact list based on the provided categorized contacts.
 *
 * @param {CategoryContacts} categories - An object containing categories and their associated contacts.
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
 * This function renders the HTML for a category heading and its associated contacts within the contact list.
 *
 * @param {CategoryContacts} categories - An object containing categories and their associated contacts.
 * @param {string} contactListHTML - The accumulated HTML for the contact list so far.
 * @param {number} index - The current index for tracking contacts.
 * @returns {string} The updated `contactListHTML` string with the rendered category and contacts.
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
 * This function renders the HTML structure for a category heading in the contact list.
 *
 * @param {string} initial - The first letter of the contact names in the category (uppercase).
 * @returns {string} The HTML string representing the category heading.
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
 * This function renders the HTML structure for an individual contact in the contact list.
 *
 * @param {contact} contact - An object containing the contact information (refer to the `Contact` type definition).
 * @param {number} index - The index of the contact within the contacts array.
 * @returns {string} The HTML string representing the individual contact.
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
 * This function shows the card for adding a new contact.
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
 * This function renders the layout for adding a new contact.
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
 * This function generates the HTML template for the cancel and create contact buttons.
 * @returns {string} The HTML string representing the buttons.
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
 * This function hides the card for adding a new contact.
 */
function hideAddContactCard() {
    document.getElementById('addEditContactCard').classList.remove('showAddEditContactContainer');
    setTimeout(() => {
        document.getElementById('addEditContact').style.display = 'none';
    }, 125);
}

/**
 * This function creates a new contact and adds it to the contacts list.
 */
async function createContact() {
    let dataSet = newContactDataSetForArray();
    localContacts.push(dataSet.newContact);
    await updateUserContactsInRemote();
    // await addContactToUser(dataSet.contactData.email, dataSet.newContact);
    // contacts.push(dataSet.newContact);
    await initContacts();
    // let contactIndex = getIndexByNameSurname(contacts, dataSet.formattedName.firstName, dataSet.formattedName.lastName);
    let contactIndex = getIndexByNameSurname(localContacts, dataSet.formattedName.firstName, dataSet.formattedName.lastName);
    openContactInfo(contactIndex);
    showContactCreatedPopUp();
    clearAddContactForm();
    hideAddContactCard();
    scrollToAnchor(`contact(${toggleIndex})`);
}

// async function addContactToUser(userEmail, newContact) {
// try {
// // Daten aus dem Remote-Speicher abrufen
// let usersData = await getItem('users');

// // Parsen der JSON-Daten
// let users = JSON.parse(usersData);

// Den Eintrag des Benutzers basierend auf der E-Mail finden



// let allUsers = await loadUsers();
// let thisUser = allUsers.find(entry => entry.name === currentUser);
// let userEntry = thisUser.userContacts;
// userEntry.push(newContact);

// await setItem('users', JSON.stringify(allUsers));

// localContacts = [];




//         // Sicherstellen, dass der Benutzer gefunden wurde
//         if (!userEntry) {
//             throw new Error('Benutzer nicht gefunden.');
//         }

//         // Zugriff auf das userContacts-Array im Benutzereintrag
//         let userContacts = userEntry.userContacts || [];

//         // Hinzufügen des neuen Kontakts zum userContacts-Array
//         userContacts.push(newContact);

//         // Aktualisierung des userContacts-Arrays im Benutzereintrag
//         userEntry.userContacts = userContacts;

//         // Aktualisierung des value-Feldes im Remote-Array
//         users.data.value = JSON.stringify(users.data.value);

//         // Speichern der aktualisierten Daten im Remote-Speicher
//         await setItem('users', JSON.stringify(users));

//         console.log('Kontakt erfolgreich hinzugefügt.');
//     } catch (error) {
//         console.error('Fehler beim Hinzufügen des Kontakts:', error);
//     }
// }

/**
 * This function retrieves contact data from the input fields and formats it.
 * @returns {object} An object containing the contact data and formatted name.
 */
function newContactDataSetForArray() {
    let contactData = getContactData();
    let formattedName = formatContactName(contactData);
    let newContact = createNewContactDataSet(contactData, formattedName);
    return {
        contactData,
        formattedName,
        newContact,
    };
}

/**
 * This function retrieves the entered contact name, email, and phone number.
 * @returns {object} An object containing the contact data.
 */
function getContactData() {
    const name = document.getElementById("editContactName").value;
    const email = document.getElementById("editContactEmail").value;
    const phone = document.getElementById("editContactPhone").value;
    return {
        name,
        email,
        phone,
    };
}

/**
 * This function formats the contact name by extracting first and last name and capitalizing the first letter of each.
 * @param {object} contactData - An object containing the contact data.
 * @returns {object} An object containing the formatted first and last names.
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
 * This function converts the first letter of a string to uppercase.
 * @param {string} name - The input string whose first letter to be converted.
 * @returns {string} A string with the first letter capitalized and the remaining letters unchanged.
 */
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * This function creates a new contact object with the provided data and formatted name.
 * @param {object} contactData - An object containing the contact data.
 * @param {object} formattedName - An object containing the formatted first and last names.
 * @param {object} existingContact - An optional parameter for an existing contact object (used for editing).
 * @returns {object} The new contact object.
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
 * This function finds the index of a contact in the `contacts` array based on name and surname.
 * @param {array} contacts - The array of contact objects.
 * @param {string} firstName - The first name of the contact to find.
 * @param {string} lastName - The last name of the contact to find.
 * @returns {number} The index of the found contact, or -1 if not found.
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
 * This function shows a pop-up indicating a contact has been created.
 */
function showContactCreatedPopUp() {
    document.getElementById('contactCreatedButtonContainer').classList.add('showContactCreatedButtonContainer');
    setTimeout(() => {
        document.getElementById('contactCreatedButtonContainer').classList.remove('showContactCreatedButtonContainer');
    }, 800);
}

/**
 * This function clears the input fields for adding a new contact.
 */
function clearAddContactForm() {
    document.getElementById("editContactName").value = "";
    document.getElementById("editContactEmail").value = "";
    document.getElementById("editContactPhone").value = "";
}

/**
 * Scrolls the page to the specified anchor element with smooth behavior.
 * 
 * @param {string} anchorId - The ID of the anchor element to scroll to.
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
 * This function opens the contact info panel and populates it with the details of the clicked contact.
 *   - For screens wider than 800px:
 *     - Calls the `highlightCreatedContact` function to visually highlight the clicked contact.
   - Shows the contact info panel by adding the corresponding class to the DOM element.
   - Calls the `openContactInfoHTMLTemplate` function to populate the panel with contact details.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function openContactInfo(index) {
    if (window.innerWidth >= 800) {
        highlightCreatedContact(index);
    }
    document.getElementById('contactInfo').classList.add('showContactDetailsContainer');
    openContactInfoHTMLTemplate(index);
}

/**
 * This function visually highlights the clicked contact on the contact list (for screens wider than 800px).
 * It sets the clicked contact button's style class to indicate it's selected and changes the email color to white.
 * It also updates the `toggleIndex` variable to store the index of the highlighted contact.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function highlightCreatedContact(index) {
    document.getElementById(`contact(${index})`).classList.add('contactClicked');
    document.getElementById(`contactEmail(${index})`).style.color = "white";
    toggleIndex = index;
}

/**
 * This function populates the contact info panel with the details of the clicked contact.
 * It retrieves the contact data from the `contacts` array using the provided index.
 * Then, it updates the HTML content of specific DOM elements with the contact's name, initials, avatar color, email, and phone number.
 * Finally, it updates the "Edit Contact" and "Delete Contact" buttons with the clicked contact's index for proper functionality.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function openContactInfoHTMLTemplate(index) {
    let contact = localContacts[index];
    document.getElementById('contactInfoContactDetails').innerHTML = /*html*/`
                    <div class="contactInfoAvatarAndName">
                        <div class="contactInfoAvatar" style="background-color: ${contact.avatarColor};">
                            ${contact['initials']}
                        </div>
                        <div>
                            <div class="contactInfoName">
                                ${contact['name']} ${contact['surname']}
                            </div>
                            <div class="editContactMenuDesktop">
                                <div class="editContact" onclick="showEditContact(${index})">
                                    <img src="./img/editContactIcon.svg">
                                    <span>Edit</span>
                                </div>
                                <div class="deleteContact" onclick="deleteContact(${index})">
                                    <img src="./img/deleteContactIcon.svg">
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contactInfoHeadlineDesktop">
                Contact Information
            </div>
                    <div class="contactInfoEmailAndPhone">
                        <div class="contactInfoEmail">
                            <p>Email</p>
                            <a href="mailto:abc@example.com">${contact['email']}</a>
                        </div>
                        <div class="contactInfoPhone">
                            <p>Phone</p>
                            <span>${contact['phone']}</span>
                        </div>
                    </div>
            `;

    document.getElementById('editContactButtonContainer').innerHTML = /*html*/`
             <button class="addContactButton" id="addContactButton" onclick="showContactEditDeleteMenu(${index})">
                <img src="./img/contactMenuButton.svg">
            </button>
                                                                `;
}

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
* This function shows the edit and delete menu for the clicked contact on mobile screens (less than 800px wide).
* It populates the menu container with the "Edit" and "Delete" buttons and adds an event listener to prevent event bubbling.
* @param {number} index - The index of the clicked contact in the `contacts` array.
*/
function showContactEditDeleteMenu(index) {
    document.getElementById('editContactMenuContainer').classList.add('showEditContactMenu');
    document.getElementById('editContactMenuContainer').innerHTML = /*html*/`
                                                                                <div class="editContactMenu" id="editContactMenu">
                                                                                    <div class="editContact" onclick="showEditContact(${index})">
                                                                                        <img src="./img/editContactIcon.svg">
                                                                                        <span>Edit</span>
                                                                                    </div>
                                                                                    <div class="deleteContact" onclick="deleteContact(${index})">
                                                                                        <img src="./img/deleteContactIcon.svg">
                                                                                        <span>Delete</span>
                                                                                    </div>
                                                                                </div>

    `;
    document.getElementById('editContactMenu').onclick = function (event) {
        event.stopPropagation();
    };
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
 * This function populates the edit contact card with the details of the clicked contact.
 * It sets the avatar background color and initials, fills the name, email, and phone input fields with the contact's data, and sets focus on the name field after a short delay.
 * @param {number} index - The index of the clicked contact in the `contacts` array.
 */
function editContactDeleteAndSaveButtonLayoutHTMLTemplate(index) {
    document.getElementById('addEditContactButtons').innerHTML = /*html*/`
                                                                            <button type="button" class="deleteEditContactButton" onclick="deleteContact(${index})">
                                                                                <p>Delete</p>
                                                                            </button>
                                                                            <button type="submit"class="saveEditContactButton" onclick="updateContact(${index})">
                                                                                <p>Save</p>
                                                                                <img src="./img/createTaskCheckIcon.svg">
                                                                            </button>
                                                                        `;
}

/**
 * This function removes the clicked contact from the `contacts` array and performs other actions after deletion is confirmed.
 * It removes the contact data at the specified index, hides the add contact card, refreshes the contact list, hides the edit/delete menu, and closes the contact info panel.
 * @param {number} index - The index of the contact to be deleted from the `contacts` array.
 */
async function deleteContact(index) {
    localContacts.splice(index, 1);
    await updateUserContactsInRemote();
    hideAddContactCard();
    await initContacts();
    hideContactEditDeleteMenu();
    closeContactInfo();
}

/**
 * This function hides the edit and delete menu container by removing the corresponding class.
 */
function hideContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.remove('showEditContactMenu');
}

/**
 * This function handles updating the contact details based on the user's edits in the edit contact card.
 * It retrieves the updated values from the input fields, validates if all fields are filled, formats the name if necessary, and updates the contact data in the `contacts` array.
 * It then optionally refreshes the contact list and opens the contact info panel for the updated contact. Finally, it optionally clears the input fields and hides the add contact card.
 * @param {number} index - The index of the contact to be updated in the `contacts` array.
 */
async function updateContact(index) {
    // Erfassen Sie die aktualisierten Werte aus den Eingabefeldern
    let contactData = getContactData();

    // Überprüfen Sie, ob alle Felder ausgefüllt sind
    if (contactData.name && contactData.email && contactData.phone) {
        // Formatieren Sie den Namen
        let formattedName = formatContactName(contactData);

        // Übergeben Sie den vorhandenen Kontakt, um dessen Farbe beizubehalten
        let existingContact = localContacts[index];

        // Aktualisieren Sie den ausgewählten Kontakt im Array
        localContacts[index] = createNewContactDataSet(contactData, formattedName, existingContact);

        hideAddContactCard();
        // Optional: Aktualisieren Sie die Kontaktliste auf der Seite
        console.log("VOR INIT aus EDIT USER");
        await initContacts();
        console.log("NACH INIT aus EDIT USER");

        let contactIndex = getIndexByNameSurname(localContacts, formattedName.firstName, formattedName.lastName);
        openContactInfo(contactIndex);

        // Optional: Leeren Sie die Eingabefelder
        clearAddContactForm();

    } else {
        // Geben Sie eine Fehlermeldung aus, wenn nicht alle Felder ausgefüllt sind
        alert("Bitte füllen Sie alle Felder aus.");
    }
    console.log("VOR dem Updaten der Kontakte ins Remot");
    await updateUserContactsInRemote();
    console.log("NACH dem Updaten der Kontakte ins Remot");
}