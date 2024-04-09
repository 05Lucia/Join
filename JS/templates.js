function cardTemplate(card) {
    let compleatSubtask = card.subtasks.reduce((acc, subtask) => acc + subtask.done, 0);
    return `
    <div draggable="true" ondragstart="startDraging(${card.id})" class="card">
        <div class="category-card">${card.category}</div>
        <div class="card-text">
            <h3>${card.titel}</h3>
            <p>${card.description}</p>
            <!-- dont show more than 2 lines? JS? -->
        </div>
        <div class="progressbar-area">
            <div class="progressbar">
                <div class="progress-color" style="width:${progressbarComplitaionRate(card)}%;"></div>
            </div>
            <p>${compleatSubtask}/${card.subtasks.length} Subtasks</p>
        </div>
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
