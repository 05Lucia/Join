//check password Strength//
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

//check confirmed password match//
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

//toggle password visibility//
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

function changeLockIcon(inputElement) {
    inputElement.nextElementSibling.src = "./img/img/visibility_off.svg";
} 




// check if Privacy Policy was accepted// 
function toggleCheckbox(buttonElement) {
    let container = buttonElement.closest('.checkboxContainer');
 
    let realCheckbox = container.querySelector(".realCheckbox");
    let checkboxImage = container.querySelector(".checkboxImage");
 
    realCheckbox.checked = !realCheckbox.checked; 
    checkboxImage.src = realCheckbox.checked ? checkboxImage.getAttribute('data-checked') : checkboxImage.getAttribute('data-unchecked');
}


function checkPrivacyPolicy() {  
    let realCheckbox = document.querySelector(".realCheckbox");
    if (!realCheckbox.checked) {
        alert("Please accept the Privacy Policy conditions");
        return false;
    }
    return true;
}

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


// message for successful signup//
function successfulSignup() {
    document.getElementById("signupModal").style.display = "block";   
}

function closeModal() {
    document.getElementById("signupModal").style.display = "none";
    window.location.href = '../Templates/summary.html';
}

// closes window on click//
window.onclick = function (event) {
    let modal = document.getElementById("signupModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



 