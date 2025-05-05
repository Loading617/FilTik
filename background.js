chrome.runtime.onInstalled.addListener(() => {
  console.log("FilTik Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sortVideos") {
      chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: sortVideosOnPage,
          args: [request.order]
      });
  }
});

function sortVideosOnPage(order) {
  const selectors = [
      '[data-e2e="user-post-item"]',
      '[data-e2e="repost-list-item"]',
      '[data-e2e="favorite-list-item"]',
      '[data-e2e="like-list-item"]'
  ];

  let videos = [];
  let container;

  for (let selector of selectors) {
      videos = [...document.querySelectorAll(selector)];
      if (videos.length > 0) {
          container = videos[0].parentNode;
          break;
      }
  }

  if (videos.length === 0) {
      alert("No videos found!");
      return;
  }

  let sortedVideos;
  
  if (order === "latest") {
      sortedVideos = videos.sort((a, b) => {
          const dateA = extractDate(a);
          const dateB = extractDate(b);
          return dateB - dateA;
      });
  } else if (order === "oldest") {
      sortedVideos = videos.sort((a, b) => {
          const dateA = extractDate(a);
          const dateB = extractDate(b);
          return dateA - dateB;
      });
  } else if (order === "popular") {
      sortedVideos = videos.sort((a, b) => {
          const viewsA = extractViews(a);
          const viewsB = extractViews(b);
          return viewsB - viewsA;
      });
  } else if (order === "shuffle") {
      sortedVideos = videos.sort(() => Math.random() - 0.5);
  } else {
      alert("Invalid sorting method!");
      return;
  }

  container.innerHTML = "";
  sortedVideos.forEach(video => container.appendChild(video));
}

function extractViews(videoElement) {
  const viewElement = videoElement.querySelector('[data-e2e="video-views"]');
  return viewElement ? parseInt(viewElement.textContent.replace(/[^0-9]/g, "")) : 0;
}

function extractDate(videoElement) {
  const dateElement = videoElement.querySelector('[data-e2e="video-upload-date"]');
  return dateElement ? new Date(dateElement.textContent).getTime() : 0;
}