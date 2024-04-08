  
//validate password// 
function validateForm() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML = "Passwords do not match!";
        return false;
    } else {
        document.getElementById("message").innerHTML = "";
        console.log("Form submitted successfully.");
    }
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

