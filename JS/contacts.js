let contacts = [
    {
        "name": "Anton",
        "surname": "Mayer",
        "initials": "AM",
        "email": "anton@gmail.com",
        "phone": "+49 1111 111 11 1",
        "category": "A"
    },
    {
        "name": "Albert",
        "surname": "Gerdes",
        "initials": "AG",
        "email": "albert@gmail.com",
        "phone": "+49 2222 222 22 2",
        "category": "A"
    },
    {
        "name": "Aaron",
        "surname": "Brier",
        "initials": "AB",
        "email": "aaron@gmail.com",
        "phone": "+49 3333 333 33 3",
        "category": "A"
    },
    {
        "name": "Britta",
        "surname": "Zielke",
        "initials": "BZ",
        "email": "b.zielke@gmail.com",
        "phone": "+49 4444 444 44 4",
        "category": "B"
    },
    {
        "name": "Carsten",
        "surname": "Schmidt",
        "initials": "CS",
        "email": "carsten.schmidt@gmail.com",
        "phone": "+49 5555 555 55 5",
        "category": "C"
    },
    {
        "name": "Bernt",
        "surname": "Saathoff",
        "initials": "BS",
        "email": "bernt.s@gmail.com",
        "phone": "+49 6666 666 66 6",
        "category": "B"
    },
    {
        "name": "Caroline",
        "surname": "Tabeling",
        "initials": "CT",
        "email": "caroline@gmail.com",
        "phone": "+49 7777 777 77 7",
        "category": "C"
    }
]


function init(){
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
                        <div class="contactAvatar">
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
        
        // Erstellen Sie das Objekt für den neuen Kontakt
        let newContact = {
            "name": firstName,
            "surname": lastName,
            "initials": firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase(),
            "email": email,
            "phone": phone,
            "category": firstName.charAt(0).toUpperCase()
        };
        
        // Fügen Sie den neuen Kontakt zum Array hinzu
        contacts.push(newContact);

        let index = contacts.length - 1;
        openContactInfo(index);

        showContactCreatedPopUp();
        
        // Optional: Aktualisieren Sie die Kontaktliste auf der Seite
        init();
        
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


function showContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.add('showEditContactMenu');
    document.getElementById('editContactMenu').onclick = function (event) {
        event.stopPropagation();
    };

}

function hideContactEditDeleteMenu() {
    document.getElementById('editContactMenuContainer').classList.remove('showEditContactMenu');
}

function showEditContact() {
    document.getElementById('editContactMenuContainer').style.display = 'none';
    hideContactEditDeleteMenu();
    document.getElementById('addEditContact').classList.add('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Edit contact';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(255, 122, 0, 1)';
    document.getElementById('avatarIcon').innerHTML = 'AM';
    var inputNameField = document.getElementById('editContactName');
    var nameToShow = "Anton Mayer";
    inputNameField.value = 'Anton Mayer';
    inputNameField.setSelectionRange(nameToShow.length, nameToShow.length);
    document.getElementById('editContactEmail').value = 'anton@gmail.com';
    document.getElementById('editContactPhone').value = '+49 1111 11 111 1';
    document.getElementById('addEditContactButtons').innerHTML = /*html*/`
                                                                            <button class="deleteEditContactButton">
                                                                                <p>Delete</p>
                                                                            </button>
                                                                            <button class="saveEditContactButton">
                                                                                <p>Save</p>
                                                                                <img src="./img/createTaskCheckIcon.svg">
                                                                            </button>
                                                                        `;

    setTimeout(function () {
        inputNameField.focus();
    }, 125);
    document.getElementById('editContactMenuContainer').style.display = 'flex';
}

function openContactInfo(index) {
    document.getElementById('contactInfo').classList.add('d-flex');
    let contact = contacts[index];
    console.log("Detailansicht für Kontakt:", contact);
    document.getElementById('contactInfoContactDetails').innerHTML = /*html*/`
                    <div class="contactInfoAvatarAndName">
                        <div class="contactInfoAvatar">
                            ${contact['initials']}
                        </div>
                        <div class="contactInfoName">
                        ${contact['name']} ${contact['surname']}
                        </div>
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
}

function closeContactInfo() {
    document.getElementById('contactInfo').classList.remove('d-flex');
}

function showContactCreatedPopUp(){
    document.getElementById('contactCreatedButtonContainer').classList.add('showContactCreatedButtonContainer');
    setTimeout(() => {
        document.getElementById('contactCreatedButtonContainer').classList.remove('showContactCreatedButtonContainer');
    }, 800); 
}