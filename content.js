function addButtons(container, prefix) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = `${prefix}-controls`;
  
    const buttons = ['oldest', 'popular', 'newest', 'shuffle', 'program'];
    buttons.forEach(buttonText => {
      const button = document.createElement('button');
      button.id = `${buttonText}-${prefix}`;
      button.textContent = buttonText.charAt(0).toUpperCase() + buttonText.slice(1);
      button.addEventListener('click', () => handleButtonClick(buttonText, prefix));
      buttonContainer.appendChild(button);
    });
  
    container.appendChild(buttonContainer);
  }
  
  function handleButtonClick(buttonText, prefix) {
    console.log(`Button ${buttonText} clicked on ${prefix} page`);
    if(buttonText === "shuffle"){
        shuffleVideos(prefix);
    } else if (buttonText === "program"){
        programVideo(prefix);
    } else {
        sortVideos(buttonText, prefix);
    }
  }
  
  function sortVideos(sortType, prefix){
  
  }
  
  function shuffleVideos(prefix){
  
  }
  
  function programVideo(prefix){
  
  }
  
  function injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .profile-controls, .favorites-controls, .liked-video-controls {
        text-align: right;
        margin-top: 10px;
      }
      .profile-controls button, .favorites-controls button, .liked-video-controls button {
        margin-left: 5px;
      }
      .favorites-controls{
          margin-top: 20px;
      }
      .liked-video-controls{
          margin-bottom: 20px;
      }
    `;
    document.head.appendChild(style);
  }
  
  function addProfileButtons() {
    const profileSortControls = document.querySelector('div[data-e2e="user-post-tab-sort"]');
    if (profileSortControls) {
      addButtons(profileSortControls, 'profile');
    }
  }
  
  function addFavoritesButtons() {
    const createCollectionButton = document.querySelector('button[data-e2e="create-collection"]');
    if (createCollectionButton) {
      const favoritesControlsContainer = document.createElement('div');
      createCollectionButton.parentElement.appendChild(favoritesControlsContainer);
      addButtons(favoritesControlsContainer, 'favorites');
    }
  }
  
  function addLikedVideosButtons() {
    const likedVideosSection = document.querySelector('div[data-e2e="liked-videos"]');
    if (likedVideosSection) {
      addButtons(likedVideosSection, 'liked-video');
    }
  }
  function main() {
    injectCSS();
    addProfileButtons();
    addFavoritesButtons();
    addLikedVideosButtons();
  
    const observer = new MutationObserver(() => {
      addProfileButtons();
      addFavoritesButtons();
      addLikedVideosButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  main();
