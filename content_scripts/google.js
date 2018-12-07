chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-link') {
        isSuccess = focusNextLink();
    }
    sendResponse({"isSuccess": isSuccess});
});

function focusNextLink() {
    if (!globalGoogleLength) {
        return false;
    }

    let $input = $globalGoogleLinks[globalGoogleIndex];
    $input.focus();
    return true;
}


let $globalGoogleLinks = $('a h3').parent();
let globalGoogleLength = $globalGoogleLinks.length;
let globalGoogleIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalGoogleLinks.on('focus', function(event){
        globalGoogleIndex = $globalGoogleLinks.index($(this)) + 1;
        if (globalGoogleIndex >= globalGoogleLength) {
            globalGoogleIndex = 0;
        }
    });
}
