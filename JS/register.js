let users = [
    {
        "name": "Caro Willers",
        "email": "caro@gmail.com",
        "password": "Pommes123"
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
    let iconId = fieldId === "password" ? "passwordIcon" : "confirmPasswordIcon";
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
function toggleCheckbox(buttonElement) {
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
    } catch(e) {
        console.error('Loading error:', e);
        return [];   
    }
}


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


async function checkIfEmailExists(email) {
    let users = await loadUsers();
    return users.some(user => user.email === email);
}

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = await loadUsers();
    let user = users.find(u => u.email === email);

    if (user) {
        if (user.password === password) {
            localStorage.setItem('currentUserName', user.name); // saves user name for personal greeting on Join board after login//
            localStorage.setItem('isLoggedIn', true); // mark user as logged in
            successfulSignup(); 
        } else {
            alert("Password is not correct. Please insert correct password.");
        }
    } else {
        alert("Invalid email or password");
    }
   
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        document.getElementById('msgBox').innerHTML = msg;
    }
});
 
function successfulSignup() {
   document.getElementById("signupModal").style.display = "block";   
}

function closeModal() {
    console.log("closeModal called");
    document.getElementById("signupModal").style.display = "none";
    window.location.href = '../index.html'; //redirect to Join board//
}

window.onclick = function(event) {
    console.log("window.onclick called, event.target:", event.target);
    let modal = document.getElementById("signupModal");
    if (event.target === modal) {
        closeModal();
    }
}

async function resetPassword() {
    let email = document.getElementById('resetEmail').value;
    let users = await loadUsers();
    let user = users.find(u => u.email === email);

    if (user) {
        let newPassword = prompt("Please enter your new password:");
        if (newPassword) {
            // Hier solltest du die Logik implementieren, um das Passwort im System zu aktualisieren
            alert("Your password has been successfully reset.");
        } else {
            alert("No password entered. Please try again.");
        }
    } else {
        alert("No account found with that email address.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('isLoggedIn')) { 
        window.location.href = '../login.html';
    } else { 
        greetUser();
    }
});

function greetUser() {
    let userName = localStorage.getItem('currentUserName');  
    let greetingElement = document.getElementById('greeting');
    let currentHour = new Date().getHours();
    let greetingText = "Welcome";  //standard//

    if (currentHour < 12) {
        greetingText = "Good morning";
    } else if (currentHour < 18) {
        greetingText = "Good afternoon";
    } else {
        greetingText = "Good evening";
    }

    greetingElement.textContent = `${greetingText} ${userName}`;  
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserName');
    window.location.href = '../login.html';
}
