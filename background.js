chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sortVideos") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
              chrome.scripting.executeScript({
                  target: { tabId: tabs[0].id },
                  function: sortVideos,
                  args: [message.order]
              });
          }
      });
  }
});

function sortVideos(order) {
  let videoContainers = document.querySelectorAll("div[data-e2e='user-post-item']");
  if (!videoContainers.length) return;

  let videosArray = Array.from(videoContainers);

  switch (order) {
      case "latest":
          videosArray.sort((a, b) => {
              let dateA = extractDate(a);
              let dateB = extractDate(b);
              return dateB - dateA;
          });
          break;
      case "popular":
          videosArray.sort((a, b) => {
              let likesA = extractLikes(a);
              let likesB = extractLikes(b);
              return likesB - likesA;
          });
          break;
      case "oldest":
          videosArray.sort((a, b) => {
              let dateA = extractDate(a);
              let dateB = extractDate(b);
              return dateA - dateB;
          });
          break;
      case "shuffle":
          videosArray.sort(() => Math.random() - 0.5);
          break;
  }

  let parent = videoContainers[0].parentNode;
  videosArray.forEach(video => parent.appendChild(video));
}

function extractDate(videoElement) {
  let timestamp = videoElement.querySelector("span[data-e2e='video-create-time']");
  return timestamp ? new Date(timestamp.textContent).getTime() : 0;
}

function extractLikes(videoElement) {
  let likesElement = videoElement.querySelector("strong[data-e2e='video-like-count']");
  return likesElement ? parseInt(likesElement.textContent.replace(/,/g, "")) || 0 : 0;
}
