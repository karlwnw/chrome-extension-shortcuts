chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-link') {
        isSuccess = focusNextLink();
    }
    sendResponse({"isSuccess": isSuccess});
});

function focusNextLink() {
    if (!globalRedditLength) {
        return false;
    }

    let $input = $globalRedditLinks[globalRedditIndex];
    $input.focus();
    return true;
}


let $globalRedditLinks = $('.sitetable a.comments');
let globalRedditLength = $globalRedditLinks.length;
let globalRedditIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalRedditLinks.on('focus', function(event){
        globalRedditIndex = $globalRedditLinks.index($(this)) + 1;
        if (globalRedditIndex >= globalRedditLength) {
            globalRedditIndex = 0;
        }
    });
}
