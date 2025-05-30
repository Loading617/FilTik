chrome.runtime.onInstalled.addListener(() => {
  console.log('FilTik extension installed');
});

document.addEventListener("DOMContentLoaded", () => {
    const sortButtons = document.querySelectorAll(".sort-btn");
    const shuffleToggle = document.getElementById("shuffle-toggle");
    let shuffleActive = false;
    let shuffleInterval;
    let sortingModes = ["latest", "popular", "oldest", "shuffle"];
    let currentModeIndex = 0;

    sortButtons.forEach(button => {
        button.addEventListener("click", () => {
            let sortOrder = button.getAttribute("data-sort");
            sendSortRequest(sortOrder);
        });
    });

    shuffleToggle.addEventListener("click", () => {
        if (shuffleActive) {
            clearInterval(shuffleInterval);
            shuffleInterval = null;
            shuffleToggle.innerText = "Start Shuffle Sort";
            shuffleToggle.style.backgroundColor = "#ff3b5c";
        } else {
            shuffleInterval = setInterval(() => {
                let sortOrder = sortingModes[currentModeIndex];
                sendSortRequest(sortOrder);
                currentModeIndex = (currentModeIndex + 1) % sortingModes.length;
            }, 5000);

            shuffleToggle.innerText = "Stop Shuffle Sort";
            shuffleToggle.style.backgroundColor = "#666";
        }
        shuffleActive = !shuffleActive;
    });
});

function sendSortRequest(order) {
    chrome.runtime.sendMessage({ action: "sortVideos", order });
}
