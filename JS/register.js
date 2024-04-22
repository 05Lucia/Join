let users = [
    {
        "name": "Caro Willers",
        "email": "caro@gmail.com",
        "password": "Pommes123",
        "rememberMe": false,
        "contacts": [
            {
                "name": "Leyla",
                "surname": "Blume",
                "initials": "LB",
                "avatarColor": "rgb(255,122,0)",
                "email": "leyla@gmail.com",
                "phone": "+49 9999 888 77 6",
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
                "name": "Sabine",
                "surname": "Becker",
                "initials": "SB",
                "avatarColor": "rgb(147,39,255)",
                "email": "sabine@gmail.com",
                "phone": "+49 5555 555 55 5",
                "category": "A"
            }
        ]
    },
    {
        "name": "Alice Buchholz",
        "email": "alice@gmail.com",
        "password": "Currywurst345",
        "rememberMe": false,
        "contacts": [
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
                "name": "Chantal",
                "surname": "Müller",
                "initials": "CM",
                "avatarColor": "rgb(255,70,70)",
                "email": "chantal@gmail.com",
                "phone": "+49 2233 444 55 6",
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
            }
        ]
    },
    {
        "name": "Vitali Rudi",
        "email": "vitali@gmail.com",
        "password": "Mayo6789",
        "rememberMe": false,
        "contacts": [
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
    },
    {
        "name": "Guest",
        "contacts": [
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
    }
];


/**
 * Checks the strength of the password entered by the user.
 * @returns {boolean} Returns true if the password meets the strength criteria, otherwise rturns false.
 */
function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let strengthIndicator = document.getElementById("passwordStrengthMessage");

    let pattern = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');

    if (!pattern.test(password)) {
        strengthIndicator.innerHTML = "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number";
        strengthIndicator.style.color = "red";
        return false;
    } else {
        strengthIndicator.innerHTML = "Your password strength is ok";
        strengthIndicator.style.color = "green";
        return true;
    }
}


/**
 * Validates the input to confirm the password entered by the user.
 * @returns {boolean} Returns true if the confirmed password matches the original password, otherwise returns false.
 */
function validateConfirmedPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let message = document.getElementById("passwordMatchMessage");

    if (password !== confirmPassword) {
        message.textContent = "Your passwords do not match";
        message.style.color = "red";
        return false;
    } else {
        message.textContent = "Your password is confirmed";
        message.style.color = "green";
        return true;
    }
}


/**
 * Toggles the visibility of the password input field and changes the visibility icon accordingly.
 * @param {string} fieldId - The ID of the password input field.
 */
function togglePassword(fieldId) {
    let input = document.getElementById(fieldId);
    let iconId = (fieldId === "password") ? "passwordIcon" : (fieldId === "newPassword") ? "newPasswordIcon" : "confirmPasswordIcon";
    let icon = document.getElementById(iconId);

    if (input.type === "password") {
        input.type = "text";
        icon.src = "./img/img/visibility_off.svg";
    } else {
        input.type = "password";
        icon.src = "./img/img/visibility.svg";
    }
}


/**
 * Changes the visibility icon of the password input field.
 * @param {HTMLElement} inputElement - The password input field element.
 */
function changeLockIcon(inputElement) {
    inputElement.nextElementSibling.src = "./img/img/visibility_off.svg";
}


/**
 * Toggles the checkbox that states if the Privacy Policy was accepted or not and updatates the checkbox image.
 * Toggles the state of a checkbox and updates the image icon to checked or not checked
 * This function is used on login and signup pages to handle user interaction with the checkboxes,
 * such as remembering passwords and accepting privacy policies. 
* @param {HTMLElement} buttonElement - On click of this button, the state of the checkbox will be toggled.
 */
function togglePrivacyPolicyCheckbox(buttonElement) {
    let container = buttonElement.closest('.checkboxContainer');
    let realCheckbox = container.querySelector(".realCheckbox");
    let checkboxImage = container.querySelector(".checkboxImage");

    realCheckbox.checked = !realCheckbox.checked;
    checkboxImage.src = realCheckbox.checked ? checkboxImage.getAttribute('data-checked') : checkboxImage.getAttribute('data-unchecked');
}


/**
 * Checks if the Privacy Policy checkbox is checked before final signup is possible
 * If the checkbox is not checked, displays an alert message prompting the user to accept the Privacy Policy.
 * @returns {boolean} Returns true if the Privacy Policy checkbox is checked, otherwise returns false.
 */
function checkPrivacyPolicy() {
    let realCheckbox = document.querySelector(".realCheckbox");
    if (!realCheckbox.checked) {
        alert("Please accept the Privacy Policy conditions");
        return false;
    }
    return true;
}


/**
 * Asynchronously loads user data from storage.
 * @returns {Promise<Array>} A promise that resolves to an array of users if found, otherwise returns an empty array.
 * @throws {Error} Throws an error if there is an issue loading the users.
 */
async function loadUsers() {
    try {
        let result = await getItem('users');
        if (result) {
            let users = JSON.parse(result);
            return users;
        } else {
            console.log("No users found in storage, returning empty array.");
            return [];
        }
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}


/**
 * Asynchronously adds a new user to the storage if the email does not already exist.
 * Ensures all fields are filled and the privacy policy is checked before proceeding.
 * Redirects to login page on successful registration or alerts the user on failure conditions.
 * @async
 * @returns {Promise<void>}
 */
async function addUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;

    if (email === "" || password === "" || name === "") {
        alert("Please fill in all fields");
        return;
    }

    if (!checkPrivacyPolicy()) {
        return;
    }

    if (await checkIfEmailExists(email)) {
        alert("This email is already registered.");
        return;
    }

    let users = await loadUsers();
    users.push({
        name: name,
        email: email,
        password: password
    });

    await setItem('users', JSON.stringify(users));
    console.log("Users saved to storage", users);
    window.location.href = '../login.html?msg=Your signup is successful';
}


/**
 * Checks if an email already exists in the user data.
 * @param {string} email - Email address to check against the existing users.
 * @returns {Promise<boolean>} A promise that resolves to true if the email exists, otherwise false.
 */
async function checkIfEmailExists(email) {
    let users = await loadUsers();
    return users.some(user => user.email === email);
}


/**
 * Processes the login by checking the provided credentials against stored users.
 * Sets local storage items if the credentials are valid, otherwise alerts the user.
 * @async
 * @returns {Promise<void>}
 */
async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rememberMe = document.getElementById('rememberMeCheckbox').checked;
    let rememberMe = document.getElementById('rememberCheckbox').checked;
    let users = await loadUsers();
    let user = users.find(u => u.email === email);

    if (user && user.password === password) {
        setUserLogin(user);
        await rememberPassword(email, user.password, rememberMe);
        successfulSignup();
    } else {
        alert("Invalid email or password");
    }
}


/**
 * Sets up the user session in localStorage with the user's information.
 * @param {Object} user - The user object with at least a 'name' property.
 */
function setUserLogin(user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserName', user.name);
    localStorage.setItem('userType', 'regular');
}



/**
 * Toggles the checkbox that states if the Privacy Policy was accepted or not and updatates the checkbox image.
 * Toggles the state of a checkbox and updates the image icon to checked or not checked
 * This function is used on login and signup pages to handle user interaction with the checkboxes,
 * such as remembering passwords and accepting privacy policies. 
* @param {HTMLElement} buttonElement - On click of this button, the state of the checkbox will be toggled.
 */
function toggleCheckbox(inputElement) {
    if (inputElement.type === 'checkbox') {
        let checkboxImage = inputElement.nextElementSibling.querySelector(".checkboxImage");
        checkboxImage.src = inputElement.checked ? checkboxImage.getAttribute('data-checked') : checkboxImage.getAttribute('data-unchecked');
    }
}
  

/**
 * Handles the change event for the "Remember Me" checkbox.
 * Fetches email from the DOM and toggles the remember password setting based on the checkbox state.
 */
function handleRememberMeChange() {
    let email = document.getElementById('email').value;
    let remember = document.getElementById('rememberMeCheckbox').checked;
    rememberPassword(email, remember);
}


/**
 * Updates the user's password in local storage if the "Remember Me" checkbox is checked.
 * @param {string} email - User's email address to identify the user.
 * @param {string} password - Password to be remembered.
 * @param {boolean} remember - Flag to determine whether to remember or forget the password.
 * @async
 * @returns {Promise<void>}
 */
async function rememberPassword(email, password, remember) {
    let users = await loadUsers();
    let user = users.find(u => u.email === email);
    if (user) {
        user.rememberMe = remember;
        if (remember) {
            user.password = password;
        }
        await setItem('users', JSON.stringify(users));
    }
}

/**
 * Toggles the visibility and state of a custom checkbox UI element.
 * @param {HTMLElement} label - The label element associated with the checkbox.
 */
function toggleRememberMeCheckbox(label) { 
    let checkbox = label.parentElement.querySelector('.realCheckbox');
    let checkboxImage = label.querySelector('.checkboxImage');
    checkbox.checked = !checkbox.checked;
    checkboxImage.src = checkbox.checked ? checkboxImage.getAttribute('data-checked') : checkboxImage.getAttribute('data-unchecked');
function toggleRememberMeCheckbox(inputElement) { 
    let checkboxImage = inputElement.parentElement.querySelector('.checkboxImage');
    checkboxImage.src = inputElement.checked ? checkboxImage.getAttribute('data-checked') : checkboxImage.getAttribute('data-unchecked');
}


/**
 * Automatically fills in the password field and checks the "Remember Me" checkbox if the user's email is found and remembered.
 * @async
 */
async function loadRememberedPassword() {
    if (localStorage.getItem('userType') === 'guest') {
        console.log('Gastbenutzer erkannt; Passwortwiederherstellung übersprungen.');
        return; 
    }
    let inputEmail = document.getElementById('email').value.trim();
    if (inputEmail.length === 0) return;

    let users = await loadUsers();
    let rememberedUser = users.find(u => u.rememberMe && u.email === inputEmail);
    if (rememberedUser) {
        document.getElementById('password').value = rememberedUser.password;
        document.getElementById('rememberMeCheckbox').checked = true;
        document.getElementById('rememberCheckbox').checked = true;
    } else {
        document.getElementById('password').value = '';
        document.getElementById('rememberMeCheckbox').checked = false;
        document.getElementById('rememberCheckbox').checked = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.getElementById('email');
    if (emailElement) {
        loadRememberedPassword();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        document.getElementById('msgBox').innerHTML = msg;
    }
});


/**
 * Displays the signup modal.
 */
function successfulSignup() {
    var signupModal = document.getElementById("signupModal");
    if (signupModal.style.display !== "block") {
        signupModal.style.display = "block";

        setTimeout(function() {
            if (signupModal.style.display === "block") {
                signupModal.style.display = "none";
                window.location.href = '../index.html';
            }
        }, 2000);
        
    }
}


/**
 * Displays the reset password popup.
 */
function resetPassword() {
    document.getElementById("resetPasswordPopup").style.display = "block";
}


/**
 * Changes the user's password after validating the new password field.
 * Alerts the user whether the change was successful or not.
 * @async
 * @returns {Promise<void>}
 */
async function changePassword() {
    let newPassword = document.getElementById('newPassword').value;
    if (!newPassword) {
        alert('Please enter a new password.');
        return;
    }

    let email = document.querySelector('.user-email').value;
    let users = await loadUsers();
    let user = users.find(user => user.email === email);
    if (!user) {
        alert('No user found with this email.');
        return;
    }

    user.password = newPassword;
    try {
        await setItem('users', JSON.stringify(users));
        alert('Your password has been successfully updated.');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Failed to update password.');
    }
}


/**
 * Closes the reset password popup and redirects to the login page.
 */
function closeReset() {
    document.getElementById("resetPasswordPopup").style.display = "none";
    window.location.href = '../login.html';
}


/**
 * /**
 * Sets up the session for a guest user and calls greetUser to display a welcome message.
 */
async function guestLogin() { 
    setGuestLogin();
    try {
        await saveGuestUser();  
        alert("Welcome, dear guest! Please be aware that your access is limited. To fully enjoy all the features of Join, consider registering using our sign-up form.");
        greetUser();
    } catch (error) {
        console.error("Fehler beim Speichern des Gastbenutzers:", error);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
        window.location.href = '../index.html';
    }
}


function setGuestLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserName', 'Gast');
    localStorage.setItem('userType', 'guest');
}


function attemptGuestLogin() {
    if (checkLoginStatus()) {
        alert(`Sie sind bereits als ${localStorage.getItem('currentUserName')} eingeloggt. Bitte loggen Sie sich aus, bevor Sie als Gast fortfahren.`);
        window.location.href = '../login.html';
    }
}


async function saveGuestUser() { 
    let users = await getItem('users');
    users = JSON.parse(users);
 
    let guestExists = users.some(user => user.name === "Guest");
 
    if (!guestExists) {
        let guestUser = {
            "name": "Guest",
            "contacts": [
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
        };
        users.push(guestUser);
    } 
    await setItem('users', JSON.stringify(users));
}


/**
 * Displays a greeting message based on the current time of day to the logged-in user.
 */
function greetUser() {
    let userName = localStorage.getItem('currentUserName');
    let greetingElement = document.getElementById('greeting');
    let currentHour = new Date().getHours();
    let greetingText = "Welcome";

    if (currentHour < 12) {
        greetingText = "Good morning";
    } else if (currentHour < 18) {
        greetingText = "Good afternoon";
    } else {
        greetingText = "Good evening";
    }

    if (greetingElement) {
        greetingElement.textContent = `${greetingText}, ${userName}.`;
    }
    UserInitals(userName);
}

//Fertig machen!!! 
function UserInitals(userName) {
    let userInitalsContainer = document.getElementById('user-initals');

    let names = userName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    userInitalsContainer.innerText = initials;
}


/**
 * Logs out the current user by clearing session-related data and redirecting to the login page.
 */
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('userType');
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
    localStorage.removeItem('rememberMe');

    alert('Your logout was successful');
    window.location.href = '../login.html';
}
