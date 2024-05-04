/**
 * Validates the user's email address.
 * @returns {boolean} Returns true if the email address is valid, otherwise false.
 */
function validateEmailAddress() {
    let emailInput = document.getElementById("email");
    let email = emailInput.value;
    let pattern = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}');
    let emailMessage = document.getElementById("msgBoxValidateEmail");  

    if (!pattern.test(email)) {
        emailMessage.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        emailMessage.style.color = "red";
        return false;
    } else {
        emailMessage.innerHTML = "E-Mail-Adresse ist gültig.";
        emailMessage.style.color = "green";
        return true;
    }
}


/**
 * Checks the strength of the password entered by the user.
 * @returns {boolean} Returns true if the password meets the strength criteria, otherwise rturns false.
 */
function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let strengthIndicator = document.getElementById("passwordStrengthMessage");

    let pattern = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');

    if (!pattern.test(password)) {
        strengthIndicator.innerHTML = "Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
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
        icon.src = "./img/visibility_off.svg";
    } else {
        input.type = "password";
        icon.src = "./img/visibility.svg";
    }
}


/**
 * Changes the visibility icon of the password input field.
 * @param {HTMLElement} inputElement - The password input field element.
 */
function changeLockIcon(inputElement) {
    inputElement.nextElementSibling.src = "./img/visibility_off.svg";
}


/**
 * Checks if the Privacy Policy checkbox is checked before final signup is possible.
 * If the checkbox is not checked, displays an alert message prompting the user to accept the Privacy Policy.
 * @returns {boolean} Returns true if the Privacy Policy checkbox is checked, otherwise false.
 */
function togglePrivacyPolicyCheckbox(buttonElement) {
    let container = buttonElement.closest('.checkboxContainerSignup');
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


function loadGuestUser() {
    let guestData = localStorage.getItem('guestUser');
    if (guestData) {
        return JSON.parse(guestData);
    } else {
        console.error('No guest user data found in local storage.');
        return null;
    }
}


/**
 * Adds a new user after form validation and redirects to login page on success.
 * @async
 * @returns {Promise<void>}
 */
async function addUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;

    if (!validateFormFields(email, password, name)) {
        return;
    }

    if (!checkPrivacyPolicy()) {
        return;
    }

    if (await checkIfEmailExists(email)) {
        alert("This email is already registered.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password,
        userContacts: contacts
    };

    await saveNewUser(user);
    successfulSignup(); 
}


/**
 * Displays the login modal.
 */
function successfulSignup() {
    let signupModal = document.getElementById("signupModal");
    if (signupModal.style.display !== "block") {
        signupModal.style.display = "block";

        setTimeout(function() {
            if (signupModal.style.display === "block") {
                signupModal.style.display = "none";
                window.location.href = '../login.html';
            }
        }, 2000);
    }
}


/**
 * Validates form fields and displays an alert if any field is empty.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @param {string} name - User's name.
 * @returns {boolean} - Returns true if all fields are filled, otherwise false.
 */
function validateFormFields(email, password, name) {
    if (email === "" || password === "" || name === "") {
        alert("Please fill in all fields");
        return false;
    }
    return true;
}


/**
 * Saves a new user to the storage.
 * @param {Object} user - The user object to be saved.
 * @async
 * @returns {Promise<void>}
 */
async function saveNewUser(user) {
    let users = await loadUsers();
    users.push(user);
    await setItem('users', JSON.stringify(users));
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
 * Attempts to log in the user by comparing the provided credentials with stored users.
 * Sets local storage items if the credentials are valid, otherwise displays an error message.
 * @async
 * @returns {Promise<void>}
 */
async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rememberMe = document.getElementById('rememberCheckbox').checked;
    let users = await loadUsers();
    let user = users.find(u => u.email === email);

    if (user && user.password === password) {
        setUserLogin(user);
        await rememberPassword(email, user.password, rememberMe);
        successfulLogin();
    } else {
        wrongPasswordMessage(); 
    }
}


/**
 * Displays an error message when the password is entered incorrectly.
 */
function wrongPasswordMessage() {
    let passwordField = document.getElementById('password');
    passwordField.classList.add('error');
    document.getElementById('passwordError').style.display = 'block';
}


/**
 * Clears the error state and message when the password field is focused.
 */
function clearPasswordError() {
    let passwordField = document.getElementById('password');
    passwordField.classList.remove('error');
    document.getElementById('passwordError').style.display = 'none';
    passwordField.value = '';  
}


/**
 * Displays the login modal.
 */
function successfulLogin() {
    let loginModal = document.getElementById("loginModal");
    if (loginModal.style.display !== "block") {
        loginModal.style.display = "block";

        setTimeout(function() {
            if (loginModal.style.display === "block") {
                loginModal.style.display = "none";
                window.location.href = '../index.html';
                greetUser();
            }
        }, 2000);
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
    let remember = document.getElementById('rememberCheckbox').checked;
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
        document.getElementById('rememberCheckbox').checked = true; 
    } else {
        document.getElementById('password').value = '';
        document.getElementById('rememberCheckbox').checked = false;
    }
}


/**
 * Loads remembered password if the email input field is present.
 * This function is triggered when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.getElementById('email');
    if (emailElement) {
        loadRememberedPassword();
    }
});


/**
 * Displays a message in the message box based on the URL parameters.
 * This function is triggered when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', function () { 
    let urlParams = new URLSearchParams(window.location.search);
    let msg = urlParams.get('msg');
    if (msg) {
        document.getElementById('msgBox').innerHTML = msg;
    }
});


/**
 * /**
 * Sets up the session for a guest user and calls greetUser to display a welcome message.
 */
async function guestLogin() { 
    setGuestLogin();
    try { 
        alert("Welcome, dear guest! Please be aware that your access is limited. To fully enjoy all the features of Join, consider registering using our sign-up form.");
        greetUser();
    } finally {
        window.location.href = '../index.html';
    }
}



/**
 * Sets up the session for a guest user by storing necessary data in local storage.
 */
function setGuestLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserName', 'Guest');
    localStorage.setItem('userType', 'guest');
}

 
/**
 * Displays a greeting message based on the current time of day to the logged-in user.
 */
function greetUser() {
    let userName = localStorage.getItem('currentUserName');
    let currentHour = new Date().getHours();
    let greetingText = "Welcome";

    if (currentHour < 12) {
        greetingText = "Good morning";
    } else if (currentHour < 18) {
        greetingText = "Good afternoon";
    } else {
        greetingText = "Good evening";
    }

    let greetingElement = document.getElementById('greeting');
    if (userName === 'Guest') {
        greetingElement.textContent = `${greetingText}`;
    } else if (userName !== 'Guest') {
        let greetingElementUser = document.getElementById('greeting-user');
        greetingElementUser.textContent = `${greetingText},`;
        greetingElement.textContent = `${userName}`;
        greetingElement.style.color = '#4589FF';
    }
    UserInitals(userName);
}


/**
 * Displays user initials based on the provided user name on the board
 */
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


/**
 * Retrieves the value of a specified URL parameter.
 * @param {string} param - The name of the URL parameter to retrieve.
 * @returns {string|null} The value of the URL parameter if found, otherwise null.
 * This function uses the URLSearchParams interface to handle query string parameters.
 * 'window.location.search' gives the query string part of the URL.
 */
function getQueryParam(param) {
    var search = window.location.search;
    var params = new URLSearchParams(search);
    return params.get(param);
}


/**
 * Redirects the user to a specified page while retaining the 'ref' URL parameter.
 * @param {string} page - The relative URL to which the user should be redirected.
 * This function is primarily used to navigate between related pages (like Privacy Policy and Legal Notice)
 * while keeping track of the user's original entry page (e.g., 'login' or 'signup').
 * It appends the 'ref' parameter to the URL to maintain the reference throughout the navigation.
 */
function navigateTo(page) {
    let referrer = getQueryParam('ref'); // 'login' or 'signup'
    window.location.href = page + '?ref=' + referrer;
}


/**
 * Redirects the user back to their original entry page.
 * This function determines whether the user originally came from the 'login' or 'signup' page
 * by checking the 'ref' URL parameter and redirects them back to that page.
 * It provides a convenient way for users to return to their previous context after visiting a linked page,
 * like a Privacy Policy or Legal Notice.
 */
function goBack() {
    let referrer = getQueryParam('ref'); // 'login' or 'signup'
    let page = referrer === 'signup' ? '../signup.html' : '../login.html';
    window.location.href = page;
}