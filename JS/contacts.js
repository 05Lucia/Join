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
    }
]

function initContacts() {
    // Sortieren der Kontakte nach Vornamen
    sortByFirstName(contacts);
    // Erstellen der Kategorien
    let categorizedContacts = createCategories(contacts);
    // Anzeigen der Kontaktliste nach Kategorien
    renderContactList(categorizedContacts);
}

function sortByFirstName(contacts) {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Sortierte Kontakte', contacts);
}

function createCategories(contacts) {
    let categories = {};
    contacts.forEach(contact => {
        let initial = contact.name.charAt(0).toUpperCase();
        if (!categories[initial]) {
            categories[initial] = [];
        }
        categories[initial].push(contact);
    });
    return categories;
}

function renderContactList(categories) {
    let contactListHTML = ''; // Variable zum Sammeln des HTML-Codes für die Kontaktliste
    let index = 0; // Initialisieren des Index für die Kontakte
    contactListHTML = renderContactCategoryAndEachContact(categories, contactListHTML, index);
    // Kontaktliste in das HTML einfügen
    document.getElementById("contactList").innerHTML = `
            <div class="contactBoxForEachLetter">
                ${contactListHTML}
            </div>
        `;
}

function renderContactCategoryAndEachContact(categories, contactListHTML, index) {
    for (let initial in categories) {
        // Kategorie-Überschrift hinzufügen
        contactListHTML += renderContactCategory(initial);
        // Kontakte für die aktuelle Kategorie hinzufügen
        categories[initial].forEach(contact => {
            contactListHTML += renderEachContact(contact, index);
            index++; // Inkrementieren des Index für den nächsten Kontakt
        });
    }
    return contactListHTML;
}

function renderContactCategory(initial) {
    return `
            <div class="sectionByFirstLetter">
                ${initial}
            </div>
            <div class="contactsSeparator">
            </div>
        `;
}

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

function renderAddContactLayout() {
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Add contact';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(209, 209, 209, 1)';
    document.getElementById('avatarIcon').innerHTML = '<img src="./img/addContactAvatar.svg">';
    document.getElementById('editContactName').value = '';
    document.getElementById('editContactEmail').value = '';
    document.getElementById('editContactPhone').value = '';
    document.getElementById('addEditContactButtons').innerHTML = addContactButtonsCancelAndCreateButtonsHTMLTemplate();
}

function addContactButtonsCancelAndCreateButtonsHTMLTemplate() {
    return /*html*/`
            <button class="cancelCreateContactButton" id="cancelCreateContactButton" onclick="hideAddContactCard()">
                <p>Cancel</p>
                <img src="./img/clearTaskX.svg">
            </button>
            <button class="createContactButton" id="createContactButton" onclick="createContact()">
                <p>Create contact</p>
                <img src="./img/createTaskCheckIcon.svg">
            </button>
            `;
}

function hideAddContactCard() {
    document.getElementById('addEditContactCard').classList.remove('showAddEditContactContainer');
    setTimeout(() => {
        document.getElementById('addEditContact').style.display = 'none';
    }, 125);
}

function createContact() {
    let dataSet = newContactDataSetForArray();
    if (dataSet.contactData.name && dataSet.contactData.email && dataSet.contactData.phone) {
        contacts.push(dataSet.newContact);
        initContacts();
        let contactIndex = getIndexByNameSurname(contacts, dataSet.formattedName.firstName, dataSet.formattedName.lastName);
        openContactInfo(contactIndex);
        showContactCreatedPopUp();
        clearAddContactForm();
        hideAddContactCard();
        scrollToAnchor(`contact(${toggleIndex})`);
    } else {
        alert("Bitte füllen Sie alle Felder aus.");
    }
}

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

function getContactData() {
    // Erfassen Sie die Werte aus den Eingabefeldern
    const name = document.getElementById("editContactName").value;
    const email = document.getElementById("editContactEmail").value;
    const phone = document.getElementById("editContactPhone").value;
    return {
        name,
        email,
        phone,
    };
}

function formatContactName(contactData) {
    // Extrahieren Sie den Vornamen und Nachnamen
    let [firstName, lastName] = contactData.name.split(" ");
    // Formatieren Sie den Vornamen und Nachnamen mit großem Anfangsbuchstaben
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    return {
        firstName,
        lastName,
    };
}

// Funktion zum Formatieren des ersten Buchstabens eines Strings in Großbuchstaben
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function createNewContactDataSet(contactData, formattedName) {
    const initials = formattedName.firstName.charAt(0).toUpperCase() + formattedName.lastName.charAt(0).toUpperCase();
    const category = formattedName.firstName.charAt(0).toUpperCase();
    // Wählen Sie eine zufällige Farbe aus dem avatarColors-Array aus
    let randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    // Erstellen Sie das Objekt für den neuen Kontakt
    return {
        name: formattedName.firstName,
        surname: formattedName.lastName,
        initials,
        email: contactData.email,
        phone: contactData.phone,
        category,
        avatarColor: randomColor,
    };
}

function getIndexByNameSurname(contacts, firstName, lastName) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === firstName && contacts[i].surname === lastName) {
            return i; // Index des gefundenen Eintrags
        }
    }
    return -1; // Falls kein Eintrag gefunden wurde
}

function showContactCreatedPopUp() {
    document.getElementById('contactCreatedButtonContainer').classList.add('showContactCreatedButtonContainer');
    setTimeout(() => {
        document.getElementById('contactCreatedButtonContainer').classList.remove('showContactCreatedButtonContainer');
    }, 800);
}

function clearAddContactForm() {
    document.getElementById("editContactName").value = "";
    document.getElementById("editContactEmail").value = "";
    document.getElementById("editContactPhone").value = "";
}

function scrollToAnchor(anchorId) {
    const anchorElement = document.getElementById(anchorId);

    if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
}

let clickedButtons = [];
let clickedButtonEmailColors = [];

function getScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function changeContactButtonColorAsClicked(index) {
    if (window.innerWidth >= 800) {
        unclickCreatedContact(toggleIndex);
        const buttonId = `contact(${index})`; // ID der angeklickten Button
        const buttonElement = document.getElementById(buttonId);
        toggleContactButtonColor(buttonId, buttonElement, index);
        changeContactButtonEmailColorToWhite(index);
    } else if (window.innerWidth < 800) {
        openContactInfo(index);
    }
}

function toggleContactButtonColor(buttonId, buttonElement, index) {
    // Prüfen, ob der Button bereits angeklickt wurde
    if (clickedButtons.includes(buttonId)) {
        resetContactButtonColor(buttonElement, buttonId);
        closeContactInfo();
    } else {
        setButtonColorAsClicked(buttonElement);
        openContactInfo(index);
        clickedButtons.push(buttonId);
        // Hintergrundfarbe des zuletzt angeklickten Buttons zurücksetzen
        resetLastClickedContactButtonColor();
    }
}

function resetContactButtonColor(buttonElement, buttonId) {
    buttonElement.classList.remove('contactClicked'); // Ursprüngliche Hintergrundfarbe
    clickedButtons = clickedButtons.filter(id => id !== buttonId);
}

function setButtonColorAsClicked(buttonElement) {
    // Button wurde noch nicht angeklickt, Hintergrundfarbe ändern und in Array speichern
    buttonElement.classList.add('contactClicked'); // Beispiel: Rote Hintergrundfarbe
}

function resetLastClickedContactButtonColor() {
    const lastClickedButtonId = clickedButtons[clickedButtons.length - 2]; // ID des zuletzt angeklickten Buttons
    if (lastClickedButtonId) {
        document.getElementById(lastClickedButtonId).classList.remove('contactClicked'); // Ursprüngliche Hintergrundfarbe
        clickedButtons = clickedButtons.filter(id => id !== lastClickedButtonId);
    }
}

function closeContactInfo(index) {
    document.getElementById('contactInfo').classList.remove('showContactDetailsContainer');
}

function changeContactButtonEmailColorToWhite(index) {
    if (window.innerWidth >= 800) {
        const emailId = `contactEmail(${index})`;
        const emailElement = document.getElementById(emailId);
        toggleContactButtonEmailColor(emailId, emailElement, index);
    }
}

function toggleContactButtonEmailColor(emailId, emailElement, index) {
    // Prüfen, ob der Button bereits angeklickt wurde
    if (clickedButtonEmailColors.includes(emailId)) {
        resetContactButtonEmailColor(emailElement, emailId);
    } else {
        // Button wurde noch nicht angeklickt, Hintergrundfarbe ändern und in Array speichern
        setEmailColorAsClicked(emailElement);
        clickedButtonEmailColors.push(emailId);
        resetLastClickedContactButtonEmailColor();
    }
}

function resetContactButtonEmailColor(emailElement, emailId) {
    emailElement.style.color = "rgba(69, 137, 255, 1)";
    clickedButtonEmailColors = clickedButtonEmailColors.filter(id => id !== emailId);
}

function setEmailColorAsClicked(emailElement) {
    emailElement.style.color = "white"; // Beispiel: Rote Hintergrundfarbe
}

function resetLastClickedContactButtonEmailColor() {
    const lastClickedEmailId = clickedButtonEmailColors[clickedButtonEmailColors.length - 2]; // ID des zuletzt angeklickten Buttons
    if (lastClickedEmailId) {
        document.getElementById(lastClickedEmailId).style.color = "rgba(69, 137, 255, 1)"; // Ursprüngliche Hintergrundfarbe
        clickedButtonEmailColors = clickedButtonEmailColors.filter(id => id !== lastClickedEmailId);
    }
}

let toggleIndex = 0;

function openContactInfo(index) {
    if (window.innerWidth >= 800) {
        highlightCreatedContact(index);
    }
    document.getElementById('contactInfo').classList.add('showContactDetailsContainer');
    openContactInfoHTMLTemplate(index);
}

function highlightCreatedContact(index) {
    document.getElementById(`contact(${index})`).classList.add('contactClicked');
    document.getElementById(`contactEmail(${index})`).style.color = "white";
    toggleIndex = index;
}

function openContactInfoHTMLTemplate(index) {
    let contact = contacts[index];
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

function unclickCreatedContact(toggleIndex) {
    document.getElementById(`contact(${toggleIndex})`).classList.remove('contactClicked');
    document.getElementById(`contactEmail(${toggleIndex})`).style.color = "rgba(69, 137, 255, 1)";
}

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




function showEditAndDeleteMenuOnMobile() {
    if (window.innerWidth < 800) {
        document.getElementById('editContactMenuContainer').style.display = 'none';
        hideContactEditDeleteMenu();
    }
}

function redesignAddContactCardToEditContactCard() {
    document.getElementById('addEditContact').classList.add('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Edit contact';
    document.getElementById('addContactSubheadline').style.display = 'none';
}

function showCurrentContactDetails(index) {
    document.getElementById('avatarIcon').style.backgroundColor = `${contacts[index]['avatarColor']}`;
    document.getElementById('avatarIcon').innerHTML = `${contacts[index]['initials']}`;
    var inputNameField = document.getElementById('editContactName');
    var nameToShow = `${contacts[index]['name']} ${contacts[index]['surname']}`;
    inputNameField.value = nameToShow;
    inputNameField.setSelectionRange(nameToShow.length, nameToShow.length);
    document.getElementById('editContactEmail').value = contacts[index]['email'];
    document.getElementById('editContactPhone').value = contacts[index]['phone'];
    setTimeout(function () {
        inputNameField.focus();
    }, 125);
}

function editContactDeleteAndSaveButtonLayoutHTMLTemplate(index){
    document.getElementById('addEditContactButtons').innerHTML = /*html*/`
                                                                            <button class="deleteEditContactButton" onclick="deleteContact(${index})">
                                                                                <p>Delete</p>
                                                                            </button>
                                                                            <button class="saveEditContactButton" onclick="updateContact(${index})">
                                                                                <p>Save</p>
                                                                                <img src="./img/createTaskCheckIcon.svg">
                                                                            </button>
                                                                        `;
}

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



















function deleteContact(index) {
    // Lösche den Kontakt aus dem Array
    contacts.splice(index, 1);

    hideAddContactCard();

    // Aktualisiere die Anzeige
    initContacts();
    // renderContacts(categorizedContacts);

    // Verstecke das Bearbeitungsmenü
    hideContactEditDeleteMenu();
    closeContactInfo();
}

function hideContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.remove('showEditContactMenu');
}



function updateContact(index) {
    // Erfassen Sie die aktualisierten Werte aus den Eingabefeldern
    let name = document.getElementById("editContactName").value;
    let email = document.getElementById("editContactEmail").value;
    let phone = document.getElementById("editContactPhone").value;

    // Überprüfen Sie, ob alle Felder ausgefüllt sind
    if (name && email && phone) {
        // Extrahieren Sie den Vornamen und Nachnamen
        let [firstName, lastName] = name.split(" ");

        // Formatieren Sie den Vornamen und Nachnamen mit großem Anfangsbuchstaben
        firstName = capitalizeFirstLetter(firstName);
        lastName = capitalizeFirstLetter(lastName);

        // Aktualisieren Sie den ausgewählten Kontakt im Array
        contacts[index].name = firstName;
        contacts[index].surname = lastName;
        contacts[index].initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
        contacts[index].email = email;
        contacts[index].phone = phone;
        contacts[index].category = firstName.charAt(0).toUpperCase();

        // openContactInfo(index);

        // Optional: Aktualisieren Sie die Kontaktliste auf der Seite
        initContacts();

        let contactIndex = getIndexByNameSurname(contacts, firstName, lastName);
        openContactInfo(contactIndex);

        // Optional: Leeren Sie die Eingabefelder
        document.getElementById("editContactName").value = "";
        document.getElementById("editContactEmail").value = "";
        document.getElementById("editContactPhone").value = "";

        hideAddContactCard();
    } else {
        // Geben Sie eine Fehlermeldung aus, wenn nicht alle Felder ausgefüllt sind
        alert("Bitte füllen Sie alle Felder aus.");
    }
}





