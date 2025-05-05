function injectButton() {
    if (document.getElementById("sortButton")) return;

    const button = document.createElement("button");
    button.innerText = "Sort Videos";
    button.id = "sortButton";
    button.style.position = "fixed";
    button.style.top = "218px";
    button.style.right = "24px";
    button.style.zIndex = "10000";
    button.style.padding = "10px";
    button.style.backgroundColor = "#25F4EE";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    document.body.appendChild(button);
    
    button.addEventListener("click", () => {
        const sortMethod = prompt("Enter sorting method: Latest, Popular, Oldest, or Shuffle").toLowerCase();
        chrome.runtime.sendMessage({ action: "sortVideos", order: sortMethod });
    });
}

window.onload = () => {
    setTimeout(injectButton, 3000);
};
