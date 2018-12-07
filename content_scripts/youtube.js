chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-link') {
        isSuccess = focusNextLink();
    }
    sendResponse({"isSuccess": isSuccess});
});

function focusNextLink() {
    if (!globalYouTubeLength) {
        return false;
    }

    let $input = $globalYouTubeLinks[globalYouTubeIndex];
    $input.focus();
    return true;
}


let $globalYouTubeLinks = $('ytd-video-renderer div.text-wrapper h3.title-and-badge a');
let globalYouTubeLength = $globalYouTubeLinks.length;
let globalYouTubeIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalYouTubeLinks.on('focus', function(event){
        globalYouTubeIndex = $globalYouTubeLinks.index($(this)) + 1;
        if (globalYouTubeIndex >= globalYouTubeLength) {
            globalYouTubeIndex = 0;
        }
    });
}
