chrome.storage.sync.get({
    width: true
}, function (enabled) {
    if (enabled["width"]) {
        var player_container = document.getElementById('lecture-player').parentNode.parentNode.parentNode;
        player_container.className = "";
    }
});

chrome.storage.sync.get({
    toolbar: true
}, function (enabled) {
    if (enabled["toolbar"]) {
        var lecturioTools = document.createElement("div");
        var btnPIP = document.createElement("BUTTON");
        var btnVideo = document.createElement("BUTTON");
        var buttonRow = document.createElement("div");

        async function open_in_pip() {
            const videos = Array.from(document.querySelectorAll('video'));
            btnPIP.disabled = true;
            if (videos.length === 0)
                return;

            const video = videos[0];
            try {
                if (video !== document.pictureInPictureElement) {
                    await video.requestPictureInPicture();
                    btnPIP.innerHTML = "close video in picture in picture mode";
                } else {
                    await document.exitPictureInPicture();
                    btnPIP.innerHTML = "open video in picture in picture mode";
                }

            } catch (error) {} finally {
                btnPIP.disabled = false;
            }
        }
        btnPIP.innerHTML = "open video in picture in picture mode";
        btnPIP.classList = 'btn btn-primary button-lecturio-tools';
        btnPIP.addEventListener('click', open_in_pip);

        function goto_video() {
            const videos = Array.from(document.querySelectorAll('video'));
            if (videos.length === 0)
                return;

            const video = videos[0];
            if (video.hasAttribute('src'))
                window.open(video.src, '_blank');
        }


        btnVideo.innerHTML = "open video src in new tab";
        btnVideo.classList = 'btn btn-primary button-lecturio-tools';
        btnVideo.addEventListener('click', goto_video);

        buttonRow.classList = 'tools-buttonRow';
        buttonRow.appendChild(btnPIP);
        buttonRow.appendChild(btnVideo);

        lecturioTools.classList = 'container';
        lecturioTools.innerHTML = '<div class="row"><h4 class="text-center">lecturio.de tools</h4></div><p class="text-center">(only works if video is playing)</p>';
        lecturioTools.appendChild(buttonRow);

        lecturioTools.style.backgroundColor = '#111';
        lecturioTools.style.padding = '10px';
        lecturioTools.style.color = '#eee';

        document.getElementsByClassName('lecture-player-wrapper')[0].appendChild(lecturioTools);
    }
});