function addFilterButton() {

    if (document.querySelector("#tiktok-filter-button")) return;

    let button = document.createElement("button");
    button.id = "tiktok-filter-button";
    button.innerText = "🔀 Shuffle & Sort";
    button.classList.add("tiktok-extension-button");

    let target = document.querySelector("header") || document.body;
    if (target) {
        target.appendChild(button);
    }

    button.addEventListener("click", () => {
        let sortingMethod = prompt("Sort by: latest, popular, oldest, shuffle");
        sortVideos(sortingMethod);
    });
}

function sortVideos(method) {
    let videos = document.querySelectorAll("div[data-e2e='video-item']");
    let videoArray = Array.from(videos);

    if (!videoArray.length) {
        alert("No videos found!");
        return;
    }

    if (method === "latest") {
        videoArray.sort((a, b) => new Date(b.dataset.timestamp) - new Date(a.dataset.timestamp));
    } else if (method === "oldest") {
        videoArray.sort((a, b) => new Date(a.dataset.timestamp) - new Date(b.dataset.timestamp));
    } else if (method === "popular") {
        videoArray.sort((a, b) => b.dataset.likes - a.dataset.likes);
    } else if (method === "shuffle") {
        videoArray.sort(() => Math.random() - 0.5);
    } else {
        alert("Invalid sorting method!");
        return;
    }

    let parent = videos[0].parentNode;
    videoArray.forEach(video => parent.appendChild(video));
}

window.addEventListener("load", addFilterButton);
