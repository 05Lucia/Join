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

function templateOkBtn(id) {

    const editTaskBntContainer = document.getElementById('createTaskContainerPopup');
    editTaskBntContainer.innerHTML = `
    <button id="finish-btn" class="createTaskButton" onclick="editTaskDone(${id})">
        <p>Ok</p>
        <img src="./img/createTaskCheckIcon.svg">
    </button>
    `
}

function TemplateGreetMobile() {
    document.getElementById('content').innerHTML = `
    <div class="greeting-container">
        <p id="greeting-mobile-user"></p><br>
        <h1 class="greeting-mobile" id="greeting-mobile"></h1>
    </div>
    `;
}

