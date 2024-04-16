function errorMessageIfEmptyTitle() {
    let titleInput = document.getElementById('addTaskInputTitle');
    let errorMessage = document.querySelector('.errorMessageIfEmptyTitle');
    if (titleInput.value == "") {
        console.log('Fehler');
        errorMessage.style.visibility = 'visible';
    } else {
        errorMessage.style.visibility = 'hidden';
        return titleInput.value;
    }
}

function errorMessageIfEmptyDueDate() {
    let dueDateInput = document.getElementById('addTaskDueDateInput');
    let errorMessage = document.querySelector('.errorMessageIfEmptyDueDate');
    if (dueDateInput.value == "") {
        console.log('Fehler');
        errorMessage.style.visibility = 'visible';
    } else {
        errorMessage.style.visibility = 'hidden';
        return dueDateInput.value;
    }
}

function changePriorityColor(buttonId) {
    const button = document.getElementById(buttonId);
    const priority = button.getAttribute('data-priority');
    if (buttonId === 'urgentPriorityButton') {
        urgentPriorityButtonStylingWhenClicked(button);
    } else if (buttonId === 'mediumPriorityButton') {
        mediumPriorityButtonStylingWhenClicked(button);
    } else if (buttonId === 'lowPriorityButton') {
        lowPriorityButtonStylingWhenClicked(button);
    }
    console.log('Selected priority:', priority);
}

function urgentPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('urgentPriorityButton');
    button.classList.add('clickedUrgentButton');
    document.getElementById('urgentIcon').classList.add('clickedButtonIcon');
    document.getElementById('mediumPriorityButton').classList.remove('clickedMediumButton');
    document.getElementById('mediumPriorityButton').classList.add('mediumPriorityButton');
    document.getElementById('mediumIcon').classList.remove('clickedButtonIcon');
    document.getElementById('lowPriorityButton').classList.remove('clickedLowButton');
    document.getElementById('lowPriorityButton').classList.add('lowPriorityButton');
    document.getElementById('lowIcon').classList.remove('clickedButtonIcon');
}

function mediumPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('mediumPriorityButton');
    button.classList.add('clickedMediumButton');
    document.getElementById('mediumIcon').classList.add('clickedButtonIcon');
    document.getElementById('urgentPriorityButton').classList.remove('clickedUrgentButton');
    document.getElementById('urgentPriorityButton').classList.add('urgentPriorityButton');
    document.getElementById('urgentIcon').classList.remove('clickedButtonIcon');
    document.getElementById('lowPriorityButton').classList.remove('clickedLowButton');
    document.getElementById('lowPriorityButton').classList.add('lowPriorityButton');
    document.getElementById('lowIcon').classList.remove('clickedButtonIcon');
}

function lowPriorityButtonStylingWhenClicked(button) {
    button.classList.remove('lowPriorityButton');
    button.classList.add('clickedLowButton');
    document.getElementById('lowIcon').classList.add('clickedButtonIcon');
    document.getElementById('urgentPriorityButton').classList.remove('clickedUrgentButton');
    document.getElementById('urgentPriorityButton').classList.add('urgentPriorityButton');
    document.getElementById('urgentIcon').classList.remove('clickedButtonIcon');
    document.getElementById('mediumPriorityButton').classList.remove('clickedMediumButton');
    document.getElementById('mediumPriorityButton').classList.add('mediumPriorityButton');
    document.getElementById('mediumIcon').classList.remove('clickedButtonIcon');
}

let selectedAssignedContacts = []

function toggleAssignToDropdown() {
    console.log('Schritt1');
    var content = document.getElementById("dropdowncontacts");
    if (content.style.display == "none") {
        console.log('Schritt2');
        openAssignToDropdown();
    } else {
        console.log('Schritt3');
        closeAssignToDropdown();
    }
  }

function openAssignToDropdown() {
    document.getElementById('dropdowncontacts').style.display = 'flex';
    document.getElementById('dropdowncontacts').innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        document.getElementById('dropdowncontacts').innerHTML += /*html*/`
        <div class="dropdownEachContact" id="dropdownEachContact(${i})" style="background-color: white" onclick="assingContact(${i})">
            <div class="assignToContactAvatarAndName">
                <div class="assignToContactAvatar" style="background-color: ${contact['avatarColor']};">
                ${contact['initials']}
                </div>
                <div class="assignToContactName" id="assignToContactName(${i})">
                ${contact.name} ${contact.surname}
                </div>
            </div>
            <div class="assignToCheckBox">
                <img id="assignContactCheckBox(${i})" src="./img/assingContactCheckUnchecked.svg">
            </div>
        </div>
    `;
    }
}

function closeAssignToDropdown(){
    document.getElementById('dropdowncontacts').style.display = 'none';
}

function changeCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assignContactCheckChecked.svg";
    console.log('test1');
}

function changeBackCheckBoxStyle(i) {
    document.getElementById(`assignContactCheckBox(${i})`).src = "./img/assingContactCheckUnchecked.svg";
    console.log('test2');
}


function assingContact(i) {
    let contact = contacts[i]; // Den ausgewählten Kontakt erhalten
    let fullName = `${contact.name} ${contact.surname}`; // Den kompletten Namen des Kontakts erstellen
    let avatarColor = contact.avatarColor; // Die Avatarfarbe des Kontakts erhalten

    let contactIndex = selectedAssignedContacts.findIndex(item => item.name === fullName); // Überprüfen, ob der Kontakt bereits ausgewählt wurde

    if (contactIndex === -1) { // Wenn nicht ausgewählt wurde
        let selectedContact = { name: fullName, avatarColor: avatarColor }; // Ein Objekt mit Namen und Avatarfarbe erstellen
        selectedAssignedContacts.push(selectedContact); // Kontakt zum Array hinzufügen
        checkAssignContact(i); // Die Darstellung aktualisieren
    } else { // Wenn bereits ausgewählt wurde
        selectedAssignedContacts.splice(contactIndex, 1); // Kontakt aus dem Array entfernen
        uncheckAssignContact(i); // Die Darstellung aktualisieren
    }

    console.log(selectedAssignedContacts); // Zur Überprüfung in der Konsole ausgeben
}

function checkAssignContact(i){
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "rgba(69, 137, 255, 1)";
    document.getElementById(`assignToContactName(${i})`).style.color = "white";
    changeCheckBoxStyle(i);
    console.log('test3');
}

function uncheckAssignContact(i){
    document.getElementById(`dropdownEachContact(${i})`).style.backgroundColor = "white";
    document.getElementById(`assignToContactName(${i})`).style.color = "black";
    changeBackCheckBoxStyle(i);
    console.log('test4');
}

