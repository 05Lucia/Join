/**
 * Generates the HTML structure for a single card on the board.
 * @param {object} card The card object containing details to populate the template.
 * @returns {string} The HTML string representing a card on the board.
 */
function cardTemplate(card) {

    return `
    <div draggable="true" onclick="bigCard(${card.id})" ondragstart="startDragging(${card.id})" class="board-card-small" >
        <div style="background-color:${card.category.color};" class="category-card">${card.category.name}</div>
        <div class="card-text">
            <h3 class="card-title">${card.title}</h3>
            <p class="card-description">${card.description}</p>
            <!-- dont show more than 2 lines? JS? -->
        </div>
        ${TemplateSubtaskProgressbar(card)}
        <div class="icons-area">
            <div class="initial-card-container" id="assigned-container${card.id}">
                <div class="user-initals-card">TD</div>
                <div class="user-initals-card overlap">G</div>
                <div class="user-initals-card overlap">AB</div>
            </div>
            <img src="${card.priority.img}" alt="">
        </div>
    </div>
    `;
}

/**
 * check if ther are subtask to put on the card for the todo card.
 * 
 * @param {*} card the arry of the card for the needet task
 * @returns the Subtask section on the bord task card.
 */
function TemplateSubtaskProgressbar(card) {
    if (card.subtasks.length > 0) {
        let completeSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);

        return `
        <div class="progressbar-area">
            <div class="progressbar">
                <div class="progress-color" style="width:${progressbarCompetedRate(card)}%;"></div>
            </div>
            <p>${completeSubtask}/${card.subtasks.length} Subtasks</p>
        </div>
        `;
    } else {
        return '';
    }
}

/**
 * Generates the HTML structure for the big card modal content based on a card object.
 * @param {object} card The card object containing details to populate the template.
 * @returns {string} The HTML string representing the big card modal content.
 */
function TaskCadBigTemplate(card, id) {
    return `
        <div class="board-card-big-top">
            <div style="background-color:${card.category.color};" class="category-card-big">${card.category.name} </div>
            <div class="board-card-close-container" onclick="closeCard()">
                <img class="board-card-close" src="./img/Close.svg" alt="close">
                <img class="board-card-close-hover" src="./img/close hover.svg" alt="close hover">
            </div>
        </div>
        <h1>${card.title} </h1>
        <p class="board-card-big-description">${card.description} </p>
        <div class="board-card-big-info">
            <h2>Due date:</h2>
            <p id="due-date"> </p>
        </div>
        <div class="board-card-big-info">
            <h2>Priority: </h2>
            <div class="board-card-big-priority">
                <p> ${card.priority.urgency} </p>
                <img src="${card.priority.img} " alt="Priority">
            </div>
        </div>
        <div class="task-assigend-container" id="assigned-container">
        </div>
        <div class="board-card-big-subtasks-arear" id="board-card-big-subtasks-arear">
            <h2>Subtasks</h2> 
            <div class="board-task-subtasks-container" id="board-task-subtasks-container"></div> 
        </div>
        <div class="board-card-big-bottom" >
            <div class="board-card-icons" onclick="deleteTask(${id})">
                <img class="board-card-big-bottom-icon" src="./img/delete.svg" alt="Delete">
                <img class="board-card-big-bottom-icon-hover" src="./img/delete hover.svg" alt="delete hover">
                Delete
            </div>
            <div class="board-card-big-bottom-seperation"></div>
            <div class="board-card-icons" onclick="editTask(${id})">
                <img class="board-card-big-bottom-icon" src="./img/edit.svg" alt="Edit">
                <img class="board-card-big-bottom-icon-hover" src="./img/edit hover.svg" alt="edit hover">
                Edit
            </div>
        </div>
`;
}

/**
 * Generates the HTML template for a single assigned user within the big card view.
 *
 * @param {object} user - A user object containing a `name` property (string) and a `color` property (string).
 * @param {string} initials - The user's initials (uppercase) generated from their name.
 * @returns {string} The HTML template string representing a single assigned user.
 */
function bigCardAssignedTemplate(user, initials) {
    return `
    <div class="board-card-big-assingend-user">
        <div style="background-color:${user.avatarColor};" class="user-initals-card-big-card">${initials}</div>
        <p>${user.name}</p>
    </div>
    `;
}

/**
 * Generates the HTML template for a single subtask within the big card modal.
 *
 * @param {string} taskText - The text content of the subtask.
 * @param {string} img - The path to the image representing the subtask state.
 * @param {boolean} done - Indicates whether the subtask is marked as completed.
 * @param {number} i - The index of the subtask within the card's subtasks array.
 * @param {number} id - The ID of the card containing the subtask.
 * @returns {string} The HTML string representing the subtask template.
 */
function bigCardSubtaskTemplate(taskText, img, done, i, id) {
    return `
        <div class="board-task-subtask">
                <p><img id="subtask${i}" onclick="SubtaskStatus(${done},${i},${id})" src="${img}">${taskText}</p>
        </div>
    `;
}

/**
 * Generates the HTML template for the "Add Task" popup window.
 *
 * @returns {string} The HTML string representing the popup window structure.
 */
function boardPopupAddTaskWindow() {
    return `
    <div class="borad-card-popup-addTask" id="borad-card-popup-addTask" onclick="doNotClose(event)">
       <div class="board-addTask-popup-top">
            <div class="add-task-titel-popup">
                <h1>Add Task</h1>
            </div>
            <div class="board-popup-close-area">
                <div class="board-card-close-container" onclick="closeCard()">
                    <img class="board-card-close" src="./img/Close.svg" alt="close">
                    <img class="board-card-close-hover" src="./img/close hover.svg" alt="close hover">
                </div>
            </div>            
        </div>
        <div class="addTask-popup-container" id="addTask-popup-container">
        </div>
    </div> 
    `;
}

/**
 * Generates the HTML structure for a large board card popup.
 *
 * @returns {string} The HTML string representing the board card popup structure.
 */
function EditTemplate() {
    return `
    <div class="board-card-big-top-popup">
        <div class="board-card-close-container" onclick="closeCard()">
            <img class="board-card-close" src="./img/Close.svg" alt="close">
            <img class="board-card-close-hover" src="./img/close hover.svg" alt="close hover">
        </div>
    </div>
    <div class="fullHeight" include-AddTask="./Templates/add_task-popup.html"> </div>
    `
}

/**
 * Updates the content of the "createTaskContainerPopup" element with an "Ok" button 
 * for completing task editing.
 *
 * @param {string} id - The ID of the task being edited (likely used for internal logic).
 */
function templateOkBtn(id) {
    const editTaskBntContainer = document.getElementById('createTaskContainerPopup');
    editTaskBntContainer.innerHTML = `
    <button id="finish-btn" class="createTaskButton" onclick="editTaskDone(${id})">
        <p>Ok</p>
        <img src="./img/createTaskCheckIcon.svg">
    </button>
    `
}

/**
 * Generates the HTML structure for a mobile greeting element.
 *
 * Inserts the greeting content into the element with ID "content".
 */
function TemplateGreetMobile() {
    document.getElementById('content').innerHTML = `
    <div class="greeting-container">
        <p id="greeting-mobile-user"></p><br>
        <h1 class="greeting-mobile" id="greeting-mobile"></h1>
    </div>
    `;
}

function restoreDefault() {
    setItem("cards", backupCards)
}

const backupCards = [
    {
        "id": 0,
        "place": "todo",
        "category": {
            "name": "Technical Task",
            "color": "rgb(0,56,255)"
        },
        "title": "Implement Drag and Drop",
        "description": "Allow users to drag and drop cards between columns (Todo, In Progress, Done) to update their status.",
        "dueDate": "2024-04-30",
        "subtasks": [
            {
                "text": "Design interaction for dragging cards",
                "done": false
            },
            {
                "text": "Implement logic for updating card positions",
                "done": false
            },
            {
                "text": "Handle visual feedback during drag and drop",
                "done": false
            }
        ],
        "assigned": [
            {
                "name": "Anton",
                "surname": "Mayer",
                "initials": "AM",
                "avatarColor": "rgb(255,122,0)"
            }
        ],
        "priority": {
            "urgency": "Low",
            "img": "./img/priorityLowInactive.svg"
        }
    },
    {
        "id": 1,
        "place": "todo",
        "category": {
            "name": "User Story",
            "color": "rgb(255,122,0)"
        },
        "title": "Design Card Component",
        "description": "Create a reusable card component that displays task information (title, description, due date, etc.)",
        "dueDate": "2024-04-28",
        "subtasks": [
            {
                "text": "Define card layout and styles",
                "done": false
            },
            {
                "text": "Implement visual elements for card properties (title, assignee)",
                "done": false
            },
            {
                "text": "Ensure responsiveness for different screen sizes",
                "done": false
            }
        ],
        "assigned": [
            {
                "name": "Caroline",
                "surname": "Tabeling",
                "initials": "CT",
                "avatarColor": "rgb(31,215,193)"
            },
            {
                "name": "Anton",
                "surname": "Mayer",
                "initials": "AM",
                "avatarColor": "rgb(255,122,0)"
            }
        ],
        "priority": {
            "urgency": "Urgent",
            "img": "./img/priorityHighInactive.svg"
        }
    },
    {
        "id": 2,
        "place": "progress",
        "category": {
            "name": "Technical Task",
            "color": "rgb(0,56, 255)"
        },
        "title": "Display Card Metadata",
        "description": "Fetch and display additional card information like assigned users and due dates.",
        "dueDate": "2024-04-26",
        "subtasks": [
            {
                "text": "Define API endpoint for card data",
                "done": true
            },
            {
                "text": "Implement logic to retrieve card data",
                "done": true
            },
            {
                "text": "Update card UI to display retrieved data",
                "done": false
            }
        ],
        "assigned": [
            {
                "name": "Bernt",
                "surname": "Saathoff",
                "initials": "BS",
                "avatarColor": "rgb(255,187,43)"
            }
        ],
        "priority": {
            "urgency": "Medium",
            "img": "./img/priorityMediumInactive.svg"
        }
    },
    {
        "id": 3,
        "place": "feedback",
        "category": {
            "name": "Technical Task",
            "color": "rgb(0,56,255)"
        },
        "title": "Refine User Authentication",
        "description": "Review and improve the implemented user authentication system. Consider adding features like password hashing, secure session management, and role-based access control (RBAC) if necessary.",
        "dueDate": "2024-05-07",
        "subtasks": [
            {
                "text": "Evaluate the security strength of current implementation",
                "done": true
            },
            {
                "text": "Implement additional security measures (password hashing, session management)",
                "done": true
            },
            {
                "text": "Consider adding RBAC for differentiated user permissions (optional)",
                "done": true
            }
        ],
        "assigned": [
            {
                "name": "Diana",
                "surname": "König",
                "initials": "DK",
                "avatarColor": "rgb(255,70,70)"
            },
            {
                "name": "Erik",
                "surname": "Wagner",
                "initials": "EW",
                "avatarColor": "rgb(255,0,191)"
            }
        ],
        "priority": {
            "urgency": "Medium",
            "img": "./img/priorityMediumInactive.svg"
        }
    },
    {
        "id": 4,
        "place": "progress",
        "category": {
            "name": "Technical Task",
            "color": "rgb(0,56,255)"
        },
        "title": "Implement Data Persistence",
        "description": "Store card data (title, description, due date, assigned users, etc.) in a persistent storage mechanism like a database or local storage. Ensure data integrity and retrieval.",
        "dueDate": "2024-05-03",
        "subtasks": [
            {
                "text": "Choose a suitable data storage solution",
                "done": false
            },
            {
                "text": "Design data schema to represent card information",
                "done": false
            },
            {
                "text": "Implement logic to save and load card data from storage",
                "done": false
            }
        ],
        "assigned": [
            {
                "name": "Erik",
                "surname": "Wagner",
                "initials": "EW",
                "avatarColor": "rgb(255,0,191)"
            }
        ],
        "priority": {
            "urgency": "Urgent",
            "img": "./img/priorityHighInactive.svg"
        }
    },
    {
        "id": 5,
        "place": "feedback",
        "category": {
            "name": "User Story",
            "color": "rgb(255,122,0)"
        },
        "title": "Implement User Interface",
        "description": "Design the overall user interface for the Kanban board, including card layouts, columns, drag-and-drop interactions, and visual feedback elements.",
        "dueDate": "2024-05-01",
        "subtasks": [
            {
                "text": "Create mockups for different Kanban board views",
                "done": false
            },
            {
                "text": "Design user interactions like adding, editing, and deleting cards",
                "done": false
            },
            {
                "text": "Ensure a clean and user-friendly visual style",
                "done": false
            }
        ],
        "assigned": [
            {
                "name": "Fiona",
                "surname": "Müller",
                "initials": "FM",
                "avatarColor": "rgb(255,122,0)"
            }
        ],
        "priority": {
            "urgency": "Urgent",
            "img": "./img/priorityHighInactive.svg"
        }
    }
]
