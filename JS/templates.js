function cardTemplate(card) {
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
                <div class="progress-color" style="width:${100}%;"></div>
            </div>
            <p>${1}/${card.subtasks.length} Subtasks</p>
        </div>
        <div class="icons-area">
            <div class="initial-card-container">
                <div class="user-initals-card" id="user-initals">TD</div>
                <div class="user-initals-card overlap" id="user-initals">G</div>
                <div class="user-initals-card overlap" id="user-initals">AB</div>
            </div>
            <img src="${card.priority}" alt="">
        </div>
    </div>
    `;
}