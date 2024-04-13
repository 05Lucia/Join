/**
 * Checks the strength of the password entered by the user.
 * @returns {boolean} Returns true if the password meets the strength criteria, otherwise rturns false.
 */
function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let strengthIndicator = document.getElementById("passwordStrengthMessage");
    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

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

/**
 * Validates the signup form before submission.
 * Checks if all required fields are filled, if the privacy policy is accepted,
 * and if the password meets the strength criteria and matches the confirmed password.
 * Displays alert messages for any validation errors.
 * @returns {boolean} Returns true if the form validation is successful, otherwise returns false.
 */
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm_password").value.trim();
    
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return false;
    }
    
    if (!checkPrivacyPolicy()) {
        return;
    }
    
    if (!checkPasswordStrength() || !validateConfirmedPassword()) {
        return;
    }
    successfulSignup(); 
}

/**
 * Displays a modal to give notice for a successful signup.
 * Sets the display style of the signup modal to "block".
 */ 
function successfulSignup() {
    document.getElementById("signupModal").style.display = "block";   
}

/**
 * Closes the signup modal and redirects the user to the start page of the task management tool.
 * Sets the display style of the signup modal to "none" to hide it
 * and redirects the user to the index.html which is the main page.
 */
function closeModal() {
    document.getElementById("signupModal").style.display = "none";
    window.location.href = '../index.html';
}

/**
 * Closes the signup modal when the user clicks outside of it and redirects the user to the start page of the task management tool.
 * If the user clicks outside the signup modal, it sets the display style of the modal to "none" to hide it
 * and redirects the user to the index.html which is the main page.
 * @param {MouseEvent} event - The mouse event object representing the click event.
 */
window.onclick = function (event) {
    let modal = document.getElementById("signupModal");
    if (event.target == modal) {
        modal.style.display = "none";
        window.location.href = '../index.html';
    }
}



 