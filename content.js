function sortVideos(method) {
    let videos = document.querySelectorAll("div[data-e2e='video-item']");
    let videoArray = Array.from(videos);

    if (!videoArray.length) return;

    if (method === "latest") {
        videoArray.sort((a, b) => new Date(b.dataset.timestamp) - new Date(a.dataset.timestamp));
    } else if (method === "oldest") {
        videoArray.sort((a, b) => new Date(a.dataset.timestamp) - new Date(b.dataset.timestamp));
    } else if (method === "popular") {
        videoArray.sort((a, b) => b.dataset.likes - a.dataset.likes);
    } else if (method === "shuffle") {
        videoArray.sort(() => Math.random() - 0.5);
    }

    let parent = videos[0].parentNode;
    videoArray.forEach(video => parent.appendChild(video));
}

function createSortButton(text, sortMethod) {
    let button = document.createElement("button");
    button.innerText = text;
    button.classList.add("tiktok-sort-btn");

    button.addEventListener("click", () => {
        sortVideos(sortMethod);
        chrome.storage.local.set({ sortingMethod: sortMethod });
    });

    return button;
}

function addProfileSortButtons() {
    let filterBar = document.querySelector("div[data-e2e='user-tab-list']");
    
    if (filterBar && !document.querySelector(".tiktok-sort-btn")) {
        let shuffleButton = createSortButton("🔀 Shuffle", "shuffle");
        let programButton = createSortButton("📋 Program", "popular");

        filterBar.appendChild(shuffleButton);
        filterBar.appendChild(programButton);
    }
}

function addFavoritesSortButtons() {
    let favoritesHeader = document.querySelector("div[data-e2e='favorites-page-header']");
    
    if (favoritesHeader && !document.querySelector(".tiktok-sort-btn")) {
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("tiktok-favorites-sort-container");

        let latestButton = createSortButton("📅 Latest", "latest");
        let oldestButton = createSortButton("⏳ Oldest", "oldest");
        let popularButton = createSortButton("🔥 Popular", "popular");
        let shuffleButton = createSortButton("🔀 Shuffle", "shuffle");
        let programButton = createSortButton("📋 Program", "popular");

        buttonContainer.append(latestButton, oldestButton, popularButton, shuffleButton, programButton);

        favoritesHeader.appendChild(buttonContainer);
    }
}

function addLikedSortButtons() {
    let likedHeader = document.querySelector("div[data-e2e='liked-videos-header']");
    
    if (likedHeader && !document.querySelector(".tiktok-sort-btn")) {
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("tiktok-liked-sort-container");

        let latestButton = createSortButton("📅 Latest", "latest");
        let oldestButton = createSortButton("⏳ Oldest", "oldest");
        let popularButton = createSortButton("🔥 Popular", "popular");
        let shuffleButton = createSortButton("🔀 Shuffle", "shuffle");
        let programButton = createSortButton("📋 Program", "popular");

        buttonContainer.append(latestButton, oldestButton, popularButton, shuffleButton, programButton);

        likedHeader.appendChild(buttonContainer);
    }
}

function applyAutoFilter() {
    chrome.storage.local.get(["sortingMethod", "autoFilter"], (data) => {
        if (data.autoFilter) {
            sortVideos(data.sortingMethod || "latest");
        }
    });
}

function detectPageAndInjectButtons() {
    if (window.location.pathname.includes("/video")) return;

    if (window.location.pathname.includes("/favorites")) {
        addFavoritesSortButtons();
    } else if (window.location.pathname.includes("/liked")) {
        addLikedSortButtons();
    } else {
        addProfileSortButtons();
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        detectPageAndInjectButtons();
        applyAutoFilter();
    }, 3000);
});
