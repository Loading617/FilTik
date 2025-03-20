function injectButton() {
    if (document.getElementById("sortButton")) return;

    const button = document.createElement("button");
    button.innerText = "Sort Videos";
    button.id = "sortButton";
    button.style.position = "fixed";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.zIndex = "10000";
    button.style.padding = "10px";
    button.style.backgroundColor = "#ff3b5c";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    document.body.appendChild(button);
    
    button.addEventListener("click", sortVideos);
}

function sortVideos() {
    const videos = [...document.querySelectorAll('[data-e2e="user-post-item"]')];

    if (videos.length === 0) {
        alert("No videos found!");
        return;
    }

    const sortMethod = prompt("Enter sorting method: Latest, Popular, Oldest, or Shuffle").toLowerCase();
    
    let sortedVideos;
    
    if (sortMethod === "latest") {
        sortedVideos = videos.reverse();
    } else if (sortMethod === "oldest") {
        sortedVideos = videos;
    } else if (sortMethod === "popular") {
        sortedVideos = videos.sort((a, b) => {
            const viewsA = parseInt(a.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
            const viewsB = parseInt(b.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
            return viewsB - viewsA;
        });
    } else if (sortMethod === "shuffle") {
        sortedVideos = videos.sort(() => Math.random() - 0.5);
    } else {
        alert("Invalid sorting method!");
        return;
    }

    const container = videos[0].parentNode;
    container.innerHTML = ""; 
    sortedVideos.forEach(video => container.appendChild(video));
}

window.onload = () => {
    setTimeout(injectButton, 2000);
};
