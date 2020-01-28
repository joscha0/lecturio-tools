var switchWidth = document.getElementById("customSwitchWidth");
var switchToolbar = document.getElementById("customSwitchToolbar");

function restore_options() {
    chrome.storage.sync.get({
        width: true
    }, function (enabled) {
        switchWidth.checked = enabled["width"];
        document.getElementById("switch-label-on-of-width").innerHTML =
            enabled["width"] ? "on" : "off";
    });
    chrome.storage.sync.get({
        toolbar: true
    }, function (enabled) {
        switchToolbar.checked = enabled["toolbar"];
        document.getElementById("switch-label-on-of-toolbar").innerHTML =
            enabled["toolbar"] ? "on" : "off";
    });
}

function save_options_width() {
    chrome.storage.sync.set({
        width: this.checked,
    }, function () {});
    document.getElementById("switch-label-on-of-width").innerHTML =
        this.checked ? "on" : "off";
}


function save_options_toolbar() {
    chrome.storage.sync.set({
        toolbar: this.checked,
    }, function () {});
    document.getElementById("switch-label-on-of-toolbar").innerHTML =
        this.checked ? "on" : "off";
}

switchWidth.addEventListener('change', save_options_width);
switchToolbar.addEventListener('change', save_options_toolbar);
document.addEventListener('DOMContentLoaded', restore_options);