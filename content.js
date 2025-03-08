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

function applyAutoFilter() {
    chrome.runtime.sendMessage({ action: "getSortingPreference" }, (response) => {
        if (response.sortingMethod) {
            sortVideos(response.sortingMethod);
        }
    });
}

window.addEventListener("load", () => {
    applyAutoFilter();

    let button = document.createElement("button");
    button.innerText = "🔀 Shuffle & Sort";
    button.classList.add("tiktok-extension-button");

    let target = document.querySelector("header") || document.body;
    if (target) target.appendChild(button);

    button.addEventListener("click", () => {
        let sortingMethod = prompt("Sort by: latest, popular, oldest, shuffle");
        if (sortingMethod) {
            sortVideos(sortingMethod);
            chrome.runtime.sendMessage({ action: "setSortingPreference", sortingMethod });
        }
    });
});
