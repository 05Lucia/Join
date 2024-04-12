/**
 * Generates the HTML structure for a single card on the board.
 * @param {object} card The card object containing details to populate the template.
 * @returns {string} The HTML string representing a card on the board.
 */
function cardTemplate(card) {

    return `
    <div draggable="true" onclick="bigCard(${card.id})" ondragstart="startDraging(${card.id})" class="board-card-small" >
        <div class="category-card">${card.category}</div>
        <div class="card-text">
            <h3>${card.titel}</h3>
            <p>${card.description}</p>
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
        let compleatSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);

        return `
        <div class="progressbar-area">
            <div class="progressbar">
                <div class="progress-color" style="width:${progressbarComplitaionRate(card)}%;"></div>
            </div>
            <p>${compleatSubtask}/${card.subtasks.length} Subtasks</p>
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
            <div class="category-card-big">${card.category} </div>
            <div class="board-card-close-container" onclick="closeCard()">
                <img class="board-card-close" src="./img/Close.svg" alt="close">
                <img class="board-card-close-hover" src="./img/close hover.svg" alt="close hover">
            </div>
        </div>
        <h1>${card.titel} </h1>
        <p class="board-card-big-description">${card.description} </p>
        <div class="board-card-big-info">
            <h2>Due date:</h2>
            <p>${card.dueDate} </p>
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
            <div class="board-task-subtasks-container" id="board-task-subtasks-container">
        </div> 
    </div>
        <div class="board-card-big-bottom" >
            <div class="board-card-icons" onclick="deleteTask(${id})">
                <img class="board-card-big-bottom-icon" src="./img/delete.svg" alt="Delete">
                <img class="board-card-big-bottom-icon-hover" src="./img/delete hover.svg" alt="delete hover">
                Delete
            </div>
            <div class="board-card-big-bottom-seperation"></div>
            <div class="board-card-icons">
                <img class="board-card-big-bottom-icon" src="./img/edit.svg" alt="Edit">
                <img class="board-card-big-bottom-icon-hover" src="./img/edit hover.svg" alt="edit hover">
                Edit
            </div>
        </div>
`;
}

/**
 * Generates the HTML structure for an individual user within the "Assigned To" section of the big card modal.
 * @param {string} user The username to display.
 * @param {string} initials The user's initials.
 * @returns {string} The HTML string representing an assigned user entry.
 */
function bigCardAssignedTemplate(user, initials) {
    return `
    <div class="board-card-big-assingend-user">
        <div class="user-initals-card-big-card">${initials}</div>
        <p>${user}</p>
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
