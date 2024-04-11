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
            <img src="${card.priority}" alt="">
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

function TaskCadBigTemplate() {
    return `
        <div class="board-card-big-top">
            <div class="category-card-big">catogery</div>
            <div class="board-card-close-container" onclick="closeCard()">
                <img class="board-card-close" src="./img/Close.svg" alt="close">
                <img class="board-card-close-hover" src="./img/close hover.svg" alt="close hover">
            </div>
        </div>
        <h1>Titel</h1>
        <p class="board-card-big-description">description</p>
        <div class="board-card-big-info">
            <h2>Due date:</h2>
            <p>Date</p>
        </div>
        <div class="board-card-big-info">
            <h2>Priority: </h2>
            <div class="board-card-big-priority">
                <p> low </p>
                <img src="./img/priorityLowInactive.svg" alt="Priority">
            </div>
        </div>
        <div class="task-assigend-container">
            <h2>Assigned To:</h2>
            <div class="board-card-big-assingend-user">
                <div class="user-initals-card-big-card">TD</div>
                <p>Name Nachname</p>
            </div>
            <div class="board-card-big-assingend-user">
                <div class="user-initals-card-big-card">G</div>
                <p>Guest</p>
            </div>
            <div class="board-card-big-assingend-user">
                <div class="user-initals-card-big-card">AB</div>
                <p>name</p>
            </div>
        </div>
        <div class="board-card-big-subtasks-arear">
            <h2>Subtasks</h2>
            <div class="board-task-subtasks-container">
                <div class="board-task-subtask">

                    <p><img src="./img/Check button.svg" alt="checkbox">irgendwas etwas längners</p>
                </div>
                <div class="board-task-subtask">

                    <p><img src="./img/Check button unchecked.svg" alt="checkbox">Aufgabe</p>
                </div>
            </div>
        </div>
        <div class="board-card-big-bottom">
            <div class="board-card-icons">
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
