chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getPlaylistTime") {
    const playlistItems = document.querySelectorAll("#playlist-items");
    let totalDurationInSeconds = 0;

    playlistItems.forEach(function (item) {
      const durationElement = item.querySelector(
        "span.ytd-thumbnail-overlay-time-status-renderer"
      );
      if (durationElement) {
        const durationText = durationElement.textContent.trim();
        const durationArray = durationText.split(":").map(Number).reverse(); // Reverse array for easier calculation

        let durationInSeconds = 0;
        for (let i = 0; i < durationArray.length; i++) {
          durationInSeconds += durationArray[i] * Math.pow(60, i);
        }

        totalDurationInSeconds += durationInSeconds;
      }
    });

    const days = Math.floor(totalDurationInSeconds / (3600 * 24));
    const hours = Math.floor((totalDurationInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const seconds = Math.floor(totalDurationInSeconds % 60);

    const playlistTime = `${String(days).padStart(2, "0")} : ${String(
      hours
    ).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(
      seconds
    ).padStart(2, "0")}`;
    sendResponse({ playlistTime: playlistTime });
  }
});
