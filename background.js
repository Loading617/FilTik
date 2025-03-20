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
  const videos = [...document.querySelectorAll('[data-e2e="user-post-item"]')];

  if (videos.length === 0) {
      alert("No videos found!");
      return;
  }

  let sortedVideos;
  if (order === "latest") {
      sortedVideos = videos.reverse();
  } else if (order === "oldest") {
      sortedVideos = videos;
  } else if (order === "popular") {
      sortedVideos = videos.sort((a, b) => {
          const viewsA = parseInt(a.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
          const viewsB = parseInt(b.querySelector('[data-e2e="video-views"]').textContent.replace(/[^0-9]/g, ""));
          return viewsB - viewsA;
      });
  } else if (order === "shuffle") {
      sortedVideos = videos.sort(() => Math.random() - 0.5);
  }

  const container = videos[0].parentNode;
  container.innerHTML = "";
  sortedVideos.forEach(video => container.appendChild(video));
}
