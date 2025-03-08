chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSortingPreference") {
        
        chrome.storage.local.get(["sortingMethod"], (data) => {
            sendResponse({ sortingMethod: data.sortingMethod || "latest" });
        });
        return true;
    }

    if (request.action === "setSortingPreference") {
        
        chrome.storage.local.set({ sortingMethod: request.sortingMethod });
    }
});
