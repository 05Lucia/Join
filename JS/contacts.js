let contacts = [
    {
        "name": "Anton",
        "surname": "Mayer",
        "initials": "AM",
        "email": "anton@gmail.com"
    },
    {
        "name": "Albert",
        "surname": "Gerdes",
        "initials": "AG",
        "email": "albert@gmail.com"
    },
    {
        "name": "Aaron",
        "surname": "Brier",
        "initials": "AB",
        "email": "aaron@gmail.com"
    },
    {
        "name": "Britta",
        "surname": "Zielke",
        "initials": "BZ",
        "email": "b.zielke@gmail.com"
    },
    {
        "name": "Bernt",
        "surname": "Saathoff",
        "initials": "BS",
        "email": "bernt.s@gmail.com"
    },
    {
        "name": "Carsten",
        "surname": "Schmidt",
        "initials": "CS",
        "email": "carsten.schmidt@gmail.com"
    },
    {
        "name": "Caroline",
        "surname": "Tabeling",
        "initials": "CT",
        "email": "caroline@gmail.com"
    }
]

const container = document.getElementById("contactList");

function sortName(a, b) {
    // Sortierung nach Name (absteigend)
    if (a.name < b.name) {
        return -1;
    } else if (a.name < b.name) {
        return 1;
    } else {
        return 0;
    }
}

function groupNamesToCategory(contacts) {
    let groupedContacts = {};

    for (let contact of contacts) {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (!groupedContacts[firstLetter]) {
            groupedContacts[firstLetter] = [];
        }

        groupedContacts[firstLetter].push(contact);
    }

    return groupedContacts;
}

function renderContacts(contacts) {
    setTimeout(() => {
        const contactList = document.getElementById("contactList");
        contactList.innerHTML = ""; // Leert den Container vor erneutem Anzeigen

        const groupedContacts = groupNamesToCategory(contacts);

        for (const category in groupedContacts) {
            const contactGroup = groupedContacts[category];

            contactGroup.sort(sortName);

            // contactList.innerHTML += /*html*/`
            // <div class="contactBoxForEachLetter">
            //     <div class="sectionByFirstLetter">
            //     </div>
            //     <div class="contactsSeparator">
            //     </div>
            //     <div class="contact" onclick="openContactInfo()">
            //     </div>
            // </div>
            
            // `;

            const categoryWrapper = document.createElement("div");
            categoryWrapper.classList.add("contactBoxForEachLetter");

            const sectionByFirstLetter = document.createElement("div");
            sectionByFirstLetter.classList.add("sectionByFirstLetter");
            sectionByFirstLetter.textContent = category;

            const contactsSeparator = document.createElement("div");
            contactsSeparator.classList.add("contactsSeparator");

            // Kategorie und Separator zuerst anfügen
            categoryWrapper.appendChild(sectionByFirstLetter);
            categoryWrapper.appendChild(contactsSeparator);

            // Kontakte danach anfügen
            contactGroup.forEach(contact => {
                const contactElement = document.createElement("div");
                contactElement.classList.add("contact");

                const contactAvatar = document.createElement("div");
                contactAvatar.classList.add("contactAvatar");
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                contactAvatar.style.backgroundColor = randomColor;
                contactAvatar.textContent = contact.initials; // Initialen aus dem Array verwenden


                const contactNameAndEmail = document.createElement("div");
                contactNameAndEmail.classList.add("contactNameAndEmail");

                const contactName = document.createElement("div");
                contactName.classList.add("contactName");
                contactName.textContent = `${contact.name} ${contact.surname}`; // Name und Nachname zusammenfügen

                const contactEmail = document.createElement("div");
                contactEmail.classList.add("contactEmail");
                contactEmail.textContent = contact.email; // E-Mail-Adresse aus dem Array verwenden

                contactNameAndEmail.appendChild(contactName);
                contactNameAndEmail.appendChild(contactEmail);

                contactElement.appendChild(contactAvatar);
                contactElement.appendChild(contactNameAndEmail);

                categoryWrapper.appendChild(contactElement);
            });

            contactList.appendChild(categoryWrapper);
        }
    }, 800);
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

function openContactInfo() {
    document.getElementById('contactInfo').classList.toggle('d-flex');
}