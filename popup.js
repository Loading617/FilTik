document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort-method");
    const applyButton = document.getElementById("apply-filter");
    const autoFilterToggle = document.getElementById("auto-filter");

    chrome.storage.local.get(["sortingMethod", "autoFilter"], (data) => {
        if (data.sortingMethod) {
            sortSelect.value = data.sortingMethod;
        }
        autoFilterToggle.checked = data.autoFilter || false;
    });

    applyButton.addEventListener("click", () => {
        const sortingMethod = sortSelect.value;
        chrome.storage.local.set({ sortingMethod });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "sortVideos", sortingMethod });
        });
    });

    autoFilterToggle.addEventListener("change", () => {
        chrome.storage.local.set({ autoFilter: autoFilterToggle.checked });
    });
});
