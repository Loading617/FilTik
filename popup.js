document.getElementById("latest").addEventListener("click", () => sortVideos("latest"));
document.getElementById("popular").addEventListener("click", () => sortVideos("popular"));
document.getElementById("oldest").addEventListener("click", () => sortVideos("oldest"));

function sortVideos(order) {
    chrome.scripting.executeScript({
        target: {tabId: chrome.tabs.TAB_ID},
        function: sortVideosOnPage,
        args: [order]
    });
}

function sortVideosOnPage(order) {
    const videos = [...document.querySelectorAll('[data-e2e="user-post-item"]')];

    if (videos.length === 0) {
        alert("No videos found!");
        return;
    }

    let sortedVideos;
    if (order === "latest") {
        sortedVideos = videos.reverse();
    } else if (order === "oldest") {
        sortedVideos = videos;
    } else if (order === "popular") {
        sortedVideos = videos.sort((a, b) => {
            const viewsA = parseInt(a.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
            const viewsB = parseInt(b.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
            return viewsB - viewsA;
        });
    }

    const container = videos[0].parentNode;
    container.innerHTML = "";
    sortedVideos.forEach(video => container.appendChild(video));
}
