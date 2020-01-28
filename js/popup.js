var switch1 = document.getElementById("customSwitch1");

function restore_options() {
    chrome.storage.sync.get(["enabled"], function (enabled) {
        switch1.checked = enabled["enabled"];
        document.getElementById("switch-label-on-of").innerHTML =
            enabled["enabled"] ? "on" : "off";
    });
}

function save_options() {
    chrome.storage.sync.set({
        enabled: this.checked
    }, function () {});
    document.getElementById("switch-label-on-of").innerHTML =
        this.checked ? "on" : "off";
}

switch1.addEventListener('change', save_options);
document.addEventListener('DOMContentLoaded', restore_options);