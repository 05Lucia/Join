function init() {
    //login page after start animation//
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
    includeHTML();
}

/**
 * this funktion ist to open a certain Template.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html"); // "includes/template.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * This funktion is to choes the right template for a certain button
 * 
 * @param {string} template - name of the template that should be used
 */
function Templates(template) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <div include-html="./Templates/${template}.html"> </div>
    `;
    includeHTML();
}

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
function succesfulSignup() {
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



