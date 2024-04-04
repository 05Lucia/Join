
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

function Templates(template) {
    const content = document.getElementById('content');
    content.innerHTML= '';
    content.innerHTML = `
    <div include-html="./Templates/${template}.html"> </div>
    `;
     includeHTML();
}