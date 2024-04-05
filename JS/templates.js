function cardTemplate() {
    return `
    <div class="card">
        <div class="category-card">${a}]</div>
        <div class="card-text">
            <h3>${a}</h3>
            <p>${a}</p>
            <!-- dont show more than 2 lines? JS? -->
        </div>
        <div class="progressbar-area">
            <div class="progressbar">
                <div class="progress-color" style="width: ${a};"></div>
        </div>
        <p>${a}/${a} Subtasks</p>
        </div>
        <div class="icons-area">
            <div>${a}</div>
            <img src="${a}" alt="">
        </div>
    </div>
    `;
}