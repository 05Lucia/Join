function cardTemplate() {
    return `
    <div class="card">
        <div class="category-card">${paceholder}]</div>
        <div class="card-text">
            <h3>${paceholder}</h3>
            <p>${paceholder}</p>
            <!-- dont show more than 2 lines? JS? -->
        </div>
        <div class="progressbar-area">
            <div class="progressbar">
                <div class="progress-color" style="width: ${paceholder};"></div>
        </div>
        <p>${p}/${p} Subtasks</p>
        </div>
        <div class="icons-area">
            <div>${paceholder}</div>
            <img src="${paceholder}" alt="">
        </div>
    </div>
    `;
}