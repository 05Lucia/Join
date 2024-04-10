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
        "initials": "AG",
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


function findIndexByNameSurname(contacts, firstName, lastName) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === firstName && contacts[i].surname === lastName) {
            return i; // Index des gefundenen Eintrags
        }
    }
    return -1; // Falls kein Eintrag gefunden wurde
}


function init() {
    // Sortieren der Kontakte nach Vornamen
    console.log('Kontakte vor Sortierung', contacts);
    sortByFirstName(contacts);

    // Erstellen der Kategorien
    let categorizedContacts = createCategories(contacts);
    console.log('categorized Contacts', categorizedContacts);

    // Anzeigen der Kontaktliste nach Kategorien
    renderContacts(categorizedContacts);

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

function renderContacts(categories) {
    setTimeout(() => {
        let contactListHTML = ''; // Variable zum Sammeln des HTML-Codes für die Kontaktliste
        let index = 0; // Initialisieren des Index für die Kontakte

        for (let initial in categories) {
            // Kategorie-Überschrift hinzufügen
            contactListHTML += `
                <div class="sectionByFirstLetter">
                    ${initial}
                </div>
                <div class="contactsSeparator">
                </div>
            `;

            // Kontakte für die aktuelle Kategorie hinzufügen
            categories[initial].forEach(contact => {
                contactListHTML += `
                    <div class="contact" onclick="openContactInfo(${index})"> <!-- Index übergeben -->
                        <div class="contactAvatar" style="background-color: ${contact.avatarColor};">
                            ${contact.initials}
                        </div>
                        <div class="contactNameAndEmail">
                            <div class="contactName">
                                ${contact.name} ${contact.surname}
                            </div>
                            <div class="contactEmail">
                                ${contact.email}
                            </div>
                        </div>
                    </div>
                `;
                index++; // Inkrementieren des Index für den nächsten Kontakt
            });
        }

        // Kontaktliste in das HTML einfügen
        document.getElementById("contactList").innerHTML = `
            <div class="contactBoxForEachLetter">
                ${contactListHTML}
            </div>
        `;
    }, 800); // setTimeout mit 800ms Verzögerung
}

function showAddContact() {
    document.getElementById('addEditContact').classList.add('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Add contact';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(209, 209, 209, 1)';
    document.getElementById('avatarIcon').innerHTML = '<img src="./img/addContactAvatar.svg">';
    document.getElementById('editContactName').value = '';
    document.getElementById('editContactEmail').value = '';
    document.getElementById('editContactPhone').value = '';
    document.getElementById('addEditContactButtons').innerHTML = /*html*/`
                        <button class="createContactButton" id="createContactButton" onclick="createContact()">
                            <p>Create contact</p>
                            <img src="./img/createTaskCheckIcon.svg">
                        </button>
`;
}

function hideAddContact() {
    document.getElementById('addEditContact').classList.remove('showAddEditContactContainer');
}

function createContact() {
    // Erfassen Sie die Werte aus den Eingabefeldern
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

        // Wählen Sie eine zufällige Farbe aus dem avatarColors-Array aus
        let randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

        // Erstellen Sie das Objekt für den neuen Kontakt
        let newContact = {
            "name": firstName,
            "surname": lastName,
            "initials": firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase(),
            "email": email,
            "phone": phone,
            "category": firstName.charAt(0).toUpperCase(),
            "avatarColor": randomColor // Fügen Sie die zufällige Farbe hinzu
        };

        // Fügen Sie den neuen Kontakt zum Array hinzu
        contacts.push(newContact);

        // let index = contacts.length - 1;
        // openContactInfo(index);

        // showContactCreatedPopUp();

        // Optional: Aktualisieren Sie die Kontaktliste auf der Seite
        init();

        let contactIndex = findIndexByNameSurname(contacts, firstName, lastName);
        openContactInfo(contactIndex);

        showContactCreatedPopUp();

        // Optional: Leeren Sie die Eingabefelder
        document.getElementById("editContactName").value = "";
        document.getElementById("editContactEmail").value = "";
        document.getElementById("editContactPhone").value = "";

        hideAddContact();

    } else {
        // Geben Sie eine Fehlermeldung aus, wenn nicht alle Felder ausgefüllt sind
        alert("Bitte füllen Sie alle Felder aus.");
    }
}

// Funktion zum Formatieren des ersten Buchstabens eines Strings in Großbuchstaben
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

function deleteContact(index) {
    // Lösche den Kontakt aus dem Array
    contacts.splice(index, 1);

    hideAddContact();

    // Aktualisiere die Anzeige
    init();
    // renderContacts(categorizedContacts);

    // Verstecke das Bearbeitungsmenü
    hideContactEditDeleteMenu();
    closeContactInfo();
}

function hideContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.remove('showEditContactMenu');
}

function showEditContact(index) {
    document.getElementById('editContactMenuContainer').style.display = 'none';
    hideContactEditDeleteMenu();
    document.getElementById('addEditContact').classList.add('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Edit contact';
    document.getElementById('avatarIcon').style.backgroundColor = `${contacts[index]['avatarColor']}`;
    document.getElementById('avatarIcon').innerHTML = `${contacts[index]['initials']}`;
    var inputNameField = document.getElementById('editContactName');
    var nameToShow = `${contacts[index]['name']} ${contacts[index]['surname']}`;
    inputNameField.value = nameToShow;
    inputNameField.setSelectionRange(nameToShow.length, nameToShow.length);
    document.getElementById('editContactEmail').value = contacts[index]['email'];
    document.getElementById('editContactPhone').value = contacts[index]['phone'];
    document.getElementById('addEditContactButtons').innerHTML = /*html*/`
                                                                            <button class="deleteEditContactButton" onclick="deleteContact(${index})">
                                                                                <p>Delete</p>
                                                                            </button>
                                                                            <button class="saveEditContactButton" onclick="updateContact(${index})">
                                                                                <p>Save</p>
                                                                                <img src="./img/createTaskCheckIcon.svg">
                                                                            </button>
                                                                        `;

    setTimeout(function () {
        inputNameField.focus();
    }, 125);
    document.getElementById('editContactMenuContainer').style.display = 'flex';
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
        init();

        let contactIndex = findIndexByNameSurname(contacts, firstName, lastName);
        openContactInfo(contactIndex);

        // Optional: Leeren Sie die Eingabefelder
        document.getElementById("editContactName").value = "";
        document.getElementById("editContactEmail").value = "";
        document.getElementById("editContactPhone").value = "";

        hideAddContact();
    } else {
        // Geben Sie eine Fehlermeldung aus, wenn nicht alle Felder ausgefüllt sind
        alert("Bitte füllen Sie alle Felder aus.");
    }
}

function openContactInfo(index) {
    document.getElementById('contactInfo').classList.add('showContactDetailsContainer');
    let contact = contacts[index];
    console.log("Detailansicht für Kontakt:", contact);
    document.getElementById('contactInfoContactDetails').innerHTML = /*html*/`
                    <div class="contactInfoAvatarAndName">
                        <div class="contactInfoAvatar" style="background-color: ${contact.avatarColor};">
                            ${contact['initials']}
                        </div>
                        <div class="contactInfoName">
                        ${contact['name']} ${contact['surname']}
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

function closeContactInfo() {
    document.getElementById('contactInfo').classList.remove('showContactDetailsContainer');
}

function showContactCreatedPopUp() {
    document.getElementById('contactCreatedButtonContainer').classList.add('showContactCreatedButtonContainer');
    setTimeout(() => {
        document.getElementById('contactCreatedButtonContainer').classList.remove('showContactCreatedButtonContainer');
    }, 800);
}