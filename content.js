function addButton() {
    const button = document.createElement("button");
    button.innerText = "Organize Videos";
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style.right = "10px";
    button.style.zIndex = "1000";
    button.onclick = () => {
    
      alert("Organize videos by Latest, Popular, and Oldest.");
    };
    document.body.appendChild(button);
  }
  
  window.addEventListener("load", addButton);
  
