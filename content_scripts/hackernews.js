chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isSuccess = false;
    if (request.command === 'focus-next-link') {
        isSuccess = focusNextLink();
    }
    sendResponse({"isSuccess": isSuccess});
});

function focusNextLink() {
    if (!globalHNLength) {
        return false;
    }

    let $input = $globalHNLinks[globalHNIndex];
    $input.focus();
    return true;
}

let $globalHNLinks = $('table.itemlist td.subtext > a:last-child');
let globalHNLength = $globalHNLinks.length;
let globalHNIndex = 0;

window.addEventListener("load", onLoadCallback, false);

function onLoadCallback() {
    $globalHNLinks.on('focus', function(event){
        globalHNIndex = $globalHNLinks.index($(this)) + 1;
        if (globalHNIndex >= globalHNLength) {
            globalHNIndex = 0;
        }
    });
}
