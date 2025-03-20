document.addEventListener("DOMContentLoaded", function () {
    const sortButtons = document.querySelectorAll(".sort-btn");

    sortButtons.forEach(button => {
        button.addEventListener("click", function () {
            const sortMethod = this.getAttribute("data-sort");
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length > 0) {
                    chrome.runtime.sendMessage({ action: "sortVideos", order: sortMethod });
                }
            });
        });
    });
});
