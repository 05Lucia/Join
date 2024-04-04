function addContact() {
    document.getElementById('addEditContact').classList.toggle('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Add contact';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(209, 209, 209, 1)';
    document.getElementById('avatarIcon').innerHTML = '<img src="./img/addContactAvatar.svg">';
    document.getElementById('editContactName').value = '';
    document.getElementById('editContactEmail').value = '';
    document.getElementById('editContactPhone').value = '';
}

function editContact() {
    document.getElementById('addEditContact').classList.toggle('showAddEditContactContainer');
    document.getElementById('addAndEditContactHeadline').innerHTML = 'Edit contact';
    document.getElementById('avatarIcon').style.backgroundColor = 'rgba(255, 122, 0, 1)';
    document.getElementById('avatarIcon').innerHTML = 'AM';
    var inputNameField =  document.getElementById('editContactName');
    var nameToShow = "Anton Mayer";
    inputNameField.value = 'Anton Mayer';
    inputNameField.focus();
    inputNameField.setSelectionRange(nameToShow.length, nameToShow.length);
    document.getElementById('editContactEmail').value = 'anton@gmail.com';
    document.getElementById('editContactPhone').value = '+49 1111 11 111 1';

}

function openContactInfo(){
    document.getElementById('contactInfo').classList.toggle('d-flex');
}