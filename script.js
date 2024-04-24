async function init() {
    //login page after start animation//
    if (!localStorage.getItem('isLoggedIn')) {
        startAnimation();
        // window.location.href = "login.html";
        // return;
    }
    await loadUsers();
    await mobileGreeting();
    await summaryLoad();
    greetUser();
}

function startAnimation() {
    setTimeout(() => {
        // JS Template 
        window.location.href = 'login.html';
    }, 1200);
}


async function mobileGreeting() {
    if (window.innerWidth < 800) {
      await TemplateGreetMobile(); // Assuming this displays a greeting for mobile
      setTimeout(() => {
        greetUserMobile();
      }, 1200);
    }
  }

/**
 * Displays a greeting message based on the current time of day to the logged-in user.
 */
function greetUserMobile() {
    let userName = localStorage.getItem('currentUserName');
    let greetingElement = document.getElementById('greeting-containe');
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
}

// naviagtion ---------------------------------------------------------------------------------------------------

/**
 * Fetches and includes the content of external HTML templates marked with the 'include-html' attribute.
 *
 * @async
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
    if (document.getElementById('greeting')) {
        // greetUser();
    }
}

/**
 * Loads the specified template file and includes its content in the designated container.
 *
 * @param {string} template - The name of the template file to load (without the extension).
 * @async
 */
async function Templates(template) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <div include-html="./Templates/${template}.html"> </div>
    `;
    await includeHTML();
}

/**
 * Opens the navigation overlay dropdown menu.
 *
 * This function removes the 'd-none' class from the container element, likely making it visible.
 */
function openDropdown() {
    let container = document.getElementById('navigation-overlay');
    container.classList.remove('d-none');
}

/**
 * Closes the navigation overlay dropdown menu.
 *
 * This function adds the 'd-none' class to the container element, likely hiding it.
 */
function closeDropdown() {
    let container = document.getElementById('navigation-overlay');
    container.classList.add('d-none');
}

/**
 * Loads the help template and closes the navigation overlay dropdown menu.
 */
function dropdownHelp() {
    Templates('help');
    closeDropdown();
}

/**
 * Sets up event listeners for navigation functionality after the DOM content is loaded.
 *
 * This code snippet waits for the DOM content to be fully loaded using the `DOMContentLoaded` event.
 * Once loaded, it calls the following functions to establish the navigation behavior:
 *  - `navigationClick`: Attaches click event listeners to all main navigation items.
 *  - `clickedLegalPart`: Attaches click event listeners to legal section navigation elements within the ".navigation-legal" container.
 *  - `removeNavigationClick`: Attempts to remove click event listeners from all main navigation items (might not always be successful).
 *  - `removeClickedLegalPart`: Attaches click listeners to main navigation items to remove the "navigation-legal-clicked" class from any legal section element when clicked.
 */
document.addEventListener('DOMContentLoaded', () => {
    navigationClick(); // Call your function to set up event listeners
    clickedLegalPart();
    removeNavigationClick();
    removeClickedLegalPart();
    removeNavHighlightOnDropdown();
    removeNavHighlightLegalPartOnDropdown();
    removeNavHighlightOnHelp();
    removeNavHighlightLegalPartOnHelp();
    removeNavHighlightOnLogo();
});

/**
 * Attaches click event listeners to all navigation items (.navigation-item class).
 *
 * When a navigation item is clicked:
 *  - The previously clicked item (if any) loses the "navigation-item-clicked" class.
 *  - The clicked item gains the "navigation-item-clicked" class for visual selection.
 *  - All navigation items are reset (hidden clicked images, shown unclicked images).
 *  - The `navigationClickImg` function is called to potentially change the clicked item's image (if screen is below 800px).
 */
function navigationClick() {
    const btnElList = document.querySelectorAll('.navigation-item');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            btnEl.classList.add('navigation-item-clicked');
            resetNavigationItems();
            navigationClickImg();
            removeClickedLegalPart();
        })
    })
}

/**
 * Resets all navigation items to their initial state.
 *
 * This function loops through all elements with the class ".navigation-item".
 * Within each item, it:
 *  - Hides any previously shown "clicked" image (adds the "d-none" class).
 *  - Shows any previously hidden "unclicked" image (removes the "d-none" class).
 */
function resetNavigationItems() {
    document.querySelectorAll('.navigation-item').forEach(item => {
        item.querySelector('.clicked')?.classList.add('d-none');
        item.querySelector('.unclicked')?.classList.remove('d-none');
    });
}

/**
* Handles potential image change for the currently clicked navigation item (if screen is below 800px).
*
* This function retrieves the element with the class "navigation-item-clicked" (the clicked item).
* If the clicked item exists and the screen width is less than 800px:
*  - It finds the "unclicked" and "clicked.d-none" images within the clicked item.
*  - It hides the "unclicked" image using `classList.add('d-none')`.
*  - It shows the "clicked" image using `classList.remove('d-none')`.
*/
function navigationClickImg() {
    const clickedItem = document.querySelector('.navigation-item-clicked');

    // Then handle image change for the clicked item (if screen is below 800px)
    if (window.innerWidth < 800) {
        const unclickedImage = clickedItem.querySelector('.unclicked');
        const clickedImage = clickedItem.querySelector('.clicked.d-none');

        if (unclickedImage && clickedImage) {
            unclickedImage.classList.add('d-none'); // Hide unclicked image
            clickedImage.classList.remove('d-none'); // Show clicked image
        }
    }
}

/**
 * Attaches click event listeners to all legal section navigation elements within the ".navigation-legal" container.
 *
 * When a legal section navigation element is clicked:
 *  - The previously clicked legal section element (if any) loses the "navigation-legal-clicked" class.
 *  - The clicked element gains the "navigation-legal-clicked" class for visual selection.
 *  - **Additionally:** The function calls `removeNavigationClick` to potentially remove click listeners from the main navigation items.
 *  (This behavior might need adjustment depending on your specific requirements.)
 */
function clickedLegalPart() {
    const btnElList = document.querySelectorAll('.navigation-legal div');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            btnEl.classList.add('navigation-legal-clicked');
            removeNavigationClick();
        })
    })
}

/**
 * Attempts to remove click event listeners from all navigation items (.navigation-item class).
 *
 * This function loops through all elements with the class ".navigation-item". It attempts to remove any existing click event listeners from these elements.
 *  - Note that this function might not always successfully remove listeners depending on how they were previously attached.
 */
function removeNavigationClick() {
    const btnElList = document.querySelectorAll('.navigation-legal div');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
        })
    })
}

/**
 * Attaches click event listeners to all navigation items (.navigation-item class).
 *
 * When a navigation item is clicked, this function removes the "navigation-legal-clicked" class from any legal section element that might have it.
 *  - This ensures clicking a main navigation item clears the "clicked" state for legal section elements.
 */
function removeClickedLegalPart() {
    const btnElList = document.querySelectorAll('.navigation-item');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
        })
    })
}

/**
 * Removes highlight from the navigation summary section.
 *
 * This function removes the "navigation-item-clicked" class from the element with ID "navSummary", likely deselecting it visually.
 */
function changeNavigationPrivacyPolicy() {
    let summary = document.getElementById('navSummary');

    summary.classList.remove('navigation-item-clicked');

}

/**
 * Removes highlight from any clicked navigation item on dropdown click.
 *
 * This function attaches click event listeners to all anchor tags within elements with the class "dropdowen-container".
 * When a dropdown anchor is clicked, it removes the "navigation-item-clicked" class from any currently highlighted navigation item (if any).
 */
function removeNavHighlightOnDropdown() {
    const btnElList = document.querySelectorAll('.dropdowen-container a');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            resetNavigationItems();
        })
    })
}

/**
 * Removes highlight from any clicked legal section element on dropdown click.
 *
 * This function is similar to `removeNavHighlightOnDropdown` but targets elements with the "navigation-legal-clicked" class.
 * When a dropdown anchor is clicked, it removes the "navigation-legal-clicked" class from any currently highlighted legal section element (if any).
 */
function removeNavHighlightLegalPartOnDropdown() {
    const btnElList = document.querySelectorAll('.dropdowen-container a');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            resetNavigationItems();
        })
    })
}

function removeNavHighlightLegalPartOnHelp() {
    const btnElList = document.querySelectorAll('.help');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            resetNavigationItems();
        })
    })
}

function removeNavHighlightOnHelp() {
    const btnElList = document.querySelectorAll('.help');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            resetNavigationItems();
        })
    })
}

function removeNavHighlightOnLogo() {
    const btnElList = document.querySelectorAll('.navLogo');
    const buttonElList = document.querySelectorAll('.navLogo');

    btnElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-item-clicked')?.classList.remove('navigation-item-clicked');
            resetNavigationItems();
        })
    })

    buttonElList.forEach(btnEl => {
        btnEl.addEventListener('click', () => {
            document.querySelector('.navigation-legal-clicked')?.classList.remove('navigation-legal-clicked');
            resetNavigationItems();
        })
    })
}
// leagalnotes / privacy Policy Navigation---------------------------------------------------------------
/**
 * Loads legal notice template and highlights the legal notice section.
 *
 * This function uses `async` to load the legal notice template via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Closes the dropdown (implementation in `closeDropdown` not provided).
 *  - Highlights the legal notice section with `legalNoticeHiglite`.
 */
async function dropdownLegalNotice() {
    await Templates('legal_notice');
    await closeDropdown();
    legalNoticeHiglite();
}

/**
 * Highlights the legal notice navigation element.
 *
 * This function adds the "navigation-legal-clicked" class to the element with ID "navLegalNotice", visually marking it as selected.
 */
function legalNoticeHiglite() {
    let legalNotice = document.getElementById('navLegalNotice');
    legalNotice.classList.add('navigation-legal-clicked');
}

/**
 * Loads privacy policy template and highlights the privacy policy section.
 *
 * This function uses `async` to load the privacy policy template via `Templates` (not provided).
 * After successful loading (assumed), it:
 *  - Closes the dropdown (implementation in `closeDropdown` not provided).
 *  - Highlights the privacy policy section with `privacyPolicyHighlight`.
 * Loads the legal notice template and closes the navigation overlay dropdown menu.
 */
async function dropdownPrivacyPolicy() {
    await Templates('privacy_policy');
    await closeDropdown();
    privacyPolicyHighlight();
}

/**
 * Highlights the privacy policy navigation element.
 *
 * This function adds the "navigation-legal-clicked" class to the element with ID "navPrivacyPolicy", visually marking it as selected.
 * Loads the privacy policy template and closes the navigation overlay dropdown menu.
 */
function privacyPolicyHighlight() {
    let privacyPolicy = document.getElementById('navPrivacyPolicy');
    privacyPolicy.classList.add('navigation-legal-clicked');
}

