function isTargetPage() {
    return window.location.pathname.includes("/video") ||
           window.location.pathname.includes("/reposts") ||
           window.location.pathname.includes("/favorite") ||
           window.location.pathname.includes("/liked");
}

function injectButton() {
    if (!isTargetPage()) return;
    if (document.getElementById("sortButton")) return;

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "sortButtonContainer";
    buttonContainer.style.position = "fixed";
    buttonContainer.style.top = "218px";
    buttonContainer.style.right = "24px";
    buttonContainer.style.zIndex = "10000";

    const sortOptions = ["Latest", "Popular", "Oldest", "Shuffle"];
    
    sortOptions.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.className = "sort-btn";
        button.style.display = "block";
        button.style.margin = "5px 0";
        button.style.padding = "10px";
        button.style.backgroundColor = "#25F4EE";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "sortVideos", order: option.toLowerCase() });
        });

        buttonContainer.appendChild(button);
    });

    document.body.appendChild(buttonContainer);
}

function observePageChanges() {
    const observer = new MutationObserver(() => {
        if (isTargetPage() && !document.getElementById("sortButtonContainer")) {
            injectButton();
        } else if (!isTargetPage() && document.getElementById("sortButtonContainer")) {
            document.getElementById("sortButtonContainer").remove();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

window.onload = () => {
    setTimeout(injectButton, 3000);
    observePageChanges();
};

