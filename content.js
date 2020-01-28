chrome.storage.sync.get(["enabled"], function (enabled) {
    if (enabled["enabled"]) {
        var player_container = document.getElementById('lecture-player').parentNode.parentNode.parentNode;
        player_container.className = "";
    }
});