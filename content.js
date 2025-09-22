if (window.location.pathname.match(/^\/@[\w.-]+$/)) {

  const playlists = window.filtikGetPlaylistsForProfile();

  if (playlists && playlists.length) {

    const container = document.createElement('div');
    container.id = 'filtik-playlist-container';
    container.innerHTML = `
      <h2>Playlists</h2>
      <ul>
        ${playlists.map(pl => `
          <li>
            <span class="playlist-title">${pl.name}</span>
            <ul>
              ${pl.videos.map(v => `<li><a href="${v.url}" target="_blank">${v.title}</a></li>`).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
    `;

    container.style.padding = "16px";
    container.style.background = "#fff";
    container.style.borderRadius = "8px";
    container.style.margin = "16px 0";
    container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";

    const target = document.querySelector('[data-e2e="user-profile-info"]');
    if (target) {
      target.parentNode.insertBefore(container, target.nextSibling);
    }
  }
}
